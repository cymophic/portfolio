"use client";

import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandSpotify,
} from "@tabler/icons-react";
import { Icon } from "@tabler/icons-react";
import { profileInfo } from "@/lib/site";
import Tooltip from "@/components/ui/Tooltip";

const socialConfig: Record<
  string,
  { icon: Icon; light: string; dark: string }
> = {
  GitHub: { icon: IconBrandGithub, light: "#333333", dark: "#ffffff" },
  GitLab: { icon: IconBrandGitlab, light: "#FC6D26", dark: "#FC6D26" },
  LinkedIn: { icon: IconBrandLinkedin, light: "#0A66C2", dark: "#0A66C2" },
  Instagram: { icon: IconBrandInstagram, light: "#E1306C", dark: "#E1306C" },
  Spotify: { icon: IconBrandSpotify, light: "#1DB954", dark: "#1DB954" },
};

type SocialLinksProps = {
  exclude?: string[];
  iconsRef?: React.RefObject<(HTMLAnchorElement | null)[]>;
  opacity?: number;
  iconSize?: number;
  hoverEffect?: "monochrome" | "colored";
};

export default function SocialLinks({
  exclude = [],
  iconsRef,
  opacity = 100,
  iconSize = 20,
  hoverEffect = "colored",
}: SocialLinksProps) {
  return (
    <div className="flex items-center gap-4" style={{ opacity: opacity / 100 }}>
      {profileInfo.socials
        .filter(({ label }) => !exclude.includes(label))
        .map(({ label, link }, i) => {
          const { icon: Icon, ...color } = socialConfig[label];
          const brandStyles =
            hoverEffect === "colored"
              ? {
                  ["--brand-light" as string]: color.light,
                  ["--brand-dark" as string]: color.dark,
                }
              : {};
          return (
            <Tooltip key={label} content={label}>
              <Link
                href={link}
                ref={(el) => {
                  if (iconsRef) iconsRef.current[i] = el;
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={brandStyles}
                className={`
                  transition-colors duration-200
                  ${
                    hoverEffect === "colored"
                      ? "text-zinc-400 hover:text-(--brand-light) dark:hover:text-(--brand-dark)"
                      : "text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-300"
                  }
                `}
              >
                <Icon size={iconSize} stroke={1.7} />
              </Link>
            </Tooltip>
          );
        })}
    </div>
  );
}
