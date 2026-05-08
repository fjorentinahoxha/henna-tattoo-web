// Auto-discovered hand pose registry. Drop an SVG into src/assets/studio/hands/<name>.svg and
// add a matching id to studio.config.ts > handPoses.

const RAW = import.meta.glob('../../../assets/studio/hands/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export type HandEntry = {
  id: string;
  svg: string;
};

function parsePath(path: string): string | null {
  const match = path.match(/hands\/([^/]+)\.svg$/);
  return match ? match[1] : null;
}

export const HANDS: HandEntry[] = Object.entries(RAW)
  .map(([path, svg]) => {
    const id = parsePath(path);
    if (!id) return null;
    return { id, svg };
  })
  .filter((h): h is HandEntry => h !== null);

export function findHand(id: string): HandEntry | undefined {
  return HANDS.find((h) => h.id === id);
}

/**
 * Recolor the hand SVG's skin areas to the chosen tone.
 * Convention: a `<g data-skin>` wrapper marks the recolorable region. We swap its `fill` attr.
 */
export function recolorHandSvg(svg: string, hex: string): string {
  return svg.replace(
    /(<g[^>]*data-skin[^>]*?)(\sfill="[^"]*")?([^>]*>)/,
    (_match, before, _existingFill, after) => `${before} fill="${hex}"${after}`,
  );
}
