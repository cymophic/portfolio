import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "@/components/sections/common/SectionTitle";
import { TimelineItem } from "@/components/sections/common/Timeline";

export default function Education() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Education" />

        <div className="flex flex-col">
          {profileInfo.education.map((edu, i) => {
            const { details } = edu;

            return (
              <TimelineItem key={i}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-start">
                  {/* Left: School info */}
                  <div className="flex gap-5 sm:gap-3 items-start">
                    {edu.logo && (
                      <a href={edu.website} target="_blank" rel="noopener noreferrer" className="hidden sm:block shrink-0">
                        <Image src={edu.logo} alt={edu.school} width={64} height={64} className="rounded-lg object-cover mt-0.5 p-1 -ml-1 border border-zinc-300 dark:border-zinc-600" />
                      </a>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-semibold text-zinc-700 dark:text-zinc-100">{edu.degree}</span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        <a href={edu.website} target="_blank" rel="noopener noreferrer" className={edu.website ? "underline sm:no-underline sm:hover:underline" : ""}>
                          {edu.school}
                          {edu.website && (
                            <MdArrowOutward size={18} className="sm:hidden inline ml-1 mb-0.5 overflow-clip" />
                          )}
                        </a>
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400 sm:text-zinc-500 sm:dark:text-zinc-500">{edu.start} - {edu.end}</span>
                    </div>
                  </div>

                  {/* Right: Details */}
                  {details && (
                    <div className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {details.honor && (
                        <>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Honors</span>
                          <span>{details.honor.join(", ")}</span>
                        </>
                      )}
                      {details.awards && (
                        <>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Awards</span>
                          <span>{details.awards.join(", ")}</span>
                        </>
                      )}
                      {details.grade && (
                        <>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Grade</span>
                          <span>{details.grade}</span>
                        </>
                      )}
                      {details.clubs && (
                        <>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Clubs</span>
                          <span>{details.clubs.join(", ")}</span>
                        </>
                      )}
                      {details.description && (
                        <>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Description</span>
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