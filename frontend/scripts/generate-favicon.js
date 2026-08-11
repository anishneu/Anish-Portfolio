/**
 * Build favicon assets from src/images/portfolio_logo.png
 * — removes light background, recolors logo to brand primary (#f5b800)
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(__dirname, '../src/images');
const SOURCE = path.join(IMAGES_DIR, 'portfolio_logo.png');

/** Light-mode primary (bright yellow) — Volt Triad + brown variant */
const PRIMARY = { r: 245, g: 184, b: 0 };
const BG_THRESHOLD = 235;

function isBackgroundPixel(r, g, b) {
  if (r >= BG_THRESHOLD && g >= BG_THRESHOLD && b >= BG_THRESHOLD) return true;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return lum > 175 && chroma < 48;
}

function processLogoPixels(data, width, height) {
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (isBackgroundPixel(r, g, b)) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
        continue;
      }

      const ink = Math.min(255, Math.round((255 - lum) * 1.2));
      if (ink <= 8) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
        continue;
      }

      data[i] = PRIMARY.r;
      data[i + 1] = PRIMARY.g;
      data[i + 2] = PRIMARY.b;
      data[i + 3] = ink;
    }
  }
}

async function buildRaster(size) {
  const { data, info } = await sharp(SOURCE)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  processLogoPixels(pixels, info.width, info.height);

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

async function writePng(pipeline, filePath) {
  const tmp = `${filePath}.tmp`;
  await pipeline.toFile(tmp);
  fs.renameSync(tmp, filePath);
  return filePath;
}

async function buildNavbarLogo(targetHeight) {
  const meta = await sharp(SOURCE).metadata();
  const aspect = (meta.width || 1) / (meta.height || 1);
  const width = Math.max(1, Math.round(targetHeight * aspect));

  const { data, info } = await sharp(SOURCE)
    .resize(width, targetHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  processLogoPixels(pixels, info.width, info.height);
  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

async function writeSvgFromPng(pngPath) {
  const b64 = fs.readFileSync(pngPath).toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Anish Kuila">
  <image width="512" height="512" href="data:image/png;base64,${b64}" />
</svg>`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), svg, 'utf8');
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Missing logo source: ${SOURCE}`);
  }

  const favicon32 = await buildRaster(32);
  const favicon192 = await buildRaster(192);
  const favicon512 = await buildRaster(512);

  const navbarLogo = await buildNavbarLogo(72);

  await writePng(favicon32, path.join(PUBLIC_DIR, 'favicon.png'));
  await writePng(favicon192, path.join(PUBLIC_DIR, 'logo192.png'));
  await writePng(favicon512, path.join(PUBLIC_DIR, 'logo512.png'));
  await writePng(navbarLogo, path.join(IMAGES_DIR, 'logo-brand.png'));

  const png512Path = path.join(PUBLIC_DIR, 'logo512.png');
  await writeSvgFromPng(png512Path);

  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  await favicon32.toFile(`${icoPath}.tmp`);
  fs.renameSync(`${icoPath}.tmp`, icoPath);

  console.log('Logo assets generated:', {
    primary: '#f5b800',
    files: [
      'public/favicon.png',
      'public/favicon.ico',
      'public/favicon.svg',
      'public/logo192.png',
      'public/logo512.png',
      'src/images/logo-brand.png',
    ],
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
