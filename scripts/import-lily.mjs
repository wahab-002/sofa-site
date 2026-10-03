/**
 * Import Lily photos → public/products/lily/{config}/{colour}.webp
 *
 * Source: photos/Lily/{arm chair|2 seater|...}/{beige|black|blue}.{jpeg|webp}
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcRoot = path.resolve("photos/Lily");
const destRoot = path.resolve("public/products/lily");

const folderToSlug = {
  "arm chair": "armchair",
  "2 seater": "2-seater",
  "3 seater": "3-seater",
  "3+2": "3-2-set",
  fullset: "full-set",
  corner: "corner",
};

const colours = ["beige", "black", "blue"];

function findColourSource(dir, colour) {
  for (const ext of [".jpeg", ".jpg", ".webp", ".png"]) {
    const p = path.join(dir, `${colour}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  if (!fs.existsSync(dir)) return null;
  const hit = fs.readdirSync(dir).find((f) => f.toLowerCase().startsWith(colour.toLowerCase() + "."));
  return hit ? path.join(dir, hit) : null;
}

async function run() {
  // Remove legacy flat photo-*.webp files
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
      const src = findColourSource(srcDir, colour);
      if (!src) {
        console.warn("missing", path.join(folder, colour));
        missing++;
        continue;
      }
      const out = path.join(destDir, `${colour}.webp`);
      await sharp(src)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(out);
      imported++;
      console.log(`✓ ${folder}/${path.basename(src)} → lily/${slug}/${colour}.webp`);
    }
  }

  console.log(`\nDone: ${imported} imported, ${missing} missing`);
}

await run();
