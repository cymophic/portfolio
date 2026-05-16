import Intro from "@/components/sections/home/Intro";
import About from "@/components/sections/home/About";
import Stats from "@/components/sections/home/Stats";
import Work from "@/components/sections/home/Career";
import Education from "@/components/sections/home/Education";
import Projects from "@/components/sections/home/Projects";
import Stack from "@/components/sections/home/Stack";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl w-full flex flex-1 flex-col font-sans gap-24">
      <Intro />
      <About />
      <Stats />
      <Stack />
      <Projects />
      <Work />
      <Education />
    </div>
  );
}
