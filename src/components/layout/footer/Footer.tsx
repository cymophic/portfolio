"use client";

import ProfileImage from "@/components/ui/ProfileImage";
import { profileInfo } from "@/lib/site";
import { FiHeart } from "react-icons/fi";
import SocialLinks from "../../ui/SocialLinks";
import Tooltip from "@/components/ui/Tooltip";

export default function Footer() {
  const metaItem = "font-mono text-xs tracking-tight text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-default";

  return (
    <footer className="flex flex-col items-center text-center gap-6">
      {/* Line */}
      <div className="w-px h-16 bg-zinc-300 dark:bg-zinc-700"/>

      {/* Byline */}
      <p className="font-mono text-xs tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-500">
        Made with <FiHeart className="inline overflow-clip -mt-1" style={{ strokeWidth: 3 }} /> by {profileInfo.name}
      </p>

      {/* Footer Image */}
      <Tooltip content="Back to top">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ProfileImage width={48} height={48} className="hover:scale-112 transition-transform"/>
        </button>
      </Tooltip>

      {/* Social Links */}
      <SocialLinks opacity={50} iconSize={16} hoverEffect="monochrome" />
      
      {/* Metadata */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="hidden sm:flex items-center">
          <Tooltip content="Your Visit Count"><span className={metaItem}>1st visit</span></Tooltip>
          <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
          <Tooltip content="Your Device OS"><span className={metaItem}>android</span></Tooltip>
          <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
          <Tooltip content="Your Session Time"><span className={metaItem}>00:00</span></Tooltip>
          <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
          <Tooltip content="Commit"><span className={metaItem}>commit a1b2c3</span></Tooltip>
          <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
          <Tooltip content="Last Updated"><span className={metaItem}>jan 2026</span></Tooltip>
        </div>

        <div className="flex sm:hidden flex-col items-center gap-1.5">
          <div className="flex items-center">
            <Tooltip content="Your Visit Count"><span className={metaItem}>1st visit</span></Tooltip>
            <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
            <Tooltip content="Your Session Time"><span className={metaItem}>00:00</span></Tooltip>
            <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
            <Tooltip content="Your Device OS"><span className={metaItem}>android</span></Tooltip>
          </div>
          <div className="flex items-center">
            <Tooltip content="Commit"><span className={metaItem}>commit a1b2c3</span></Tooltip>
            <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">|</span>
            <Tooltip content="Last Updated"><span className={metaItem}>jan 2026</span></Tooltip>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        © 2026{new Date().getFullYear() !== 2026 ? ` - ${new Date().getFullYear()}` : ""} {profileInfo.name}
      </p>
    </footer>
  );
}