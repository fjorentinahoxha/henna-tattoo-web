// Builds the studio's DOM around the canvas mount point.
// Vanilla TS — no framework. Each panel reads from the store and dispatches actions.

import type { Lang } from '../../../lib/i18n';
import { dict, pick, fmt } from '../../../lib/i18n';
import { getSite } from '../../../lib/site';

import { STUDIO_CONFIG } from '../studio.config';
import { dispatch, getState, subscribe } from '../domain/state';
import { MOTIFS } from '../registry/motifs';
import { addMotifAtCenter } from '../canvas/studio-app';

export type CanvasHandles = {
  exportPng: () => Blob;
  resize: () => void;
  setDrawMode: (active: boolean) => void;
  setBrushWidth: (width: number) => void;
};

export function buildLayout(root: HTMLElement, lang: Lang, canvas: CanvasHandles): void {
  const site = getSite(lang);

  root.innerHTML = '';
  root.classList.add('studio-root');

  // ---- Row layout: canvas on the left, option panels filling the right ----
  // On desktop the canvas keeps a fixed width on the left and the panels flow in a
  // multi-column grid to its right. minmax(0,1fr) lets the panel area shrink so the
  // columns never overflow the container.
  const grid = el('div', 'grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start');
  root.appendChild(grid);

  const canvasWrap = el(
    'div',
    'relative mx-auto w-full max-w-md lg:max-w-none rounded-3xl border border-henna-100 bg-cream/60 shadow-sm overflow-hidden',
  );
  const canvasMount = el('div', 'studio-canvas-mount block w-full');
  canvasWrap.appendChild(canvasMount);
  grid.appendChild(canvasWrap);

  const panels = el('div', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4');
  grid.appendChild(panels);

  const photoPanel   = buildPhotoPanel(lang);
  const hennaPanel   = buildHennaPanel(lang);
  const drawPanel    = buildDrawPanel(lang, canvas);
  const motifsPanel  = buildMotifsPanel(lang);
  const sharePanel   = buildSharePanel(lang, canvas, site.contact.whatsappNumber);

  panels.append(
    photoPanel, hennaPanel, drawPanel,
    motifsPanel, sharePanel,
  );

  // Hand the canvas its mount and trigger an initial resize after the DOM is in place.
  // The caller passes a mountCanvas fn via canvas.resize after we've placed the node.
  // Re-export the mount node so index.ts can wire it.
  (root as HTMLElement & { __studioCanvasMount?: HTMLDivElement }).__studioCanvasMount =
    canvasMount as HTMLDivElement;
}

/**
 * After buildLayout, retrieve the canvas mount element to feed into mountCanvas().
 */
export function getCanvasMount(root: HTMLElement): HTMLDivElement {
  const mount = (root as HTMLElement & { __studioCanvasMount?: HTMLDivElement })
    .__studioCanvasMount;
  if (!mount) throw new Error('Canvas mount not found — call buildLayout first');
  return mount;
}

// ---------- Panels ----------

function panelShell(titleKey: keyof typeof dict.studio.panels, lang: Lang): {
  card: HTMLElement;
  body: HTMLElement;
} {
  const card = el(
    'section',
    'rounded-2xl border border-henna-100 bg-white/80 p-4 shadow-sm',
  );
  const title = el(
    'h2',
    'eyebrow !text-henna-600 mb-3',
    pick(dict.studio.panels[titleKey], lang),
  );
  const body = el('div', 'flex flex-col gap-3');
  card.appendChild(title);
  card.appendChild(body);
  return { card, body };
}

const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // 10 MB safety cap on uploads

function buildPhotoPanel(lang: Lang): HTMLElement {
  const { card, body } = panelShell('photo', lang);
  const t = dict.studio.photo;

  // Hidden file input — opens gallery picker; on iOS/Android the OS picker
  // typically also offers "Take photo" which uses the camera.
  const fileInput = el('input', 'sr-only') as HTMLInputElement;
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  body.appendChild(fileInput);

  // Instruction text now sits as a heading above an icon-only button.
  const uploadTitle = el(
    'p',
    'text-sm font-medium text-ink/80 leading-snug',
    pick(t.uploadBtn, lang),
  );
  body.appendChild(uploadTitle);

  const uploadBtn = el(
    'button',
    'btn-secondary justify-center !py-3 !px-4 self-start',
  ) as HTMLButtonElement;
  uploadBtn.type = 'button';
  uploadBtn.setAttribute('aria-label', pick(t.uploadBtn, lang));
  uploadBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  uploadBtn.addEventListener('click', () => fileInput.click());
  body.appendChild(uploadBtn);

  const hint = el('p', 'text-[11px] leading-snug text-ink/55', pick(t.hint, lang));
  body.appendChild(hint);

  // Active state — only shown when a user photo is in use.
  const activeWrap = el('div', 'hidden flex-col gap-3');
  const activeRow = el('div', 'flex items-center gap-3 rounded-xl bg-henna-50 p-2');
  const thumb = el(
    'img',
    'h-14 w-14 rounded-lg object-cover bg-white ring-1 ring-henna-200',
  ) as HTMLImageElement;
  thumb.alt = '';
  const activeLabel = el(
    'span',
    'flex-1 text-xs text-ink/70 leading-snug',
    pick(t.activeLabel, lang),
  );
  activeRow.appendChild(thumb);
  activeRow.appendChild(activeLabel);
  activeWrap.appendChild(activeRow);

  const removeBtn = el(
    'button',
    'self-start text-xs uppercase tracking-wider text-ink/55 underline-offset-4 hover:text-henna-600 hover:underline',
    pick(t.removeBtn, lang),
  ) as HTMLButtonElement;
  removeBtn.type = 'button';
  removeBtn.addEventListener('click', () => {
    dispatch({ type: 'clear-user-hand' });
    fileInput.value = '';
  });
  activeWrap.appendChild(removeBtn);
  body.appendChild(activeWrap);

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    if (file.size > MAX_PHOTO_BYTES) {
      window.alert(pick(t.tooLarge, lang));
      fileInput.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        dispatch({ type: 'set-user-hand', src: result });
      }
    };
    reader.readAsDataURL(file);
  });

  const refresh = (state = getState()) => {
    const hasPhoto = state.userHandImage !== null;
    activeWrap.classList.toggle('hidden', !hasPhoto);
    activeWrap.classList.toggle('flex', hasPhoto);
    uploadTitle.classList.toggle('hidden', hasPhoto);
    uploadBtn.classList.toggle('hidden', hasPhoto);
    hint.classList.toggle('hidden', hasPhoto);
    if (hasPhoto && state.userHandImage) {
      thumb.src = state.userHandImage.src;
    } else {
      thumb.removeAttribute('src');
    }
  };
  subscribe(refresh);
  refresh();

  return card;
}

