"use client";

import ProfileImage from "@/components/sections/common/ProfileImage";
import { profileInfo } from "@/lib/site";
import { FiHeart } from "react-icons/fi";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center text-center gap-8">
      {/* Line */}
      <div className="w-px h-16 bg-zinc-300 dark:bg-zinc-700"/>

      {/* Footer Image */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ProfileImage width={64} height={64} />
      </button>

      {/* Social Links */}
      <SocialLinks opacity={50} iconSize={16} />

      {/* Made w/ Love */}
      <p className="font-mono text-xs tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-500">
        Made with <FiHeart className="inline" style={{ strokeWidth: 3 }} /> by {profileInfo.name}
      </p>
      
      {/* Copyright */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        © 2026{new Date().getFullYear() !== 2026 ? ` - ${new Date().getFullYear()}` : ""}. All rights reserved.
      </p>
    </footer>
  );
}