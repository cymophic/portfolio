import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import { TimelineItem } from "@/components/sections/common/Timeline";

export default function Career() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Career" />

        <div className="flex flex-col">
          {profileInfo.career.map((work, i) => (
            <TimelineItem key={i}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
                {/* Left: Work info */}
                <div className="flex sm:gap-4.5 md:gap-3 items-start">
                  <a href={work.website} target="_blank" rel="noopener noreferrer" className="hidden sm:block shrink-0">
                    {work.logo && (
                      <Image src={work.logo} alt={work.company} width={64} height={64} className="rounded-lg object-cover mt-0.5 p-1 -ml-1 border border-zinc-300 dark:border-zinc-600" />
                    )}
                  </a>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-zinc-700 dark:text-zinc-100 whitespace-nowrap">{work.role}</span>
                      {work.type && (
                        <span className="items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600 whitespace-nowrap dark:border-zinc-700 dark:text-zinc-300">{work.type}</span>
                      )}
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      <a href={work.website} target="_blank" rel="noopener noreferrer" className={work.website ? "underline sm:no-underline sm:hover:underline" : ""}>
                        {work.company}
                        {work.website && (
                          <MdArrowOutward size={18} className="sm:hidden inline ml-1 mb-0.5 overflow-clip" />
                        )}
                      </a>
                    </span>
                    <span className="text-sm text-zinc-500">{work.start} - {work.end}</span>
                  </div>
                </div>

                {/* Right: Details */}
                {(work.about || work.scope) && (
                  <div className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {work.about && (
                      <>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">About</span>
                        <span>{work.about}</span>
                      </>
                    )}
                    {work.scope && (
                      <>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">Scope</span>
                        <span>{work.scope}</span>
                      </>
                    )}
                  </div>
                )}

              </div>
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}