import { writeFileSync } from "fs";
import { profileInfo } from "../src/lib/site";

async function main() {
  const res = await fetch(profileInfo.image);
  const buffer = await res.arrayBuffer();
  writeFileSync("src/app/icon.png", Buffer.from(buffer));
  console.log("✔ favicon fetched");
}

main();