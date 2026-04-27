import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const SOURCE = join(PUBLIC, 'images', 'logo.svg');

const PADDING = 0.18;
const BG = '#fdf8f3';

const targets = [
  { name: 'favicon-16x16.png',          size: 16,  pad: 0.10 },
  { name: 'favicon-32x32.png',          size: 32,  pad: 0.10 },
  { name: 'favicon-48x48.png',          size: 48,  pad: 0.10 },
  { name: 'apple-touch-icon.png',       size: 180, pad: PADDING },
  { name: 'icon-192.png',               size: 192, pad: PADDING },
  { name: 'icon-512.png',               size: 512, pad: PADDING },
  { name: 'icon-maskable-512.png',      size: 512, pad: 0.25 },
];

const svgBuffer = await readFile(SOURCE);

for (const { name, size, pad } of targets) {
  const inner = Math.round(size * (1 - pad * 2));
  const offset = Math.round((size - inner) / 2);

  const logo = await sharp(svgBuffer, { density: 384 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, name));

  const { size: bytes } = await stat(join(PUBLIC, name));
  console.log(`▸ ${name.padEnd(28)} ${size}x${size}  ${bytes} bytes`);
}

const ico16 = await sharp(svgBuffer, { density: 256 })
  .resize(16, 16, { fit: 'contain', background: BG })
  .flatten({ background: BG })
  .png()
  .toBuffer();
const ico32 = await sharp(svgBuffer, { density: 256 })
  .resize(32, 32, { fit: 'contain', background: BG })
  .flatten({ background: BG })
  .png()
  .toBuffer();
const ico48 = await sharp(svgBuffer, { density: 384 })
  .resize(48, 48, { fit: 'contain', background: BG })
  .flatten({ background: BG })
  .png()
  .toBuffer();

const buildIco = (pngs) => {
  const count = pngs.length;
  const headerSize = 6;
  const entrySize = 16;
  const offset = headerSize + entrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  const images = [];
  let cursor = offset;

  for (const { png, size } of pngs) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(cursor, 12);
    entries.push(entry);
    images.push(png);
    cursor += png.length;
  }

  return Buffer.concat([header, ...entries, ...images]);
};

const ico = buildIco([
  { png: ico16, size: 16 },
  { png: ico32, size: 32 },
  { png: ico48, size: 48 },
]);

await writeFile(join(PUBLIC, 'favicon.ico'), ico);
const { size: icoBytes } = await stat(join(PUBLIC, 'favicon.ico'));
console.log(`▸ ${'favicon.ico'.padEnd(28)} 16+32+48  ${icoBytes} bytes`);

console.log('\n✓ Favicons generated.');
