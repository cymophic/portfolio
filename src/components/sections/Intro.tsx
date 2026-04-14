import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/sections/common/SocialLinks";
import ProfileImage from "@/components/sections/common/ProfileImage";

export default function Intro() {
  return (
    <section className="w-full">
      <div className="flex flex-col mx-auto max-w-4xl mt-24 px-6 sm:flex-row sm:justify-between sm:gap-12 sm:items-center sm:px-10">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Text Content */}
          <div className="flex flex-row justify-between gap-x-8">
            <div>
              <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                {`Hi! I am`}
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-zinc-700 dark:text-zinc-50">
                {profileInfo.name}
              </h1>
            </div>
            {/* Profile Image - Small Screens */}
            <div className="shrink-0 sm:hidden -ml-1">
              <ProfileImage width={64} height={64} />
            </div>
          </div>
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

