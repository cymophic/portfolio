"use client";

import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/sections/common/SocialLinks";
import ProfileImage from "@/components/sections/common/ProfileImage";
import AnimateText from "@/components/ui/AnimatedText";

const CONFIG = {
  wordsInterval: 3700, // how long each greeting stays before swapping
  deletingSpeed: 20, // time it takes to delete the word
};

export default function Intro() {
  return (
    <section className="w-full">
      <div className="flex flex-col mx-auto max-w-4xl mt-24 px-6 sm:flex-row sm:justify-between sm:gap-12 sm:items-center sm:px-10">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Profile Image - Small Screens */}
          <div className="shrink-0 sm:hidden ">
            <ProfileImage width={64} height={64} />
          </div>

          {/* Name */}
          <h1>
            <AnimateText
              words={["Luis Abhram"]}
              className="font-mono text-3xl sm:text-5xl font-semibold leading-tight tracking-wide text-zinc-700 dark:text-zinc-50"
              variant="scramble"
              cursor="underscore"
              config={{
                pauseMs: CONFIG.wordsInterval,
                deletingSpeedMs: CONFIG.deletingSpeed,
              }}
            />
          </h1>

          {/* Bio */}
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {profileInfo.bio}
          </p>

          {/* Social Links */}
          <div className="mt-2">
            <SocialLinks />
          </div>
        </div>

        {/* Profile Image - Large Screens */}
        <div className="shrink-0 hidden sm:block">
          <ProfileImage width={160} height={160} />
        </div>
      </div>
    </section>
  );
}