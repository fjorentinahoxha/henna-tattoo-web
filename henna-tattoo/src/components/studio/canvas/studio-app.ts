// The Konva-specific surface of the studio. The ONLY file that imports Konva.
// Subscribes to the state store and reconciles the stage to match.

import Konva from 'konva';

import { STUDIO_CONFIG } from '../studio.config';
import type { DesignState } from '../domain/types';
import { dispatch, getState, subscribe } from '../domain/state';
import { findHand, recolorHandSvg } from '../registry/hands';
import { findMotif, recolorSvg } from '../registry/motifs';

const CANVAS_W = STUDIO_CONFIG.canvas.width;
const CANVAS_H = STUDIO_CONFIG.canvas.height;

type CanvasHandles = {
  /** Trigger a PNG export of the current design. */
  exportPng: () => Promise<Blob>;
  /** Reattach to a new container size (called on window resize). */
  resize: () => void;
  /** Turn the free-draw tool on/off. While on, dragging motifs is suspended. */
  setDrawMode: (active: boolean) => void;
  /** Set the brush width (canvas pixels) used by the next stroke. */
  setBrushWidth: (width: number) => void;
  /** Cleanup. */
  destroy: () => void;
};

const DEFAULT_HENNA_HEX =
  STUDIO_CONFIG.hennaColors.find((h) => h.id === STUDIO_CONFIG.defaults.hennaColorId)?.hex ??
  STUDIO_CONFIG.hennaColors[0].hex;
const DEFAULT_BRUSH_WIDTH =
  STUDIO_CONFIG.draw.brushSizes.find((b) => b.id === STUDIO_CONFIG.draw.defaultSizeId)?.width ??
  STUDIO_CONFIG.draw.brushSizes[0].width;

