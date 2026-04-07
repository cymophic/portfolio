import Image from "next/image";

import SocialLinks from "@/components/ui/SocialLinks";
import { navLinks, profileInfo } from "@/lib/site";

export default function Hero() {
  const home = navLinks.find((link) => link.href === "/");

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col md:flex-row md:items-center md:justify-between md:gap-12 px-6 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-col gap-4 md:gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 mb-2 md:mb-0">
            {home!.label}
          </p>
          <div className="shrink-0 md:hidden -ml-1">
            <Image
              src={profileInfo.image}
              alt="Profile picture"
              width={160}
              height={160}
              priority
              className="rounded-full object-cover w-16 h-16"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-700 dark:text-zinc-50">
            {profileInfo.name}
          </h1>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {profileInfo.bio}
          </p>
          <div className="mt-2">
            <SocialLinks />
          </div>
        </div>

        <div className="shrink-0 hidden md:block">
          <Image
            src={profileInfo.image}
            alt="Profile picture"
            width={160}
            height={160}
            priority
            className="rounded-full object-cover sm:w-40 sm:h-40"
          />
        </div>
      </div>
    </section>
  );
}

