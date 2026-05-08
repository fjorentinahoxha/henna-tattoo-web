// Shared types. Pure data — no DOM, no Konva.

import type { Lang } from '../../../lib/i18n';

export type LayerKind = 'motif' | 'stroke' | 'image';

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

export type Layer = MotifLayer | StrokeLayer | ImageLayer;

export type DesignState = {
  version: 1;
  handPoseId: string;
  skinToneId: string;
  hennaColorId: string;
  /** Picked size tier index into the currently selected category's priceList. */
  sizeIndex: number;
  layers: Layer[];
};

export type StudioContext = {
  lang: Lang;
};