export function mountCanvas(container: HTMLDivElement): CanvasHandles {
  // Stage is created at the logical canvas size, then scaled to fit the container.
  const stage = new Konva.Stage({
    container,
    width: CANVAS_W,
    height: CANVAS_H,
  });

  const handLayer = new Konva.Layer({ listening: false });
  const designLayer = new Konva.Layer();
  stage.add(handLayer, designLayer);

  // Tracks the on-canvas Konva nodes by layer id so we can reconcile against state diffs
  // without rebuilding the whole stage on every change. Motifs/designs are Images;
  // free-draw strokes are Lines.
  const layerNodes = new Map<string, Konva.Image | Konva.Line>();

  // Caches the original (un-processed) source image for each design layer so we
  // can re-extract the henna stamp when the henna color changes — no re-fetch.
  const designSources = new Map<string, HTMLImageElement>();

  const transformer = new Konva.Transformer({
    rotateEnabled: true,
    keepRatio: true,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    anchorSize: 14,
    borderStroke: '#8b4513',
    borderStrokeWidth: 1.5,
    anchorStroke: '#8b4513',
    anchorFill: '#fdf8f3',
  });
  designLayer.add(transformer);

  // ---- Free-draw tool ----
  // When drawing is on, pointer drags paint a henna line straight onto the canvas
  // instead of dragging/selecting motifs. The committed line lives in state as a
  // StrokeLayer and gets reconciled like any other layer; the in-progress line is a
  // throwaway node we destroy on commit.
  let drawMode = false;
  let brushWidth: number = DEFAULT_BRUSH_WIDTH;
  let drawingLine: Konva.Line | null = null;
  let drawPoints: number[] = [];

  function startStroke(): void {
    const pos = designLayer.getRelativePointerPosition();
    if (!pos) return;
    drawPoints = [pos.x, pos.y];
    drawingLine = new Konva.Line({
      points: drawPoints,
      stroke: currentHennaHex ?? DEFAULT_HENNA_HEX,
      strokeWidth: brushWidth,
      lineCap: 'round',
      lineJoin: 'round',
      tension: 0.3,
      listening: false,
      perfectDrawEnabled: false,
    });
    designLayer.add(drawingLine);
    drawingLine.moveToTop();
    designLayer.batchDraw();
  }

  function extendStroke(): void {
    if (!drawingLine) return;
    const pos = designLayer.getRelativePointerPosition();
    if (!pos) return;
    drawPoints.push(pos.x, pos.y);
    drawingLine.points(drawPoints);
    designLayer.batchDraw();
  }

  function finishStroke(): void {
    if (!drawingLine) return;
    const pts = drawPoints;
    const color = typeof drawingLine.stroke() === 'string'
      ? (drawingLine.stroke() as string)
      : (currentHennaHex ?? DEFAULT_HENNA_HEX);
    drawingLine.destroy();
    drawingLine = null;
    drawPoints = [];
    designLayer.batchDraw();
    // Need at least two distinct points (4 coords) to be a line, not a stray tap.
    if (pts.length >= 4) {
      dispatch({ type: 'add-stroke', points: pts, width: brushWidth, color });
    }
  }

  // Pointer handlers. In draw mode the first handler claims the gesture; otherwise
  // a click on empty canvas deselects.
  stage.on('mousedown touchstart', (e) => {
    if (drawMode) {
      e.cancelBubble = true;
      e.evt?.preventDefault?.();
      startStroke();
      return;
    }
    if (e.target === stage) {
      dispatch({ type: 'select-layer', id: null });
    }
  });

  stage.on('mousemove touchmove', (e) => {
    if (!drawMode || !drawingLine) return;
    e.evt?.preventDefault?.();
    extendStroke();
  });

  // Finish on release anywhere — a stage-only listener would miss releases that
  // happen after the pointer drifts outside the canvas.
  const onPointerUp = () => {
    if (drawMode) finishStroke();
  };
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);

  function setDrawMode(active: boolean): void {
    if (drawMode === active) return;
    drawMode = active;
    // Suspend hit-testing on existing motifs/designs so drags paint over them
    // instead of selecting/moving them. Stroke Lines always stay non-interactive.
    for (const node of layerNodes.values()) {
      if (node instanceof Konva.Image) node.listening(!active);
    }
    container.style.cursor = active ? 'crosshair' : '';
    if (active) {
      dispatch({ type: 'select-layer', id: null });
    } else if (drawingLine) {
      // Cancel an in-progress stroke when leaving draw mode.
      drawingLine.destroy();
      drawingLine = null;
      drawPoints = [];
      designLayer.batchDraw();
    }
  }

  function setBrushWidth(width: number): void {
    brushWidth = width;
  }

  // ---- Rendering: state -> Konva ----

  // Track what's currently rendered on the hand layer so we don't re-decode the
  // same image on every state change. Either a template (pose + tone) or a user
  // photo (its data-URL src is enough — URLs change every upload).
  type HandRender =
    | { kind: 'template'; poseId: string; toneHex: string }
    | { kind: 'user';     src: string };
  let currentHand: HandRender | null = null;
  let currentHennaHex: string | null = null;

  let handImage: Konva.Image | null = null;

  /** Place (or reuse) the hand Konva.Image, fitted into ~88% of the canvas height. */
  function placeHandImage(img: HTMLImageElement): void {
    const targetH = CANVAS_H * 0.88;
    const aspect = (img.naturalWidth || img.width) / (img.naturalHeight || img.height);
    // For very wide images (e.g. landscape phone photos), fit by width instead so
    // nothing gets cropped beyond the stage.
    let targetW = targetH * aspect;
    let finalH = targetH;
    if (targetW > CANVAS_W * 0.95) {
      targetW = CANVAS_W * 0.95;
      finalH = targetW / aspect;
    }

    if (handImage) {
      handImage.image(img);
      handImage.width(targetW);
      handImage.height(finalH);
      handImage.x((CANVAS_W - targetW) / 2);
      handImage.y((CANVAS_H - finalH) / 2);
    } else {
      handImage = new Konva.Image({
        image: img,
        x: (CANVAS_W - targetW) / 2,
        y: (CANVAS_H - finalH) / 2,
        width: targetW,
        height: finalH,
        listening: false,
      });
      handLayer.add(handImage);
    }
    handLayer.batchDraw();
  }

  async function renderHand(state: DesignState): Promise<void> {
    // User photo takes precedence over the SVG template.
    if (state.userHandImage) {
      const src = state.userHandImage.src;
      if (currentHand && currentHand.kind === 'user' && currentHand.src === src) {
        return;
      }
      const img = await loadImageFromSrc(src);
      placeHandImage(img);
      currentHand = { kind: 'user', src };
      return;
    }

    const tone = STUDIO_CONFIG.skinTones.find((t) => t.id === state.skinToneId);
    const hand = findHand(state.handPoseId);
    if (!tone || !hand) return;

    if (
      currentHand &&
      currentHand.kind === 'template' &&
      currentHand.poseId === state.handPoseId &&
      currentHand.toneHex === tone.hex
    ) {
      return; // no change
    }

    const recolored = recolorHandSvg(hand.svg, tone.hex);
    const img = await loadSvgImage(recolored);
    placeHandImage(img);
    currentHand = { kind: 'template', poseId: state.handPoseId, toneHex: tone.hex };
  }

  async function renderMotifs(state: DesignState): Promise<void> {
    const henna = STUDIO_CONFIG.hennaColors.find((h) => h.id === state.hennaColorId);
    if (!henna) return;

    const hennaChanged = currentHennaHex !== henna.hex;
    currentHennaHex = henna.hex;

    const stateIds = new Set(state.layers.map((l) => l.id));

    // Remove nodes whose layer no longer exists.
    for (const [id, node] of layerNodes) {
      if (!stateIds.has(id)) {
        node.destroy();
        layerNodes.delete(id);
        designSources.delete(id);
      }
    }

    // Add / update motif nodes.
    for (const layer of state.layers) {
      if (layer.kind === 'motif') {
        const motif = findMotif(layer.motifId);
        if (!motif) continue;

        let node = layerNodes.get(layer.id) as Konva.Image | undefined;

        if (!node) {
          const recolored = recolorSvg(motif.svg, henna.hex);
          const img = await loadSvgImage(recolored);
          const naturalSize = 200; // base on-canvas size; scale adjusts from there
          node = new Konva.Image({
            image: img,
            x: layer.x,
            y: layer.y,
            width: naturalSize,
            height: naturalSize,
            offsetX: naturalSize / 2,
            offsetY: naturalSize / 2,
            scaleX: layer.scale,
            scaleY: layer.scale,
            rotation: layer.rotation,
            draggable: true,
            listening: !drawMode,
          });
          node.setAttr('layerId', layer.id);
          attachLayerInteractions(node, layer.id);
          designLayer.add(node);
          layerNodes.set(layer.id, node);
        } else {
          // Reposition / re-rotate to match state (e.g. after undo).
          node.x(layer.x);
          node.y(layer.y);
          node.scaleX(layer.scale);
          node.scaleY(layer.scale);
          node.rotation(layer.rotation);

          if (hennaChanged) {
            // Swap image source to recolor in place.
            const recolored = recolorSvg(motif.svg, henna.hex);
            const img = await loadSvgImage(recolored);
            node.image(img);
          }
        }
        continue;
      }

      if (layer.kind === 'design') {
        let node = layerNodes.get(layer.id) as Konva.Image | undefined;
        if (!node) {
          const img = await loadImageFromSrc(layer.src);
          designSources.set(layer.id, img);
          // Extract just the henna lines and tint them in the chosen color.
          const stamp = extractHennaStamp(img, henna.hex);
          // Fit the stamp to ~70% of the canvas width by default; scale adjusts
          // from there via the transformer.
          const targetW = CANVAS_W * 0.7;
          const aspect = stamp.width / stamp.height;
          const w = targetW;
          const h = targetW / aspect;
          node = new Konva.Image({
            image: stamp,
            x: layer.x,
            y: layer.y,
            width: w,
            height: h,
            offsetX: w / 2,
            offsetY: h / 2,
            scaleX: layer.scale,
            scaleY: layer.scale,
            rotation: layer.rotation,
            opacity: layer.opacity,
            draggable: true,
            listening: !drawMode,
          });
          node.setAttr('layerId', layer.id);
          attachLayerInteractions(node, layer.id);
          designLayer.add(node);
          layerNodes.set(layer.id, node);
        } else {
          node.x(layer.x);
          node.y(layer.y);
          node.scaleX(layer.scale);
          node.scaleY(layer.scale);
          node.rotation(layer.rotation);
          node.opacity(layer.opacity);

          if (hennaChanged) {
            // Re-extract from cached source with the new tint, in-place.
            const src = designSources.get(layer.id);
            if (src) {
              const stamp = extractHennaStamp(src, henna.hex);
              node.image(stamp);
            }
          }
        }
        continue;
      }

      if (layer.kind === 'stroke') {
        let node = layerNodes.get(layer.id) as Konva.Line | undefined;
        if (!node) {
          node = new Konva.Line({
            points: layer.points,
            stroke: layer.color,
            strokeWidth: layer.width,
            lineCap: 'round',
            lineJoin: 'round',
            tension: 0.3,
            // Strokes are committed art, not interactive nodes: never listen so
            // they don't block drawing or selection of motifs underneath/over them.
            listening: false,
            perfectDrawEnabled: false,
          });
          designLayer.add(node);
          layerNodes.set(layer.id, node);
        } else {
          node.points(layer.points);
          node.stroke(layer.color);
          node.strokeWidth(layer.width);
        }
        continue;
      }
    }

    // Keep transformer attached if its node still exists.
    const sel = state.selectedLayerId;
    if (sel && layerNodes.has(sel)) {
      transformer.nodes([layerNodes.get(sel)!]);
    } else {
      transformer.nodes([]);
    }
    transformer.moveToTop();

    designLayer.batchDraw();
  }

  function attachLayerInteractions(node: Konva.Image, layerId: string): void {
    node.on('mousedown touchstart', (e) => {
      e.cancelBubble = true;
      dispatch({ type: 'select-layer', id: layerId });
    });

    node.on('dragend', () => {
      dispatch({
        type: 'update-layer',
        id: layerId,
        patch: { x: node.x(), y: node.y() },
      });
    });

    node.on('transformend', () => {
      // Konva reports transforms as scaleX/scaleY/rotation; we treat scale as uniform.
      dispatch({
        type: 'update-layer',
        id: layerId,
        patch: {
          x: node.x(),
          y: node.y(),
          scale: node.scaleX(),
          rotation: node.rotation(),
        },
      });
    });
  }

  // ---- Subscribe to state ----

  let renderTicket = 0;
  function rerender(state: DesignState): void {
    const ticket = ++renderTicket;
    void Promise.all([renderHand(state), renderMotifs(state)]).then(() => {
      if (ticket !== renderTicket) return; // newer render started; skip
    });
  }

  // Initial render.
  rerender(getState());
  const unsubscribe = subscribe(rerender);

  // ---- Responsive sizing ----

  function resize(): void {
    const parent = container.parentElement;
    if (!parent) return;
    const parentW = parent.clientWidth;
    if (parentW === 0) return;
    const scale = parentW / CANVAS_W;
    stage.width(parentW);
    stage.height(CANVAS_H * scale);
    stage.scale({ x: scale, y: scale });
    stage.batchDraw();
  }

  resize();
  const onResize = () => resize();
  window.addEventListener('resize', onResize);

  // Delete / Backspace removes the currently-selected motif (desktop convenience —
  // mobile users get the same affordance via the toolbar button).
  function onKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Delete' && e.key !== 'Backspace') return;
    const target = e.target as HTMLElement | null;
    // Ignore when typing in an input/textarea/select so we don't hijack form editing.
    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    const sel = getState().selectedLayerId;
    if (!sel) return;
    e.preventDefault();
    dispatch({ type: 'remove-layer', id: sel });
  }
  window.addEventListener('keydown', onKeyDown);

  // ---- Public API ----

  async function exportPng(): Promise<Blob> {
    // Temporarily detach transformer so it doesn't appear in the export.
    const wasSelected = transformer.nodes();
    transformer.nodes([]);
    designLayer.batchDraw();

    const dataUrl = stage.toDataURL({
      pixelRatio: 2,
      mimeType: 'image/png',
    });

    transformer.nodes(wasSelected);
    designLayer.batchDraw();

    const res = await fetch(dataUrl);
    return await res.blob();
  }

  function destroy(): void {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
    unsubscribe();
    stage.destroy();
  }

  return { exportPng, resize, setDrawMode, setBrushWidth, destroy };
}

