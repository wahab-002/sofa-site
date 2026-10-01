import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.resolve("photos");
const outRoot = path.resolve("public/products");

/** Map drop-folder name -> public slug folder */
const map = {
  "atalian chesterfield": "atalian",
  "bishope ushape": "bishop",
  borrius: "borrius",
  Falcon: "falcon",
  Lily: "lily",
  "Olympia Chesterfield": "olympia",
  // existing collections — only import if public folder missing extras; skip overwrite of curated webp
};

async function convertFolder(srcName, destName) {
  const srcDir = path.join(root, srcName);
  const destDir = path.join(outRoot, destName);
  if (!fs.existsSync(srcDir)) {
    console.warn("skip missing", srcName);
    return [];
  }
  fs.mkdirSync(destDir, { recursive: true });

  const files = fs
    .readdirSync(srcDir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const written = [];
  let i = 1;
  for (const file of files) {
    const name = `photo-${String(i).padStart(2, "0")}.webp`;
    const out = path.join(destDir, name);
    await sharp(path.join(srcDir, file))
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    written.push(name.replace(/\.webp$/, ""));
    console.log(`${srcName} -> ${destName}/${name}`);
    i += 1;
  }
  return written;
}

const results = {};
for (const [src, dest] of Object.entries(map)) {
  results[dest] = await convertFolder(src, dest);
}
console.log(JSON.stringify(results, null, 2));
