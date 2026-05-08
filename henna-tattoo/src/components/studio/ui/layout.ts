// Builds the studio's DOM around the canvas mount point.
// Vanilla TS — no framework. Each panel reads from the store and dispatches actions.

import type { Lang } from '../../../lib/i18n';
import { dict, pick, fmt } from '../../../lib/i18n';
import { getCategories } from '../../../lib/categories';
import { getSite } from '../../../lib/site';

import { STUDIO_CONFIG } from '../studio.config';
import { dispatch, getState, subscribe } from '../domain/state';
import { MOTIFS } from '../registry/motifs';
import { addMotifAtCenter } from '../canvas/studio-app';

export type CanvasHandles = {
  exportPng: () => Promise<Blob>;
  resize: () => void;
};

export function buildLayout(root: HTMLElement, lang: Lang, canvas: CanvasHandles): void {
  const t = dict.studio;
  const categories = getCategories(lang);
  const site = getSite(lang);

  root.innerHTML = '';
  root.classList.add('studio-root');

  // ---- Wrapper grid: canvas + panels ----
  const grid = el('div', 'grid gap-6 lg:grid-cols-[1fr_22rem]');
  root.appendChild(grid);

  const canvasWrap = el(
    'div',
    'relative rounded-3xl border border-henna-100 bg-cream/60 shadow-sm overflow-hidden',
  );
  const canvasMount = el('div', 'studio-canvas-mount block w-full');
  canvasWrap.appendChild(canvasMount);
  grid.appendChild(canvasWrap);

  const panels = el('aside', 'flex flex-col gap-4');
  grid.appendChild(panels);

  panels.appendChild(buildSkinPanel(lang));
  panels.appendChild(buildHennaPanel(lang));
  panels.appendChild(buildMotifsPanel(lang));
  panels.appendChild(buildPricingPanel(lang, categories));
  panels.appendChild(buildSharePanel(lang, categories, canvas, site.contact.whatsappNumber));

  // Hint above canvas — friendly empty-state instruction
  const hint = el(
    'p',
    'mt-3 text-xs text-ink/55 text-center sm:text-sm',
    pick(t.empty.hint, lang),
  );
  canvasWrap.parentElement?.insertBefore(hint, canvasWrap.nextSibling);

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

function buildSkinPanel(lang: Lang): HTMLElement {
  const { card, body } = panelShell('skin', lang);

  const row = el('div', 'flex flex-wrap gap-2');
  body.appendChild(row);

  const swatches: HTMLButtonElement[] = [];

  for (const tone of STUDIO_CONFIG.skinTones) {
    const btn = el(
      'button',
      'studio-swatch group relative h-10 w-10 rounded-full border-2 border-henna-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-henna-500',
    ) as HTMLButtonElement;
    btn.type = 'button';
    btn.style.backgroundColor = tone.hex;
    btn.setAttribute('aria-label', pick(tone.label, lang));
    btn.dataset.toneId = tone.id;
    btn.addEventListener('click', () => {
      dispatch({ type: 'set-skin', toneId: tone.id });
    });
    swatches.push(btn);
    row.appendChild(btn);
  }

  const refresh = (state = getState()) => {
    for (const btn of swatches) {
      const active = btn.dataset.toneId === state.skinToneId;
      btn.classList.toggle('ring-2', active);
      btn.classList.toggle('ring-henna-700', active);
      btn.classList.toggle('ring-offset-2', active);
      btn.classList.toggle('ring-offset-cream', active);
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

function buildMotifsPanel(lang: Lang): HTMLElement {
  const { card, body } = panelShell('motifs', lang);

  const grid = el('div', 'grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2');
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

function buildPricingPanel(
  lang: Lang,
  categories: ReturnType<typeof getCategories>,
): HTMLElement {
  const { card, body } = panelShell('pricing', lang);
  const t = dict.studio.pricing;

  const catLabel = el(
    'label',
    'text-xs font-medium uppercase tracking-wider text-henna-600',
    pick(t.categoryLabel, lang),
  );
  body.appendChild(catLabel);

  const catSelect = el(
    'select',
    'rounded-md border border-henna-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-henna-500',
  ) as HTMLSelectElement;
  body.appendChild(catSelect);

  // Populate from categories.ts using the henna color's categoryId mapping.
  for (const henna of STUDIO_CONFIG.hennaColors) {
    const cat = categories.find((c) => c.slug === henna.categoryId);
    if (!cat) continue;
    const opt = document.createElement('option');
    opt.value = henna.id;
    opt.textContent = `${pick(henna.label, lang)} — ${cat.title}`;
    catSelect.appendChild(opt);
  }

  catSelect.addEventListener('change', () => {
    dispatch({ type: 'set-henna', colorId: catSelect.value });
  });

  const sizeLabel = el(
    'label',
    'mt-1 text-xs font-medium uppercase tracking-wider text-henna-600',
    pick(t.sizeLabel, lang),
  );
  body.appendChild(sizeLabel);

  const sizeSelect = el(
    'select',
    'rounded-md border border-henna-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-henna-500',
  ) as HTMLSelectElement;
  body.appendChild(sizeSelect);

  sizeSelect.addEventListener('change', () => {
    dispatch({ type: 'set-size', sizeIndex: Number(sizeSelect.value) });
  });

  const priceWrap = el(
    'div',
    'mt-2 flex items-end justify-between rounded-xl bg-henna-50 px-4 py-3',
  );
  const priceLabelEl = el(
    'span',
    'text-xs font-medium uppercase tracking-wider text-henna-600',
    pick(t.priceLabel, lang),
  );
  const priceVal = el(
    'span',
    'font-display text-2xl text-henna-700',
    '—',
  );
  priceWrap.appendChild(priceLabelEl);
  priceWrap.appendChild(priceVal);
  body.appendChild(priceWrap);

  const note = el('p', 'mt-1 text-[11px] leading-snug text-ink/55', pick(t.note, lang));
  body.appendChild(note);

  // Refresh: rebuild size list and price when category or size changes.
  const refresh = (state = getState()) => {
    catSelect.value = state.hennaColorId;

    const henna = STUDIO_CONFIG.hennaColors.find((h) => h.id === state.hennaColorId);
    if (!henna) return;
    const cat = categories.find((c) => c.slug === henna.categoryId);
    if (!cat) return;

    // Repopulate size options if needed.
    const desiredCount = cat.priceList.length;
    if (sizeSelect.options.length !== desiredCount || sizeSelect.dataset.cat !== cat.slug) {
      sizeSelect.innerHTML = '';
      for (let i = 0; i < cat.priceList.length; i++) {
        const item = cat.priceList[i];
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = `${item.name} — ${item.price}`;
        sizeSelect.appendChild(opt);
      }
      sizeSelect.dataset.cat = cat.slug;
    }

    const safeIndex = Math.min(state.sizeIndex, cat.priceList.length - 1);
    sizeSelect.value = String(safeIndex);
    priceVal.textContent = cat.priceList[safeIndex].price;
  };
  subscribe(refresh);
  refresh();

  return card;
}

function buildSharePanel(
  lang: Lang,
  categories: ReturnType<typeof getCategories>,
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

  downloadBtn.addEventListener('click', async () => {
    const blob = await canvas.exportPng();
    triggerDownload(blob, `henna-design-${Date.now()}.png`);
  });

  waBtn.addEventListener('click', async () => {
    const state = getState();
    const henna = STUDIO_CONFIG.hennaColors.find((h) => h.id === state.hennaColorId);
    const cat = henna ? categories.find((c) => c.slug === henna.categoryId) : undefined;
    if (!henna || !cat) return;
    const sizeItem = cat.priceList[state.sizeIndex] ?? cat.priceList[0];

    const message = fmt(pick(dict.studio.share.waMessage, lang), {
      category: `${pick(henna.label, lang)} — ${cat.title}`,
      size: sizeItem.name,
      price: sizeItem.price,
    });

    const blob = await canvas.exportPng();

    // Try Web Share API first (mobile, includes file).
    type Navigator2 = Navigator & { canShare?: (data: ShareData) => boolean };
    const nav = navigator as Navigator2;
    const file = new File([blob], 'henna-design.png', { type: 'image/png' });
    const shareData: ShareData = {
      title: 'Henna design',
      text: message,
      files: [file],
    };
    if (nav.share && nav.canShare && nav.canShare(shareData)) {
      try {
        await nav.share(shareData);
        return;
      } catch (e) {
        // user cancelled or share failed; fall through to wa.me
      }
    }

    // Desktop fallback: download the image, then open WhatsApp with the message prefilled.
    triggerDownload(blob, `henna-design-${Date.now()}.png`);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });

  return card;
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