// ---- helpers ----

/**
 * Loads an SVG string into an HTMLImageElement, ready to feed to Konva.Image.
 * Caller doesn't need to manage the blob URL — we revoke it after the image loads.
 */
function loadSvgImage(svgText: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };
    img.src = url;
  });
}

/**
 * Extracts just the henna lines from a design photo and tints them in the
 * chosen henna color, returning a transparent-background canvas ready to
 * compose onto the studio stage.
 *
 * How it works:
 *   1. Downsample large source photos to keep pixel work fast (~50 ms cap).
 *   2. Sample the corners of the photo — assume they're skin/background — to
 *      get a baseline luminance.
 *   3. Any pixel meaningfully darker than the baseline is treated as henna;
 *      its alpha scales with how much darker it is.
 *   4. Replace every kept pixel's RGB with the requested henna color so a
 *      brown-henna source photo can still be previewed as jagua, etc.
 *
 * Not a perfect background remover — but for clean studio shots (which our
 * curated gallery is) it produces a usable "place on hand" preview without
 * any cloud APIs, ML models, or per-photo manual prep.
 */
function extractHennaStamp(img: HTMLImageElement, hennaHex: string): HTMLCanvasElement {
  const MAX_DIM = 800;
  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  const scale = Math.min(1, MAX_DIM / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;

  // Parse the requested henna color once.
  const tintR = parseInt(hennaHex.slice(1, 3), 16);
  const tintG = parseInt(hennaHex.slice(3, 5), 16);
  const tintB = parseInt(hennaHex.slice(5, 7), 16);

  // Sample the four corners to estimate the skin/background luminance.
  const lum = (r: number, g: number, b: number) => 0.299 * r + 0.587 * g + 0.114 * b;
  const sampleSize = Math.max(2, Math.round(Math.min(w, h) * 0.05));
  let lumSum = 0;
  let lumCount = 0;
  const sampleRect = (x0: number, y0: number) => {
    for (let y = y0; y < y0 + sampleSize && y < h; y++) {
      for (let x = x0; x < x0 + sampleSize && x < w; x++) {
        const i = (y * w + x) * 4;
        lumSum += lum(px[i], px[i + 1], px[i + 2]);
        lumCount++;
      }
    }
  };
  sampleRect(0, 0);
  sampleRect(w - sampleSize, 0);
  sampleRect(0, h - sampleSize);
  sampleRect(w - sampleSize, h - sampleSize);
  const baselineLum = lumCount > 0 ? lumSum / lumCount : 180;

  // Anything significantly darker than the baseline is henna; alpha scales
  // with how much darker. The "soft" threshold prevents a hard cutoff that
  // would create chunky edges.
  const cutoff = baselineLum * 0.82;
  const fadeStart = baselineLum * 0.95;

  for (let i = 0; i < px.length; i += 4) {
    const l = lum(px[i], px[i + 1], px[i + 2]);
    let alpha: number;
    if (l <= cutoff) {
      alpha = 255;
    } else if (l >= fadeStart) {
      alpha = 0;
    } else {
      alpha = Math.round(255 * (1 - (l - cutoff) / (fadeStart - cutoff)));
    }
    if (alpha === 0) {
      px[i + 3] = 0;
    } else {
      // Tint with the chosen henna color; darker source pixels stay slightly
      // more saturated so the design retains depth.
      const blend = 1 - l / 255; // 0..1, more for darker source pixels
      px[i]     = Math.round(tintR * (0.65 + 0.35 * blend));
      px[i + 1] = Math.round(tintG * (0.65 + 0.35 * blend));
      px[i + 2] = Math.round(tintB * (0.65 + 0.35 * blend));
      px[i + 3] = alpha;
    }
  }

  ctx.putImageData(data, 0, 0);
  return canvas;
}

/** Load any URL (data URL, blob URL, or remote http URL) into an Image element. */
function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

/** Helper for the UI to drop a motif at canvas center. */
export function addMotifAtCenter(motifId: string): void {
  dispatch({
    type: 'add-motif',
    motifId,
    x: CANVAS_W / 2,
    y: CANVAS_H / 2,
  });
}

/** Helper for the UI to drop a full henna design photo onto the canvas. */
export function addDesignAtCenter(src: string): void {
  dispatch({
    type: 'add-design',
    src,
    x: CANVAS_W / 2,
    y: CANVAS_H / 2,
  });
}