function buildHennaPanel(lang: Lang): HTMLElement {
  const { card, body } = panelShell('henna', lang);

  const row = el('div', 'flex flex-wrap gap-2');
  body.appendChild(row);

  const swatches: HTMLButtonElement[] = [];

  for (const henna of STUDIO_CONFIG.hennaColors) {
    const btn = el(
      'button',
      'studio-swatch group relative inline-flex items-center gap-2 rounded-full border-2 border-henna-100 px-3 h-10 text-xs font-medium text-ink/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-henna-500',
    ) as HTMLButtonElement;
    btn.type = 'button';
    btn.dataset.colorId = henna.id;

    const dot = el('span', 'inline-block h-4 w-4 rounded-full border border-black/10');
    dot.style.backgroundColor = henna.hex;
    btn.appendChild(dot);
    btn.appendChild(document.createTextNode(pick(henna.label, lang)));

    btn.addEventListener('click', () => {
      dispatch({ type: 'set-henna', colorId: henna.id });
    });
    swatches.push(btn);
    row.appendChild(btn);
  }

  const refresh = (state = getState()) => {
    for (const btn of swatches) {
      const active = btn.dataset.colorId === state.hennaColorId;
      btn.classList.toggle('bg-henna-50', active);
      btn.classList.toggle('border-henna-500', active);
    }
  };
  subscribe(refresh);
  refresh();

  return card;
}

