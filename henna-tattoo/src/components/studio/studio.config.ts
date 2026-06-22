// Single source of truth for everything pluggable in the studio.
// Adding a skin tone, henna color, or default selection happens HERE — never in canvas/ui code.
//
// To add a new motif: drop the SVG into src/assets/studio/motifs/<group>/<name>.svg.
// To add a new hand pose: drop the SVG into src/assets/studio/hands/<name>.svg and add to handPoses.
// To add a new henna color or skin tone: append to the arrays below.

import type { Bilingual } from '../../lib/i18n';

export type SkinTone = {
  id: string;
  label: Bilingual;
  hex: string;
};

export type HennaColor = {
  id: string;
  label: Bilingual;
  hex: string;
  /** Maps the visual color to a real pricing category in src/lib/categories.ts */
  categoryId: 'brown-henna' | 'jagua-henna' | 'white-henna' | 'glitter-henna' | 'colorful-henna';
};

export type HandPose = {
  id: string;
  label: Bilingual;
};

export const STUDIO_CONFIG = {
  canvas: {
    width: 800,
    height: 1000,
    background: '#fdf8f3',
  },

  skinTones: [
    { id: 'light', label: { en: 'Light',  sq: 'E hapur' },     hex: '#f5d6b8' },
    { id: 'fair',  label: { en: 'Fair',   sq: 'E lehtë' },     hex: '#e6b894' },
    { id: 'tan',   label: { en: 'Tan',    sq: 'E nxirë' },     hex: '#cf9472' },
    { id: 'olive', label: { en: 'Olive',  sq: 'E ullinjtë' },  hex: '#a87852' },
    { id: 'brown', label: { en: 'Brown',  sq: 'Kafe' },        hex: '#7d4f30' },
    { id: 'deep',  label: { en: 'Deep',   sq: 'E thellë' },    hex: '#523320' },
  ] satisfies SkinTone[],

  hennaColors: [
    { id: 'brown',  label: { en: 'Brown',         sq: 'Kafe' },         hex: '#5a2410', categoryId: 'brown-henna' },
    { id: 'jagua',  label: { en: 'Jagua',         sq: 'Jagua' },        hex: '#16182a', categoryId: 'jagua-henna' },
    { id: 'white',  label: { en: 'White',         sq: 'E bardhë' },     hex: '#f5f5f5', categoryId: 'white-henna' },
    { id: 'gold',   label: { en: 'Glitter gold',  sq: 'Ari me xixa' },  hex: '#c9a227', categoryId: 'glitter-henna' },
    { id: 'red',    label: { en: 'Red',           sq: 'E kuqe' },       hex: '#c0392b', categoryId: 'colorful-henna' },
    { id: 'pink',   label: { en: 'Pink',          sq: 'Rozë' },         hex: '#e91e63', categoryId: 'colorful-henna' },
  ] satisfies HennaColor[],

  handPoses: [
    { id: 'palm', label: { en: 'Open palm', sq: 'Pëllëmba e hapur' } },
  ] satisfies HandPose[],

  defaults: {
    skinToneId: 'fair',
    hennaColorId: 'brown',
    handPoseId: 'palm',
    /** Index into the chosen category's priceList (0 = smallest). */
    sizeIndex: 0,
  },

  motifs: {
    /** Default scale (relative to natural SVG viewBox) when a motif is dropped on the canvas. */
    initialScale: 0.5,
  },

  draw: {
    /** Brush widths (in canvas pixels) offered by the free-draw tool. */
    brushSizes: [
      { id: 'thin',   label: { en: 'Thin',   sq: 'Hollë' },    width: 5 },
      { id: 'medium', label: { en: 'Medium', sq: 'Mesatare' }, width: 10 },
      { id: 'thick',  label: { en: 'Thick',  sq: 'Trashë' },   width: 17 },
    ],
    defaultSizeId: 'medium',
  },
} as const;

export type StudioConfig = typeof STUDIO_CONFIG;
