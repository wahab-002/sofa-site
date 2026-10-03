/**
 * Build premium shop-by-design tile images with sofa-centred crops.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = path.resolve(
  "C:/Users/Owner/.cursor/projects/c-Users-Owner-Desktop-sofa-site/assets",
);
const OUT = path.resolve("public/shop/design");

const jobs = [
  {
    key: "corner_sofas",
    out: "corner.webp",
    // Live tile QA: 0.145 put join left of centre, 0.115 put it right → 0.13
    crop: { left: 0.13, top: 0.16, width: 0.78, height: 0.68 },
  },
  {
    key: "3_plus_2",
    out: "3-2-set.webp",
    crop: { left: 0.02, top: 0.08, width: 0.96, height: 0.8 },
  },
  {
    key: "chesterfield",
    out: "chesterfield.webp",
    // Keep full sofa in frame — previous crop clipped the left arm
    crop: { left: 0.0, top: 0.12, width: 0.88, height: 0.78 },
  },
  {
    key: "ushape",
    out: "u-shape.webp",
    crop: { left: 0.0, top: 0.06, width: 1, height: 0.86 },
  },
  {
    key: "fullset",
    out: "full-set.webp",
    crop: { left: 0.08, top: 0.16, width: 0.84, height: 0.72 },
  },
  {
    key: "modular",
    out: "modular.webp",
    crop: { left: 0.1, top: 0.2, width: 0.8, height: 0.64 },
  },
];

function findFile(key) {
  return fs.readdirSync(SRC).find((n) => n.includes(key));
}

async function grade(buffer, w, h) {
  const svg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="v" cx="48%" cy="42%" r="68%">
          <stop offset="0%" stop-color="#000" stop-opacity="0"/>
          <stop offset="70%" stop-color="#000" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#1C1B1A" stop-opacity="0.26"/>
        </radialGradient>
        <linearGradient id="warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FAF7F2" stop-opacity="0.08"/>
          <stop offset="55%" stop-color="#FAF7F2" stop-opacity="0"/>
          <stop offset="100%" stop-color="#2F3E33" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#v)"/>
      <rect width="100%" height="100%" fill="url(#warm)"/>
    </svg>
  `);

  return sharp(buffer)
    .modulate({ brightness: 1.03, saturation: 0.92 })
    .sharpen({ sigma: 0.55 })
    .composite([{ input: svg, blend: "over" }])
    .webp({ quality: 90 })
    .toBuffer();
}

async function run() {
  fs.mkdirSync(OUT, { recursive: true });
  const W = 1600;
  const H = 1200;

  for (const job of jobs) {
    const file = findFile(job.key);
    if (!file) {
      console.error("missing", job.key);
      continue;
    }
    const input = path.join(SRC, file);
    const meta = await sharp(input).rotate().metadata();
    const iw = meta.width;
    const ih = meta.height;
    const { left, top, width, height } = job.crop;
    const region = {
      left: Math.max(0, Math.round(iw * left)),
      top: Math.max(0, Math.round(ih * top)),
      width: Math.round(iw * width),
      height: Math.round(ih * height),
    };
    region.width = Math.min(region.width, iw - region.left);
    region.height = Math.min(region.height, ih - region.top);

    const cropped = await sharp(input)
      .rotate()
      .extract(region)
      .resize(W, H, { fit: "cover", position: "centre" })
      .toBuffer();

    const finished = await grade(cropped, W, H);
    fs.writeFileSync(path.join(OUT, job.out), finished);
    console.log("✓", job.out, region);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
