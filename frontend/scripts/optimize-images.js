/**
 * Profile image optimization — accepts my_photo.png or my_photo.jpg as source.
 * Outputs optimized webp, jpg, and png. Run: npm run optimize:images
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../src/images');
const BASENAME = 'my_photo';
const MAX_WIDTH = 640;

function findSourceImage() {
  for (const ext of ['.png', '.jpg', '.jpeg']) {
    const candidate = path.join(IMAGES_DIR, `${BASENAME}${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`No ${BASENAME}.png or ${BASENAME}.jpg found in src/images/`);
}

async function writeTo(pathOut, pipeline, options) {
  const tmp = `${pathOut}.tmp`;
  await pipeline.toFile(tmp);
  fs.renameSync(tmp, pathOut);
}

async function main() {
  const input = findSourceImage();
  const meta = await sharp(input).metadata();

  const base = sharp(input).rotate().resize({
    width: Math.min(meta.width || MAX_WIDTH, MAX_WIDTH),
    withoutEnlargement: true,
  });

  const outWebp = path.join(IMAGES_DIR, `${BASENAME}.webp`);
  const outJpg = path.join(IMAGES_DIR, `${BASENAME}.jpg`);
  const outPng = path.join(IMAGES_DIR, `${BASENAME}.png`);

  await writeTo(outWebp, base.clone().webp({ quality: 82, effort: 4 }));
  await writeTo(outJpg, base.clone().jpeg({ quality: 85, mozjpeg: true }));
  await writeTo(outPng, base.clone().png({ compressionLevel: 9 }));

  const sizes = {
    source: fs.statSync(input).size,
    webp: fs.statSync(outWebp).size,
    jpg: fs.statSync(outJpg).size,
    png: fs.statSync(outPng).size,
  };

  console.log(`Optimized from ${path.basename(input)}:`, sizes);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
