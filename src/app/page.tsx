import Intro from "@/components/sections/Intro";
import Work from "@/components/sections/Work";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans pt-20 pb-20 sm:pt-28 sm:pb-28 gap-20">
      <Intro />
      <Work />
      <Education />
      <Projects />
      <TechStack />
    </div>
  );
}