import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/sections/common/SocialLinks";
import ProfileImage from "@/components/sections/common/ProfileImage";
import SectionTitle from "./common/SectionTitle";

export default function Intro() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col md:flex-row md:items-center md:justify-between md:gap-12 px-6 sm:px-10">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Title */}
          <SectionTitle title="About Me" />

          {/* Profile Image - Small Screens */}
          <div className="shrink-0 md:hidden -ml-1">
            <ProfileImage width={64} height={64} />
          </div>

          {/* Text Content */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-700 dark:text-zinc-50">
            {profileInfo.name}
          </h1>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {profileInfo.bio}
          </p>
          
          {/* Social Links */}
          <div className="mt-2">
            <SocialLinks />
          </div>
        </div>

        {/* Profile Image - Large Screens */}
        <div className="shrink-0 hidden md:block">
          <ProfileImage width={160} height={160} />
        </div>
      </div>
    </section>
  );
}

