"use client";

import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/sections/common/SocialLinks";
import ProfileImage from "@/components/sections/common/ProfileImage";
import TypingText from "@/components/ui/TypingText";

const CONFIG = {
  wordsInterval: 3700, // how long each greeting stays before swapping
  deletingSpeed: 20, // time it takes to delete the word
};

export default function Intro() {
  return (
    <section className="w-full">
      <div className="flex flex-col mx-auto max-w-4xl mt-24 px-6 sm:flex-row sm:justify-between sm:gap-12 sm:items-center sm:px-10">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-row justify-between gap-x-8">
            <div>
              {/* Name */}
              <h1>
                <TypingText
                  words={["Luis Abhram"]}
                  className="font-mono text-5xl font-semibold leading-tight tracking-wide text-zinc-700 dark:text-zinc-50"
                  config={{
                    pauseMs: CONFIG.wordsInterval,
                    deletingSpeedMs: CONFIG.deletingSpeed,
                  }}
                />
              </h1>
            </div>

            {/* Profile Image - Small Screens */}
            <div className="shrink-0 sm:hidden -ml-1">
              <ProfileImage width={64} height={64} />
            </div>
          </div>

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
          <ProfileImage width={180} height={180} />
        </div>
      </div>
    </section>
  );
}