/**
 * Import Dino photos → public/products/dino/{config}/{colour}.webp
 *
 * Source: photos/dino/{arm chair|2 seater|...}/…
 * Colours normalised to beige-brown | grey-black
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcRoot = path.resolve("photos/dino");
const destRoot = path.resolve("public/products/dino");

const folderToSlug = {
  "arm chair": "armchair",
  "2 seater": "2-seater",
  "3 seater": "3-seater",
  "3+2": "3-2-set",
  "full set": "full-set",
  corner: "corner",
};

const colours = [
  {
    file: "beige-brown",
    match: (name) => {
      const n = name.toLowerCase();
      return n.includes("beige") || n.includes("brown") || n.includes("corduroy");
    },
  },
  {
    file: "grey-black",
    match: (name) => {
      const n = name.toLowerCase();
      return n.includes("grey") || n.includes("gray") || n.includes("black") || n.includes("ribbed");
    },
  },
];

function findColourSource(dir, matcher) {
  if (!fs.existsSync(dir)) return null;
  const hit = fs.readdirSync(dir).find((f) => {
    const ext = path.extname(f).toLowerCase();
    if (![".jpeg", ".jpg", ".webp", ".png"].includes(ext)) return false;
    return matcher(f);
  });
  return hit ? path.join(dir, hit) : null;
}

async function run() {
  if (fs.existsSync(destRoot)) {
    for (const f of fs.readdirSync(destRoot)) {
      const p = path.join(destRoot, f);
      if (fs.statSync(p).isFile() && (f.endsWith(".webp") || f.endsWith(".jpg"))) {
        fs.unlinkSync(p);
      }
    }
  }

  let imported = 0;
  let missing = 0;

  for (const [folder, slug] of Object.entries(folderToSlug)) {
    const srcDir = path.join(srcRoot, folder);
    const destDir = path.join(destRoot, slug);
    fs.mkdirSync(destDir, { recursive: true });

    for (const colour of colours) {
      const src = findColourSource(srcDir, colour.match);
      if (!src) {
        console.warn("missing", path.join(folder, colour.file));
        missing++;
        continue;
      }
      const out = path.join(destDir, `${colour.file}.webp`);
      await sharp(src)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(out);
      imported++;
      console.log(`✓ ${folder}/${path.basename(src)} → dino/${slug}/${colour.file}.webp`);
    }
  }

  console.log(`\nDone: ${imported} imported, ${missing} missing`);
}

await run();
