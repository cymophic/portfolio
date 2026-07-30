import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";

import { profileInfo } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import { TimelineItem } from "@/components/ui/Timeline";

export default function Education() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Education" />

        <div className="flex flex-col">
          {profileInfo.education.filter((e) => e.visible !== false).map((edu, i) => {
            const { details } = edu;

            return (
              <TimelineItem key={i}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
                  {/* Left: School info */}
                  <div className="flex sm:gap-4.5 md:gap-3 items-center">
                    {edu.logo && (
                      <>
                        {edu.website ? (
                          <a
                            aria-label={`Visit ${edu.school} website`}
                            href={edu.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block shrink-0"
                          >
                            <Image
                              src={edu.logo}
                              alt={edu.school}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover mt-0.5 p-1 -ml-1 border border-zinc-300 dark:border-zinc-600"
                            />
                          </a>
                        ) : (
                          // Render just the image if no website exists
                          <div className="hidden sm:block shrink-0">
                            <Image
                              src={edu.logo}
                              alt={edu.school}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover mt-0.5 p-1 -ml-1 border border-zinc-300 dark:border-zinc-600"
                            />
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                        {edu.degree}
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {edu.website ? (
                          <a
                            href={edu.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline sm:hover:text-zinc-900 sm:dark:hover:text-zinc-100"
                          >
                            {edu.school}
                            <IconArrowUpRight
                              size={18}
                              className="inline mb-0.5 text-zinc-500"
                            />
                          </a>
                        ) : (
                          /* Render just the text if there is no website */
                          edu.school
                        )}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {edu.start} - {edu.end}
                      </span>
                    </div>
                  </div>

                  {/* Right: Details */}
                  {details && (
                    <div className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {details.honor && (
                        <>
                          <span className="font-medium text-zinc-400 dark:text-zinc-500">
                            Honors
                          </span>
                          <span>{details.honor.join(", ")}</span>
                        </>
                      )}
                      {details.awards && (
                        <>
                          <span className="font-medium text-zinc-400 dark:text-zinc-500">
                            Awards
                          </span>
                          <span>{details.awards.join(", ")}</span>
                        </>
                      )}
                      {details.grade && (
                        <>
                          <span className="font-medium text-zinc-400 dark:text-zinc-500">
                            Grade
                          </span>
                          <span>{details.grade}</span>
                        </>
                      )}
                      {details.clubs && (
                        <>
                          <span className="font-medium text-zinc-400 dark:text-zinc-500">
                            Clubs
                          </span>
                          <span>{details.clubs.join(", ")}</span>
                        </>
                      )}
                      {details.description && (
                        <>
                          <span className="font-medium text-zinc-400 dark:text-zinc-500">
                            Description
                          </span>
                          <span>{details.description}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