function buildDrawPanel(lang: Lang, canvas: CanvasHandles): HTMLElement {
  const { card, body } = panelShell('draw', lang);
  const t = dict.studio.draw;

  let drawing = false;

  // On/off toggle.
  const toggleBtn = el(
    'button',
    'btn-secondary justify-center !py-3 text-sm',
  ) as HTMLButtonElement;
  toggleBtn.type = 'button';
  body.appendChild(toggleBtn);

  // Brush size picker.
  const brushLabel = el(
    'span',
    'text-xs font-medium uppercase tracking-wider text-henna-600',
    pick(t.brushLabel, lang),
  );
  body.appendChild(brushLabel);

  const brushRow = el('div', 'flex flex-wrap gap-2');
  body.appendChild(brushRow);

  const brushBtns: HTMLButtonElement[] = [];
  for (const size of STUDIO_CONFIG.draw.brushSizes) {
    const btn = el(
      'button',
      'inline-flex items-center gap-2 rounded-full border-2 border-henna-100 px-3 h-10 text-xs font-medium text-ink/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-henna-500',
    ) as HTMLButtonElement;
    btn.type = 'button';
    btn.dataset.sizeId = size.id;

    // Little dot whose size hints at the brush width.
    const dotPx = Math.round(size.width / 1.6);
    const dot = el('span', 'inline-block rounded-full bg-henna-700');
    dot.style.width = `${dotPx}px`;
    dot.style.height = `${dotPx}px`;
    btn.appendChild(dot);
    btn.appendChild(document.createTextNode(pick(size.label, lang)));

    btn.addEventListener('click', () => {
      canvas.setBrushWidth(size.width);
      for (const b of brushBtns) {
        const active = b.dataset.sizeId === size.id;
        b.classList.toggle('bg-henna-50', active);
        b.classList.toggle('border-henna-500', active);
      }
    });
    brushBtns.push(btn);
    brushRow.appendChild(btn);
  }
  // Pre-select the default brush.
  const defaultBtn =
    brushBtns.find((b) => b.dataset.sizeId === STUDIO_CONFIG.draw.defaultSizeId) ?? brushBtns[0];
  defaultBtn?.classList.add('bg-henna-50', 'border-henna-500');

  // Undo last line.
  const undoBtn = el(
    'button',
    'inline-flex items-center justify-center gap-2 rounded-md border border-henna-200 px-3 py-2 text-sm font-medium text-henna-700 transition hover:bg-henna-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
  ) as HTMLButtonElement;
  undoBtn.type = 'button';
  undoBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg><span>${pick(t.undo, lang)}</span>`;
  undoBtn.addEventListener('click', () => {
    dispatch({ type: 'undo-stroke' });
  });
  body.appendChild(undoBtn);

  const hint = el('p', 'text-[11px] leading-snug text-ink/55', pick(t.hint, lang));
  body.appendChild(hint);

  function renderToggle(): void {
    toggleBtn.textContent = pick(drawing ? t.stopBtn : t.startBtn, lang);
    toggleBtn.classList.toggle('!bg-henna-600', drawing);
    toggleBtn.classList.toggle('!text-white', drawing);
    hint.textContent = pick(drawing ? t.activeHint : t.hint, lang);
  }

  toggleBtn.addEventListener('click', () => {
    drawing = !drawing;
    canvas.setDrawMode(drawing);
    renderToggle();
  });
  renderToggle();

  // Disable undo when there are no strokes to remove.
  const refresh = (state = getState()) => {
    undoBtn.disabled = !state.layers.some((l) => l.kind === 'stroke');
  };
  subscribe(refresh);
  refresh();

  return card;
}

function buildMotifsPanel(lang: Lang): HTMLElement {
  const { card, body } = panelShell('motifs', lang);

  const grid = el('div', 'grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2');
  body.appendChild(grid);

  for (const motif of MOTIFS) {
    const btn = el(
      'button',
      'studio-motif aspect-square rounded-xl border border-henna-100 bg-cream/40 p-2 text-henna-700 hover:bg-henna-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-henna-500',
    ) as HTMLButtonElement;
    btn.type = 'button';
    btn.setAttribute('aria-label', `${motif.group} ${motif.name}`);

    // Inline the SVG so the thumbnail uses currentColor.
    btn.innerHTML = motif.svg;
    btn.style.color = 'var(--motif-thumb-color, #5a2410)';

    btn.addEventListener('click', () => {
      addMotifAtCenter(motif.id);
    });

    grid.appendChild(btn);
  }

  // Sync thumbnail color with current henna selection.
  const refresh = (state = getState()) => {
    const henna = STUDIO_CONFIG.hennaColors.find((h) => h.id === state.hennaColorId);
    if (!henna) return;
    card.style.setProperty('--motif-thumb-color', henna.hex);
  };
  subscribe(refresh);
  refresh();

  return card;
}

function buildSharePanel(
  lang: Lang,
  canvas: CanvasHandles,
  whatsappNumber: string,
): HTMLElement {
  const { card, body } = panelShell('share', lang);

  const downloadBtn = el(
    'button',
    'btn-primary justify-center !py-3',
    pick(dict.studio.actions.download, lang),
  ) as HTMLButtonElement;
  downloadBtn.type = 'button';
  body.appendChild(downloadBtn);

  const waBtn = el(
    'button',
    'btn-secondary justify-center !py-3',
    pick(dict.studio.actions.sendWa, lang),
  ) as HTMLButtonElement;
  waBtn.type = 'button';
  body.appendChild(waBtn);

  const removeBtn = el(
    'button',
    'mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-henna-200 px-3 py-2 text-sm font-medium text-henna-700 transition hover:bg-henna-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
  ) as HTMLButtonElement;
  removeBtn.type = 'button';
  removeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg><span>${pick(dict.studio.actions.removeSelected, lang)}</span>`;
  removeBtn.disabled = true;
  removeBtn.addEventListener('click', () => {
    const sel = getState().selectedLayerId;
    if (!sel) return;
    dispatch({ type: 'remove-layer', id: sel });
  });
  body.appendChild(removeBtn);

  const clearBtn = el(
    'button',
    'mt-1 self-start text-xs uppercase tracking-wider text-ink/55 underline-offset-4 hover:text-henna-600 hover:underline',
    pick(dict.studio.actions.clear, lang),
  ) as HTMLButtonElement;
  clearBtn.type = 'button';
  clearBtn.addEventListener('click', () => {
    if (getState().layers.length === 0) return;
    if (window.confirm('Clear the design?')) {
      dispatch({ type: 'clear' });
    }
  });
  body.appendChild(clearBtn);

  // Enable / disable the remove button as selection changes.
  const refresh = (state = getState()) => {
    removeBtn.disabled = state.selectedLayerId === null;
  };
  subscribe(refresh);
  refresh();

  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  downloadBtn.addEventListener('click', async () => {
    const blob = canvas.exportPng();
    const name = `henna-design-${Date.now()}.png`;
    const file = new File([blob], name, { type: 'image/png' });
    // On phones a real file "download" is unreliable (iOS ignores it), so use the
    // share sheet — the user picks "Save to Photos". Desktop gets a normal download.
    if (isTouch && canShareFiles(file)) {
      try {
        await navigator.share({ files: [file], title: 'Henna design' });
      } catch {
        /* cancelled — nothing to do */
      }
      return;
    }
    triggerDownload(blob, name);
    showToast(pick(dict.studio.toast.downloaded, lang));
  });

  waBtn.addEventListener('click', async () => {
    const state = getState();
    const henna = STUDIO_CONFIG.hennaColors.find((h) => h.id === state.hennaColorId);
    if (!henna) return;

    const message = fmt(pick(dict.studio.share.waMessage, lang), {
      category: pick(henna.label, lang),
    });

    const blob = canvas.exportPng();
    const file = new File([blob], 'henna-design.png', { type: 'image/png' });

    // Best path on mobile: share the image straight into WhatsApp with the message.
    if (canShareFiles(file)) {
      try {
        await navigator.share({ title: 'Henna design', text: message, files: [file] });
        return;
      } catch {
        /* cancelled or failed — fall through to wa.me link */
      }
    }

    // Fallback: open WhatsApp with the message prefilled (desktop also downloads the image).
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    if (!isTouch) triggerDownload(blob, `henna-design-${Date.now()}.png`);
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url; // popup blocked (mobile) → navigate instead
  });

  return card;
}

/** True when the browser can share an actual file (Web Share API level 2). */
function canShareFiles(file: File): boolean {
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  return (
    typeof nav.share === 'function' &&
    typeof nav.canShare === 'function' &&
    nav.canShare({ files: [file] })
  );
}

/** Brief confirmation toast (e.g. after a download). Auto-dismisses. */
function showToast(message: string): void {
  const toast = el('div', 'studio-toast', message);
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('studio-toast--show'));
  setTimeout(() => {
    toast.classList.remove('studio-toast--show');
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

// ---------- helpers ----------

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
