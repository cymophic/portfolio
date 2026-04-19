"use client";

import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import { Icon } from "@tabler/icons-react";
import { profileInfo } from "@/lib/site";

const iconMap: Record<string, Icon> = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  Instagram: IconBrandInstagram,
};

const colorMap: Record<string, { light: string; dark: string }> = {
  GitHub:    { light: "#333333", dark: "#ffffff"  },
  LinkedIn:  { light: "#0A66C2", dark: "#0A66C2"  },
  Instagram: { light: "#E1306C", dark: "#E1306C"  },
};

type SocialLinksProps = {
  exclude?: string[];
  iconsRef?: React.RefObject<(HTMLAnchorElement | null)[]>;
  opacity?: number;
  iconSize?: number;
  hoverEffect?: "monochrome" | "colored";
};

export default function SocialLinks({ exclude = [], iconsRef, opacity = 100, iconSize = 20, hoverEffect = "colored" }: SocialLinksProps) {
  const filtered = profileInfo.socialLinks.filter(({ label }) => !exclude.includes(label));
  return (
    <div className="flex items-center gap-4" style={{ opacity: opacity / 100 }}>
      {filtered.map(({ label, link }, i) => {
        const color = colorMap[label];
        const Icon = iconMap[label];
        const brandStyles = hoverEffect === "colored" ? {
          ["--brand-light" as string]: color.light,
          ["--brand-dark" as string]: color.dark,
        } : {};
        return (
          <Link
            key={label}
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
              ${hoverEffect === "colored" 
                ? "text-zinc-400 hover:text-(--brand-light) dark:hover:text-(--brand-dark)" 
                : "text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-300"}
            `}
          >
            <Icon size={iconSize} />
          </Link>
        );
      })}
    </div>
  );
}