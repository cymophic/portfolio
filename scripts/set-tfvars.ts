import { readFileSync } from "fs";
import { execSync } from "child_process";

const tfvars = readFileSync("terraform/terraform.tfvars");
const base64 = tfvars.toString("base64");

execSync("gh secret set TERRAFORM_TFVARS", {
  input: base64,
  stdio: ["pipe", "inherit", "inherit"],
});

console.log("TERRAFORM_TFVARS updated from terraform/terraform.tfvars");
