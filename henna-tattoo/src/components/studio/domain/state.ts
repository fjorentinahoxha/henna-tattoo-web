// Tiny store. One source of truth, dispatch actions to mutate, subscribe to react.
// Pure: no DOM, no Konva. The canvas and the UI both subscribe to this.

import type { DesignState, Layer, MotifLayer } from './types';
import { STUDIO_CONFIG } from '../studio.config';

export type Action =
  | { type: 'set-skin';      toneId: string }
  | { type: 'set-henna';     colorId: string }
  | { type: 'set-size';      sizeIndex: number }
  | { type: 'add-motif';     motifId: string; x: number; y: number }
  | { type: 'update-layer';  id: string; patch: Partial<Omit<Layer, 'id' | 'kind'>> }
  | { type: 'remove-layer';  id: string }
  | { type: 'clear' };

export type Listener = (state: DesignState) => void;

let nextLayerId = 1;
const newId = () => `l${nextLayerId++}`;

const initial: DesignState = {
  version: 1,
  handPoseId:  STUDIO_CONFIG.defaults.handPoseId,
  skinToneId:  STUDIO_CONFIG.defaults.skinToneId,
  hennaColorId: STUDIO_CONFIG.defaults.hennaColorId,
  sizeIndex:   STUDIO_CONFIG.defaults.sizeIndex,
  layers: [],
};

let state: DesignState = initial;
const listeners = new Set<Listener>();

export function getState(): DesignState {
  return state;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function dispatch(action: Action): void {
  state = reduce(state, action);
  for (const l of listeners) l(state);
}

function reduce(s: DesignState, a: Action): DesignState {
  switch (a.type) {
    case 'set-skin':  return { ...s, skinToneId:   a.toneId };
    case 'set-henna': return { ...s, hennaColorId: a.colorId };
    case 'set-size':  return { ...s, sizeIndex:    a.sizeIndex };
    case 'add-motif': {
      const layer: MotifLayer = {
        id: newId(),
        kind: 'motif',
        motifId: a.motifId,
        x: a.x,
        y: a.y,
        scale: STUDIO_CONFIG.motifs.initialScale,
        rotation: 0,
      };
      return { ...s, layers: [...s.layers, layer] };
    }
    case 'update-layer': {
      return {
        ...s,
        layers: s.layers.map((l) => (l.id === a.id ? ({ ...l, ...a.patch } as Layer) : l)),
      };
    }
    case 'remove-layer': {
      return { ...s, layers: s.layers.filter((l) => l.id !== a.id) };
    }
    case 'clear': {
      return { ...s, layers: [] };
    }
  }
}
