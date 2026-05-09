import { websiteURL, projects } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    { url: websiteURL, lastModified: new Date() },
    { url: `${websiteURL}/projects`, lastModified: new Date() },
    ...projects
      .filter((p) => p.page)
      .map((p) => ({
        url: `${websiteURL}/projects/${p.slug}`,
        lastModified: new Date(),
      })),
  ];
}
