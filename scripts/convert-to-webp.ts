import sharp from "sharp";
import { readdirSync, statSync, mkdirSync } from "fs";
import { join, extname, basename, dirname, relative } from "path";

// Source directories to convert
const CONVERT_DIRS = ["src/assets/projects", "src/assets/logos"];

// Output directories for each source
const OUTPUT_MAP: Record<string, string> = {
  "src/assets/projects": "public/projects",
  "src/assets/logos": "public/logos",
};

// Size map for each directory
const SIZE_MAP: Record<string, { width: number; height: number }> = {
  "src/assets/logos": { width: 128, height: 128 },
  "src/assets/projects": { width: 800, height: 450 },
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
    const outDir = OUTPUT_MAP[dir];

    for (const file of walkDir(dir)) {
      // Skip non-png
      if (extname(file) !== ".png") continue;

      // Skip ignored files
      if (SKIP.includes(basename(file))) continue;

      // Output path
      const relativePath = relative(dir, file);
      const output = join(outDir, relativePath).replace(/\.png$/, ".webp");

      // Ensure output directory exists
      mkdirSync(dirname(output), { recursive: true });

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
