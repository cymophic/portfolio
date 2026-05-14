import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

// Directories to convert
const CONVERT_DIRS = ["public/projects", "public/logos"];

// Size map for each directory
const SIZE_MAP: Record<string, { width: number; height: number }> = {
  "public/logos": { width: 128, height: 128 },
  "public/projects": { width: 800, height: 450 },
};

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
    const size = SIZE_MAP[dir];
    for (const file of walkDir(dir)) {
      if (extname(file) !== ".png") continue;
      if (SKIP.includes(basename(file))) continue;

      const output = file.replace(".png", ".webp");
      await sharp(file)
        .resize(size.width, size.height, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toFile(output);
      console.log(`\x1b[32m✓\x1b[0m converted \x1b[36m${file}\x1b[0m to webp`);
    }
  }
}

main();
