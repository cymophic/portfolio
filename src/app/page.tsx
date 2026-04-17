import Intro from "@/components/sections/Intro";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Work";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/layout/footer/Footer";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl w-full flex flex-1 flex-col font-sans py-18 sm:py-18 gap-20">
      <Intro />
      <Stats />
      <Work />
      <Education />
      <Projects />
      <div className="-mb-6">
        <TechStack />
      </div>
      <Footer />
    </div>
  );
}