import { writeFileSync, mkdirSync } from "fs";
import { socialLinks } from "../src/lib/site";

async function main() {
  const github = socialLinks.find((s) => s.label === "GitHub")!;
  const res = await fetch(`${github.link}.png`);
  const buffer = await res.arrayBuffer();
  mkdirSync("public", { recursive: true });
  writeFileSync("src/app/icon.png", Buffer.from(buffer));
  writeFileSync("public/avatar.png", Buffer.from(buffer));
  console.log("✔ favicon fetched");
}

main();