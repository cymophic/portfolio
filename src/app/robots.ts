import { websiteURL } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/"],
    },
    sitemap: `${websiteURL}/sitemap.xml`,
  };
}
