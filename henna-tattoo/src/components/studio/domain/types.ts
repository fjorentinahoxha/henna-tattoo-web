// Shared types. Pure data — no DOM, no Konva.

import type { Lang } from '../../../lib/i18n';

export type LayerKind = 'motif' | 'stroke' | 'image' | 'design';

export type MotifLayer = {
  id: string;
  kind: 'motif';
  /** Motif registry id (group/name). */
  motifId: string;
  /** Center position in canvas coords. */
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type StrokeLayer = {
  id: string;
  kind: 'stroke';
  /** Flat array [x0, y0, x1, y1, …] in canvas coords. */
  points: number[];
  /** Stroke width in canvas pixels. */
  width: number;
  /** Hex color the line was drawn with (captured from the henna picker). */
  color: string;
};

export type ImageLayer = {
  id: string;
  kind: 'image';
  src: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
};

/**
 * A full henna design photo overlaid onto the canvas (the "tattoo preview"
 * effect). Rendered with `darken` blend so dark henna lines show through and
 * the light skin background of the source photo disappears.
 */
export type DesignOverlayLayer = {
  id: string;
  kind: 'design';
  src: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
};

export type Layer = MotifLayer | StrokeLayer | ImageLayer | DesignOverlayLayer;

export type UserHandImage = {
  /** Data URL of the user's uploaded/captured photo. */
  src: string;
};

export type DesignState = {
  version: 1;
  handPoseId: string;
  skinToneId: string;
  hennaColorId: string;
  /** Picked size tier index into the currently selected category's priceList. */
  sizeIndex: number;
  layers: Layer[];
  /** Id of the layer currently selected on the canvas, or null if none. */
  selectedLayerId: string | null;
  /** When set, the user's own photo replaces the template hand in the canvas. */
  userHandImage: UserHandImage | null;
};

export type StudioContext = {
  lang: Lang;
};
