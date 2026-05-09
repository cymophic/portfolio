"use client";

import { IconHeart } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

import { profileInfo } from "@/lib/site";
import Metadata from "./Metadata";
import ProfileImage from "@/components/ui/ProfileImage";
import SocialLinks from "@/components/ui/SocialLinks";
import Tooltip from "@/components/ui/Tooltip";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center text-center pt-10 pb-18 gap-6">
      {/* Line */}
      <div className="w-px h-16 bg-zinc-300 dark:bg-zinc-700" />

      {/* Byline */}
      <div className="my-1">
        <p className="font-mono text-xs tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-500">
          Made with{" "}
          <IconHeart
            className="inline overflow-clip -mt-1"
            size={14}
            style={{ strokeWidth: 3 }}
          />{" "}
          by {profileInfo.name}
        </p>
      </div>

      {/* Profile Image */}
      <FooterLogo />

      {/* Social Links */}
      <SocialLinks iconSize={18} hoverEffect="monochrome" />

      {/* Metadata */}
      <Metadata />

      {/* Copyright */}
      <Copyright />
    </footer>
  );
}

// Footer Website Icon
function FooterLogo() {
  const pathname = usePathname();
  const router = useRouter();

  function handleImageClick() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  return (
    <Tooltip content={pathname === "/" ? "Jump to Top" : "Return to Home"}>
      <button
        onClick={handleImageClick}
        aria-label={pathname === "/" ? "Jump to Top" : "Return to Home"}
      >
        <ProfileImage
          width={48}
          height={48}
          className="hover:scale-112 transition-transform"
        />
      </button>
    </Tooltip>
  );
}

// Copyright
function Copyright() {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-xs text-zinc-400 dark:text-zinc-500">
      © {currentYear > startYear ? `${startYear} - ${currentYear}` : startYear}.
      All rights reserved.
    </p>
  );
}
