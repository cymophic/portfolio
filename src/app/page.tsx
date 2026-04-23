import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Career";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

import PageAnimator, { AnimatedSection } from "@/components/layout/PageAnimator";

export default function Home() {
  return (
    <PageAnimator>
      <div className="mx-auto max-w-4xl w-full flex flex-1 flex-col font-sans py-18 sm:py-18 gap-28">
        <div className="min-h-[calc(100svh-4rem)] flex flex-col justify-center gap-28 sm:-mt-6 sm:-mb-20">
          {/* Intro, Tagline, Profile */}
          <AnimatedSection className="mt-24 sm:mt-0">
            <Intro />
          </AnimatedSection>

          {/* Bio */}
          <AnimatedSection>
            <About />
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection>
          <Stats />
        </AnimatedSection>

        {/* Work Experience */}
        <AnimatedSection>
          <Work />
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection>
          <Education />
        </AnimatedSection>

        {/* Projects */}
        <AnimatedSection>
          <Projects />
        </AnimatedSection>

        {/* Tech Stack */}
        <AnimatedSection className="-mb-10">
          <TechStack />
        </AnimatedSection>
      </div>
    </PageAnimator>
  );
}