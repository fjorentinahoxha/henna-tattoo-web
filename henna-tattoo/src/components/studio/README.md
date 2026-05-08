# Henna Design Studio

The interactive tattoo builder at `/studio` and `/en/studio`. Self-contained: delete this folder and the rest of the site still builds.

## What's here

```
studio/
  README.md              ← you are here
  studio.config.ts       ← single source of truth for palettes, hand poses, defaults
  index.ts               ← `mountStudio(rootEl, lang)` — Astro page calls this
  i18n.ts                ← studio-only translation helper
  domain/                ← pure types, no DOM/canvas
  registry/              ← auto-discovered assets (motifs, hands)
  canvas/                ← Konva-specific code (the only place Konva is imported)
  ui/                    ← DOM panels (vanilla TS, no framework)
```

## The 5 recipes

If a future change doesn't fit one of these, the architecture is wrong and we should fix it before adding the change.

### 1. Add a new motif

1. Drop the SVG into `src/assets/studio/motifs/<group>/<name>.svg`.
2. Make sure paths use `fill="currentColor"` (or `stroke="currentColor"`) so it picks up the henna color.
3. The registry auto-discovers it on next dev/build. Done.

### 2. Add a new hand pose

1. Drop SVG into `src/assets/studio/hands/<name>.svg`. Wrap the recolorable area with `<g data-skin>` so the skin tone picker can recolor it.
2. Add an entry `{ id: '<name>', label: { en, sq } }` to `studio.config.ts > handPoses`.

### 3. Add a new henna color

1. Append `{ id, label: { sq, en }, hex, categoryId }` to `studio.config.ts > hennaColors`.
2. The `categoryId` must match a slug in `src/lib/categories.ts` so price calc just works.

### 4. Add a new tool (e.g., free-draw, eraser, stamp)

1. Create `canvas/tools/<tool>-tool.ts` exporting `{ id, onActivate, onPointerDown, onPointerMove, onPointerUp }`.
2. Register in `canvas/studio-app.ts`.
3. Add a label key in `src/lib/i18n.ts > dict.studio.tools.<id>` for both languages.

### 5. Add a new share target (e.g., Telegram, Pinterest)

1. Add an entry in `ui/panel-share.ts > SHARE_TARGETS` with `{ id, label, build(state, png) -> action }`.
2. The button renders automatically.

## Conventions

- Files: kebab-case. Types: PascalCase. Functions: camelCase. Constants: SCREAMING_SNAKE.
- No magic numbers — put constants in `studio.config.ts`.
- Pure functions over classes wherever possible.
- Errors are values, not exceptions: I/O fns return `{ ok: true, value } | { ok: false, error }`.
- Named exports only — no default exports.
- No `any`, no `// @ts-ignore`. If something's hard to type, write it in `domain/types.ts` first.

## Running

This module is loaded only on `/studio`. Konva (~120 KB) does **not** ship to other pages. Verify after `npm run build` by checking that `dist/_astro/` chunks for non-studio pages don't include `konva`.
