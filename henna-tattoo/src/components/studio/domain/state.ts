// Tiny store. One source of truth, dispatch actions to mutate, subscribe to react.
// Pure: no DOM, no Konva. The canvas and the UI both subscribe to this.

import type { DesignState, Layer, MotifLayer, DesignOverlayLayer, StrokeLayer } from './types';
import { STUDIO_CONFIG } from '../studio.config';

export type Action =
  | { type: 'set-henna';       colorId: string }
  | { type: 'add-motif';       motifId: string; x: number; y: number }
  | { type: 'add-design';      src: string; x: number; y: number }
  | { type: 'add-stroke';      points: number[]; width: number; color: string }
  | { type: 'undo-stroke' }
  | { type: 'update-layer';    id: string; patch: Partial<Omit<Layer, 'id' | 'kind'>> }
  | { type: 'remove-layer';    id: string }
  | { type: 'select-layer';    id: string | null }
  | { type: 'set-user-hand';   src: string }
  | { type: 'clear-user-hand' }
  | { type: 'clear' };

export type Listener = (state: DesignState) => void;

let nextLayerId = 1;
const newId = () => `l${nextLayerId++}`;

const initial: DesignState = {
  version: 1,
  handPoseId:  STUDIO_CONFIG.defaults.handPoseId,
  skinToneId:  STUDIO_CONFIG.defaults.skinToneId,
  hennaColorId: STUDIO_CONFIG.defaults.hennaColorId,
  layers: [],
  selectedLayerId: null,
  userHandImage: null,
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
    case 'set-henna': return { ...s, hennaColorId: a.colorId };
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
      // Auto-select newly added motif so the delete affordance shows up immediately.
      return { ...s, layers: [...s.layers, layer], selectedLayerId: layer.id };
    }
    case 'add-design': {
      const layer: DesignOverlayLayer = {
        id: newId(),
        kind: 'design',
        src: a.src,
        x: a.x,
        y: a.y,
        scale: 1,
        rotation: 0,
        opacity: 0.92,
      };
      return { ...s, layers: [...s.layers, layer], selectedLayerId: layer.id };
    }
    case 'add-stroke': {
      const layer: StrokeLayer = {
        id: newId(),
        kind: 'stroke',
        points: a.points,
        width: a.width,
        color: a.color,
      };
      // Strokes aren't selectable/transformable, so leave the current selection alone.
      return { ...s, layers: [...s.layers, layer] };
    }
    case 'undo-stroke': {
      // Remove the most recently added stroke layer (leave motifs/designs untouched).
      let lastStrokeIdx = -1;
      for (let i = s.layers.length - 1; i >= 0; i--) {
        if (s.layers[i].kind === 'stroke') {
          lastStrokeIdx = i;
          break;
        }
      }
      if (lastStrokeIdx === -1) return s;
      const removed = s.layers[lastStrokeIdx];
      return {
        ...s,
        layers: s.layers.filter((_, i) => i !== lastStrokeIdx),
        selectedLayerId: s.selectedLayerId === removed.id ? null : s.selectedLayerId,
      };
    }
    case 'update-layer': {
      return {
        ...s,
        layers: s.layers.map((l) => (l.id === a.id ? ({ ...l, ...a.patch } as Layer) : l)),
      };
    }
    case 'remove-layer': {
      return {
        ...s,
        layers: s.layers.filter((l) => l.id !== a.id),
        selectedLayerId: s.selectedLayerId === a.id ? null : s.selectedLayerId,
      };
    }
    case 'select-layer': {
      return { ...s, selectedLayerId: a.id };
    }
    case 'set-user-hand': {
      return { ...s, userHandImage: { src: a.src } };
    }
    case 'clear-user-hand': {
      return { ...s, userHandImage: null };
    }
    case 'clear': {
      return { ...s, layers: [], selectedLayerId: null };
    }
  }
}
