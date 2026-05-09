import { writeFileSync, mkdirSync } from "fs";
import { profileInfo } from "../src/lib/site";

async function main() {
  const github = profileInfo.socials.find((s) => s.label === "GitHub")!;
  const res = await fetch(`${github.link}.png`);
  const buffer = await res.arrayBuffer();
  mkdirSync("public", { recursive: true });
  writeFileSync("src/app/icon.png", Buffer.from(buffer));
  writeFileSync("public/avatar.png", Buffer.from(buffer));
  console.log("\x1b[32m✓\x1b[0m favicon fetched");
}

main();
