import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Career";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

import PageAnimator, { AnimatedSection } from "@/components/ui/PageAnimator";

export default function Home() {
  return (
    <PageAnimator>
      <div className="mx-auto max-w-4xl w-full flex flex-1 flex-col font-sans gap-24">
        {/* Intro */}
        <AnimatedSection>
          <Intro />
        </AnimatedSection>

        {/* Bio */}
        <AnimatedSection>
          <About />
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection>
          <Stats />
        </AnimatedSection>

        {/* Projects */}
        <AnimatedSection>
          <Projects />
        </AnimatedSection>

        {/* Work Experience */}
        <AnimatedSection>
          <Work />
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection>
          <Education />
        </AnimatedSection>

        {/* Tech Stack */}
        <AnimatedSection className="-mb-14">
          <TechStack />
        </AnimatedSection>
      </div>
    </PageAnimator>
  );
}