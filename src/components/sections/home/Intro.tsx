import { IconQuoteOpen, IconBriefcase, IconMapPin } from "@tabler/icons-react";

import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/ui/SocialLinks";
import ProfileImage from "@/components/ui/ProfileImage";
import { ScheduleButton } from "@/components/ui/ScheduleButton";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

export default function Intro() {
  return (
    <section className="w-full">
      <div className="flex flex-col justify-center mx-auto px-6 gap-6 items-center sm:px-10">
        {/* Profile Image - Small Screens */}
        <div className="shrink-0">
          <ProfileImage width={64} height={64} />
        </div>
        {/* Name */}
        <h1 className="whitespace-nowrap -mb-2">
          <span className="font-mono text-4xl font-semibold leading-tight tracking-wide text-zinc-700 dark:text-zinc-200">
            {profileInfo.name}
          </span>
        </h1>
        {/* Subline */}
        {profileInfo.title && <Title />}
        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 w-full sm:w-fit sm:flex-row">
          <div className="w-full max-w-94 sm:w-fit">
            <ScheduleButton />
          </div>
          <div className="w-full max-w-94 sm:w-fit">
            <CopyEmailButton />
          </div>
        </div>
        {/* Social Links */}
        <div className="mt-1">
          <SocialLinks iconSize={24} />
        </div>
      </div>
    </section>
  );
}

// Tagline
export function Tagline() {
  return (
    <div className="flex justify-center">
      <p className="italic text-base text-center  text-zinc-600 dark:text-zinc-400 pl-4 sm:pl-0">
        <IconQuoteOpen size={14} className="inline -ml-5.75 mr-2 align-top" />
        {profileInfo.tagline}
      </p>
    </div>
  );
}

// Title
export function Title() {
  return (
    <p className="text-center text-zinc-600 dark:text-zinc-400 flex items-center">
      <IconBriefcase size={18} className="inline mr-1.5 shrink-0" />
      {profileInfo.title}
    </p>
  );
}

// Location
export function Location() {
  return (
    <p className="text-center text-zinc-600 dark:text-zinc-400 flex items-center">
      <IconMapPin size={18} className="inline mr-1.5 shrink-0" />
      {profileInfo.location}
    </p>
  );
}
