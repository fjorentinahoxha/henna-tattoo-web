// Public entry point. The Astro page calls mountStudio() to boot the studio
// inside its mount root. Loaded only on /studio so Konva doesn't ship to other pages.

import type { Lang } from '../../lib/i18n';
import { buildLayout, getCanvasMount } from './ui/layout';
import { mountCanvas } from './canvas/studio-app';

export type StudioHandles = {
  destroy: () => void;
};

export function mountStudio(root: HTMLElement, lang: Lang): StudioHandles {
  // Build the DOM panels first; canvas needs a real DOM node to mount into.
  // The canvas handles are exposed back through the share/download buttons.
  const placeholder = {
    exportPng: async () => new Blob(),
    resize: () => {},
  };
  buildLayout(root, lang, placeholder);

  const mount = getCanvasMount(root);
  const canvas = mountCanvas(mount);

  // Replace placeholder by patching prototype methods used in the layout closure.
  // Simpler: just wire after the fact via the dataset hook.
  placeholder.exportPng = canvas.exportPng;
  placeholder.resize = canvas.resize;

  // Trigger an initial layout-driven resize (canvas mount may have just become sized).
  requestAnimationFrame(() => canvas.resize());

  return {
    destroy: () => {
      canvas.destroy();
      root.innerHTML = '';
    },
  };
}
