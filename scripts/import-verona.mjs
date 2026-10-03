/**
 * Import Verona photos → public/products/verona/{style}/{config}/{colour}.webp
 *
 * Source layout:
 *   photos/verona/{scatter back|high back}/{arm chair|2 seater|...}/{grey|black}.{jpeg|webp}
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcRoot = path.resolve("photos/verona");
const destRoot = path.resolve("public/products/verona");

const styleFolders = {
  "scatter back": "scatter-back",
  "high back": "high-back",
};

const configFolders = {
  "arm chair": "armchair",
  "2 seater": "2-seater",
  "3 seater": "3-seater",
  "3+2": "3-2-set",
  "full set": "full-set",
  Corner: "corner",
};

const colours = ["grey", "black"];

function findColourSource(dir, colour) {
  for (const ext of [".jpeg", ".jpg", ".webp", ".png"]) {
    const p = path.join(dir, `${colour}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  // Case-insensitive fallback
  if (!fs.existsSync(dir)) return null;
  const hit = fs.readdirSync(dir).find((f) => f.toLowerCase().startsWith(colour.toLowerCase() + "."));
  return hit ? path.join(dir, hit) : null;
}

async function run() {
  // Remove legacy flat webps so only the nested grid remains
  if (fs.existsSync(destRoot)) {
    for (const f of fs.readdirSync(destRoot)) {
      const p = path.join(destRoot, f);
      if (fs.statSync(p).isFile() && f.endsWith(".webp")) fs.unlinkSync(p);
    }
  }

  let imported = 0;
  let missing = 0;

  for (const [styleFolder, styleSlug] of Object.entries(styleFolders)) {
    for (const [configFolder, configSlug] of Object.entries(configFolders)) {
      const srcDir = path.join(srcRoot, styleFolder, configFolder);
      const destDir = path.join(destRoot, styleSlug, configSlug);
      fs.mkdirSync(destDir, { recursive: true });

      for (const colour of colours) {
        const src = findColourSource(srcDir, colour);
        if (!src) {
          console.warn("missing", path.join(styleFolder, configFolder, colour));
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
        console.log(`✓ ${styleFolder}/${configFolder}/${path.basename(src)} → verona/${styleSlug}/${configSlug}/${colour}.webp`);
      }
    }
  }

  console.log(`\nDone: ${imported} imported, ${missing} missing`);
}

await run();
