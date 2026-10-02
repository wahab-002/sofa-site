import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcRoot = path.resolve("photos/Atalian chesterfield");
const destRoot = path.resolve("public/products/atalian");

const folderToSlug = {
  "1 seater": "armchair",
  "2 seater": "2-seater",
  "3 seater": "3-seater",
  "3+2": "3-2-set",
  Corner: "corner",
  Fullset: "full-set",
};

const colours = ["black", "brown", "burgundy", "cream", "green", "grey", "navy", "pink"];

async function run() {
  // Clear old flat photo-*.webp files from earlier import
  if (fs.existsSync(destRoot)) {
    for (const f of fs.readdirSync(destRoot)) {
      const p = path.join(destRoot, f);
      if (fs.statSync(p).isFile() && /^photo-\d+\.webp$/i.test(f)) fs.unlinkSync(p);
    }
  }

  for (const [folder, slug] of Object.entries(folderToSlug)) {
    const srcDir = path.join(srcRoot, folder);
    const destDir = path.join(destRoot, slug);
    fs.mkdirSync(destDir, { recursive: true });

    for (const colour of colours) {
      const src = path.join(srcDir, `${colour}.jpg`);
      if (!fs.existsSync(src)) {
        console.warn("missing", src);
        continue;
      }
      const out = path.join(destDir, `${colour}.webp`);
      await sharp(src)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 84 })
        .toFile(out);
      console.log(`${folder}/${colour}.jpg -> atalian/${slug}/${colour}.webp`);
    }
  }
}

await run();
