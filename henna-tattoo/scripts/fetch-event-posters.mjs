#!/usr/bin/env node
/**
 * Downloads Instagram reel poster thumbnails to _originals/events/ so the
 * site can use real video covers behind the click-to-load facade on the
 * home page (instead of the generic gradient placeholders).
 *
 *   npm run posters         # download missing posters only
 *   npm run posters -- --force   # re-download even if already cached
 *
 * The reel IDs are read from src/lib/events.ts (one source of truth).
 * The result lands in _originals/events/<reel-id>.jpg and gets picked up
 * by scripts/optimize-images.mjs on the next build.
 *
 * URLs from /embed/captioned/ are signed short-lived links — that's fine
 * because we copy the bytes locally; the local file is permanent.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, '_originals', 'events');
const EVENTS_TS = path.join(ROOT, 'src', 'lib', 'events.ts');

const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force');

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
  'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';

function decodeHTML(s) {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
}

async function readReelIds() {
  const src = await fs.readFile(EVENTS_TS, 'utf8');
  const ids = [];
  const re = /instagram\.com\/reel\/([A-Za-z0-9_-]+)/g;
  let m;
  while ((m = re.exec(src))) ids.push(m[1]);
  return [...new Set(ids)];
}

function pickLargestSrcset(srcset) {
  // Returns the URL with the largest width descriptor.
  const parts = srcset.split(',').map((p) => p.trim());
  let best = { w: 0, url: null };
  for (const p of parts) {
    const mm = p.match(/^(\S+)\s+(\d+)w$/);
    if (!mm) continue;
    const w = Number(mm[2]);
    if (w > best.w) best = { w, url: mm[1] };
  }
  return best.url;
}

async function findPosterURL(html) {
  // Strategy 1 — the reel <video> poster attribute.
  const poster = html.match(/<video[^>]*\bposter="([^"]+)"/i);
  if (poster) return decodeHTML(poster[1]);

  // Strategy 2 — the largest srcset entry on a frame_cover image.
  const ssRe = /srcset="([^"]*nframe_cover_frame[^"]*)"/i;
  const ss = html.match(ssRe);
  if (ss) {
    const url = pickLargestSrcset(decodeHTML(ss[1]));
    if (url) return url;
  }

  // Strategy 3 — any large-ish jpg srcset on the embed.
  const ssAny = html.match(/srcset="([^"]+ \d{3,4}w[^"]*)"/i);
  if (ssAny) {
    const url = pickLargestSrcset(decodeHTML(ssAny[1]));
    if (url) return url;
  }

  // Strategy 4 — first .fbcdn.net jpg link in the page.
  const fb = html.match(/https:\/\/[a-z0-9.\-]+fbcdn\.net\/[^\s"<>]+\.jpe?g[^\s"<>]*/i);
  if (fb) return decodeHTML(fb[0]);

  return null;
}

async function fetchReelPoster(id) {
  const dest = path.join(OUT_DIR, `${id}.jpg`);
  const exists = await fs.access(dest).then(() => true).catch(() => false);
  if (exists && !FORCE) {
    console.log(`  ✓ ${id}.jpg (cached)`);
    return { id, skipped: true };
  }

  const embedURL = `https://www.instagram.com/reel/${id}/embed/captioned/`;
  const html = await fetch(embedURL, { headers: { 'User-Agent': UA } }).then((r) => r.text());

  const imgURL = await findPosterURL(html);
  if (!imgURL) {
    console.warn(`  ✗ ${id}: no poster URL found in embed HTML`);
    return { id, error: 'no-url' };
  }

  const res = await fetch(imgURL, {
    headers: { 'User-Agent': UA, 'Referer': 'https://www.instagram.com/' },
  });
  if (!res.ok) {
    console.warn(`  ✗ ${id}: download failed ${res.status}`);
    return { id, error: 'download' };
  }

  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  console.log(`  ✓ ${id}.jpg  (${(buf.length / 1024).toFixed(1)} KB)`);
  return { id, bytes: buf.length };
}

async function main() {
  console.log('▸ Instagram reel poster fetcher');

  await fs.mkdir(OUT_DIR, { recursive: true });
  const ids = await readReelIds();
  console.log(`  found ${ids.length} reel IDs in src/lib/events.ts`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;
  for (const id of ids) {
    try {
      const r = await fetchReelPoster(id);
      if (r.error) failed += 1;
      else if (r.skipped) skipped += 1;
      else ok += 1;
    } catch (e) {
      console.warn(`  ✗ ${id}: ${e.message}`);
      failed += 1;
    }
  }

  console.log('');
  console.log(`▸ Done. downloaded=${ok}  cached=${skipped}  failed=${failed}`);
  if (failed > 0) {
    console.log(
      '  (Failed reels will fall back to the gradient facade — re-run later or drop ' +
      'a manual poster image into _originals/events/<reel-id>.jpg.)',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
