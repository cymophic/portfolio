import { profileInfo } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import { ScheduleButton } from "@/components/ui/ScheduleButton";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

export default function Contact() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — CTA */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold text-zinc-700 dark:text-zinc-300">
                Let&#39;s work together
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-sm">
                Have a project in mind, want to collaborate, or just want to say
                hi? I&#39;m always open to new opportunities.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full sm:flex-row">
              <div className="w-full sm:w-fit">
                <ScheduleButton className="rounded-lg w-full max-w-94 sm:h-11 sm:px-8 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70" />
              </div>
              <div className="w-full sm:w-fit">
                <CopyEmailButton className="rounded-lg w-full max-w-94 sm:h-11 sm:px-8 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70" />
              </div>
            </div>
          </div>

          {/* Right — Get in Touch */}
          <div>
            <ul className="flex flex-col">
              {[
                ...profileInfo.socials.map((s) => ({
                  label: s.label,
                  handle: s.handle
                    ? `/${s.handle}`
                    : s.label === "Instagram"
                      ? "@" + s.link.replace(/https?:\/\/[^/]+\//, "")
                      : "/" + s.link.replace(/https?:\/\/[^/]+\//, ""),
                  href: s.link,
                })),
                {
                  label: "Email",
                  handle: profileInfo.emails[0],
                  href: `mailto:${profileInfo.emails[0]}`,
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex flex-col py-3 gap-1 border-b border-zinc-100 dark:border-zinc-900 last:border-0"
                >
                  <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                    {item.label}
                  </span>
                  <span className="font-console text-sm text-zinc-600 dark:text-zinc-300">
                    {item.handle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
