import Intro from "@/components/sections/Intro";
import Work from "@/components/sections/Work";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans py-18 sm:py-18 gap-20">
      <Intro />
      <Work />
      <Education />
      <Projects />
      <TechStack />
      <Footer />
    </div>
  );
}