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
  /** Cleanup. */
  destroy: () => void;
};

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
  // without rebuilding the whole stage on every change.
  const motifNodes = new Map<string, Konva.Image>();

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

  // Track which layer is selected.
  let selectedId: string | null = null;

  // Click on empty area deselects.
  stage.on('mousedown touchstart', (e) => {
    if (e.target === stage) {
      selectedId = null;
      transformer.nodes([]);
      designLayer.batchDraw();
    }
  });

  // ---- Rendering: state -> Konva ----

  let currentHand: { poseId: string; toneHex: string } | null = null;
  let currentHennaHex: string | null = null;

  let handImage: Konva.Image | null = null;

  async function renderHand(state: DesignState): Promise<void> {
    const tone = STUDIO_CONFIG.skinTones.find((t) => t.id === state.skinToneId);
    const hand = findHand(state.handPoseId);
    if (!tone || !hand) return;

    if (
      currentHand &&
      currentHand.poseId === state.handPoseId &&
      currentHand.toneHex === tone.hex
    ) {
      return; // no change
    }

    const recolored = recolorHandSvg(hand.svg, tone.hex);
    const img = await loadSvgImage(recolored);

    // Fit hand into ~85% of canvas height, centered.
    const targetH = CANVAS_H * 0.88;
    const aspect = img.width / img.height;
    const targetW = targetH * aspect;

    if (handImage) {
      handImage.image(img);
      handImage.width(targetW);
      handImage.height(targetH);
      handImage.x((CANVAS_W - targetW) / 2);
      handImage.y((CANVAS_H - targetH) / 2);
    } else {
      handImage = new Konva.Image({
        image: img,
        x: (CANVAS_W - targetW) / 2,
        y: (CANVAS_H - targetH) / 2,
        width: targetW,
        height: targetH,
        listening: false,
      });
      handLayer.add(handImage);
    }

    handLayer.batchDraw();
    currentHand = { poseId: state.handPoseId, toneHex: tone.hex };
  }

  async function renderMotifs(state: DesignState): Promise<void> {
    const henna = STUDIO_CONFIG.hennaColors.find((h) => h.id === state.hennaColorId);
    if (!henna) return;

    const hennaChanged = currentHennaHex !== henna.hex;
    currentHennaHex = henna.hex;

    const stateIds = new Set(state.layers.map((l) => l.id));

    // Remove nodes whose layer no longer exists.
    for (const [id, node] of motifNodes) {
      if (!stateIds.has(id)) {
        node.destroy();
        motifNodes.delete(id);
        if (selectedId === id) {
          selectedId = null;
          transformer.nodes([]);
        }
      }
    }

    // Add / update motif nodes.
    for (const layer of state.layers) {
      if (layer.kind !== 'motif') continue;
      const motif = findMotif(layer.motifId);
      if (!motif) continue;

      let node = motifNodes.get(layer.id);

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
        });
        node.setAttr('layerId', layer.id);
        attachLayerInteractions(node, layer.id);
        designLayer.add(node);
        motifNodes.set(layer.id, node);
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
    }

    // Keep transformer attached if its node still exists.
    if (selectedId && motifNodes.has(selectedId)) {
      transformer.nodes([motifNodes.get(selectedId)!]);
    } else {
      transformer.nodes([]);
    }
    transformer.moveToTop();

    designLayer.batchDraw();
  }

  function attachLayerInteractions(node: Konva.Image, layerId: string): void {
    node.on('mousedown touchstart', (e) => {
      e.cancelBubble = true;
      selectedId = layerId;
      transformer.nodes([node]);
      transformer.moveToTop();
      designLayer.batchDraw();
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
    unsubscribe();
    stage.destroy();
  }

  return { exportPng, resize, destroy };
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

/** Helper for the UI to drop a motif at canvas center. */
export function addMotifAtCenter(motifId: string): void {
  dispatch({
    type: 'add-motif',
    motifId,
    x: CANVAS_W / 2,
    y: CANVAS_H / 2,
  });
}
