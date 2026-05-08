// Studio-specific translation helper. Re-uses the main dict in src/lib/i18n.ts so
// translations stay in one place.

import { dict, pick, type Lang, fmt } from '../../lib/i18n';

export type StudioDict = typeof dict.studio;

export function t(key: keyof StudioDict, lang: Lang): string {
  const node = dict.studio[key];
  // All leaf keys in dict.studio are bilingual {en, sq} or nested. The keyof guard
  // covers leaves; nested groups (panels, actions, …) are accessed directly via dict.studio.
  if (typeof node === 'object' && 'en' in node && 'sq' in node) {
    return pick(node as { en: string; sq: string }, lang);
  }
  throw new Error(`studio i18n: '${String(key)}' is not a leaf bilingual entry`);
}

export { dict, pick, fmt };
