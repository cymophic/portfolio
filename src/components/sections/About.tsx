import SectionTitle from "./common/SectionTitle";
import { profileInfo } from "@/lib/site";

export default function About() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Bio" />
        <div className="text-base flex flex-col gap-6">
          {profileInfo.bio.map((paragraph, index) => (
            <p 
              key={index} 
              className={
                index === 0 
                ? "text-zinc-700 dark:text-zinc-300"
                : "text-zinc-500 dark:text-zinc-300/80"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}