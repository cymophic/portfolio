import Image from "next/image";

import SocialLinks from "@/components/ui/SocialLinks";
import { navLinks, profileInfo } from "@/lib/site";

export default function Hero() {
  const home = navLinks.find((link) => link.href === "/");

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-row items-center justify-between px-6 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {home!.label}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-700 dark:text-zinc-50">
            {profileInfo.name}
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {profileInfo.bio}
          </p>

          <div className="mt-2">
            <SocialLinks />
          </div>
        </div>

        <div className="shrink-0">
          <Image
            src={profileInfo.image}
            alt="Profile picture"
            width={160}
            height={160}
            priority
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

