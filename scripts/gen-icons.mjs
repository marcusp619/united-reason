import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

/* The UR mark in a 64x64 design space — identical geometry to app/icon.svg. */
const RECTS = [
  [7, 14, 6, 36],
  [19, 14, 6, 36],
  [7, 44, 18, 6],
  [31, 14, 6, 36],
  [31, 14, 18, 6],
  [43, 14, 6, 18],
  [31, 26, 18, 6],
];
const POLY = [
  [39, 32],
  [45, 32],
  [55, 50],
  [48, 50],
];
const BG = [0xec, 0x30, 0x13];
const FG = [0xf3, 0xf2, 0xf2];

function inPoly(x, y, vs) {
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const [xi, yi] = vs[i];
    const [xj, yj] = vs[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function covers(x, y) {
  for (const [rx, ry, rw, rh] of RECTS) {
    if (x >= rx && x < rx + rw && y >= ry && y < ry + rh) return true;
  }
  return inPoly(x, y, POLY);
}

/** Renders RGBA pixels at `size`, supersampling 4x4 so the R's leg isn't jagged. */
function render(size) {
  const SS = 4;
  const px = Buffer.alloc(size * size * 4);
  for (let py = 0; py < size; py++) {
    for (let pxx = 0; pxx < size; pxx++) {
      let hits = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const dx = ((pxx + (sx + 0.5) / SS) / size) * 64;
          const dy = ((py + (sy + 0.5) / SS) / size) * 64;
          if (covers(dx, dy)) hits++;
        }
      }
      const a = hits / (SS * SS);
      const o = (py * size + pxx) * 4;
      for (let c = 0; c < 3; c++) px[o + c] = Math.round(BG[c] * (1 - a) + FG[c] * a);
      px[o + 3] = 255;
    }
  }
  return px;
}

const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (const b of buf) c = t[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(CRC(body));
  return Buffer.concat([len, body, crc]);
}

function png(size) {
  const px = render(size);
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** ICO wrapping a PNG payload (supported since Vista / all modern browsers). */
function ico(sizes) {
  const images = sizes.map((s) => ({ s, data: png(s) }));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const dir = [];
  for (const { s, data } of images) {
    const e = Buffer.alloc(16);
    e[0] = s >= 256 ? 0 : s;
    e[1] = s >= 256 ? 0 : s;
    e[4] = 1;
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...dir, ...images.map((i) => i.data)]);
}

const out = process.argv[2];
writeFileSync(`${out}/apple-icon.png`, png(180));
writeFileSync(`${out}/favicon.ico`, ico([16, 32, 48]));
console.log("apple-icon.png", png(180).length, "bytes");
console.log("favicon.ico   ", ico([16, 32, 48]).length, "bytes");

/* ── Open Graph poster ────────────────────────────────────────────────────
   1200x630 accent field with the UR mark set left, matching the closing
   poster blocks on the site. Text is deliberately absent: rendering type
   here would need font data, and a wrong typeface reads worse than none. */
function ogPoster() {
  const W = 1200;
  const H = 630;
  const px = Buffer.alloc(W * H * 4);
  const SS = 3;
  const markSize = 360;
  const originX = (W - markSize) / 2;
  const originY = (H - markSize) / 2;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let hits = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const dx = ((x + (sx + 0.5) / SS - originX) / markSize) * 64;
          const dy = ((y + (sy + 0.5) / SS - originY) / markSize) * 64;
          if (dx >= 0 && dx < 64 && dy >= 0 && dy < 64 && covers(dx, dy)) hits++;
        }
      }
      const a = hits / (SS * SS);
      const o = (y * W + x) * 4;
      for (let c = 0; c < 3; c++) px[o + c] = Math.round(BG[c] * (1 - a) + FG[c] * a);
      px[o + 3] = 255;
    }
  }

  const raw = Buffer.alloc(H * (W * 4 + 1));
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    px.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

writeFileSync(`${out}/opengraph-image.png`, ogPoster());
console.log("opengraph-image.png", ogPoster().length, "bytes");
