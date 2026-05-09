import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

// Directories to convert
const CONVERT_DIRS = ["public/projects", "public/logos"];

// Files to skip
const SKIP = ["avatar.png"];

// Recursively yields all file paths in a directory
function* walkDir(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walkDir(full);
    else yield full;
  }
}

// Convert all PNGs in each target directory to WebP
async function main() {
  for (const dir of CONVERT_DIRS) {
    for (const file of walkDir(dir)) {
      // Skip non-PNG files and explicitly excluded filenames
      if (extname(file) !== ".png") continue;
      if (SKIP.includes(basename(file))) continue;

      const output = file.replace(".png", ".webp");
      await sharp(file).webp({ quality: 85 }).toFile(output);
      console.log(`✓ converted ${file}`);
    }
  }
}

main();
