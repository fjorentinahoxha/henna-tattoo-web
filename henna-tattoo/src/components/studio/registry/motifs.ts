// Auto-discovered motif registry. Drop an SVG into src/assets/studio/motifs/<group>/<name>.svg
// and it appears here on next dev/build. No code changes needed.
//
// We import the raw SVG text so we can re-color and inline it into Konva (Konva.Path can't
// natively load arbitrary SVG with multiple subpaths, but Konva.Image with a Blob URL handles
// it fine — see canvas/studio-app.ts).

const RAW = import.meta.glob('../../../assets/studio/motifs/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export type MotifEntry = {
  /** Stable id used in DesignState — derived from path. */
  id: string;
  /** Group folder name (e.g., 'paisley'). */
  group: string;
  /** File name without extension. */
  name: string;
  /** Raw SVG text. */
  svg: string;
};

function parsePath(path: string): { group: string; name: string } | null {
  // Path looks like '../../../assets/studio/motifs/paisley/paisley-classic.svg'
  const match = path.match(/motifs\/([^/]+)\/([^/]+)\.svg$/);
  if (!match) return null;
  return { group: match[1], name: match[2] };
}

export const MOTIFS: MotifEntry[] = Object.entries(RAW)
  .map(([path, svg]) => {
    const parsed = parsePath(path);
    if (!parsed) return null;
    return {
      id: `${parsed.group}/${parsed.name}`,
      group: parsed.group,
      name: parsed.name,
      svg,
    };
  })
  .filter((m): m is MotifEntry => m !== null)
  .sort((a, b) => a.id.localeCompare(b.id));

export function findMotif(id: string): MotifEntry | undefined {
  return MOTIFS.find((m) => m.id === id);
}

/**
 * Recolor an SVG by replacing currentColor references in fill/stroke attributes.
 * Returns a new SVG string with the requested color baked in — used for both the
 * thumbnail in the picker and the canvas placement.
 */
export function recolorSvg(svg: string, hex: string): string {
  // Konva renders SVGs by drawing them onto an Image. CSS `color` doesn't apply across
  // that boundary, so we resolve currentColor at the SVG-text level.
  return svg.replace(/currentColor/g, hex);
}
