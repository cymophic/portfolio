import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Career";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/layout/footer/Footer";

import PageAnimator, { AnimatedSection } from "@/components/layout/PageAnimator";

export default function Home() {
  return (
    <PageAnimator>
      <div className="mx-auto max-w-4xl w-full flex flex-1 flex-col font-sans py-18 sm:py-18 gap-28">
        <AnimatedSection className="mt-24"><Intro /></AnimatedSection>
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Stats /></AnimatedSection>
        <AnimatedSection><Work /></AnimatedSection>
        <AnimatedSection><Education /></AnimatedSection>
        <AnimatedSection><Projects /></AnimatedSection>
        <AnimatedSection className="-mb-10"><TechStack /></AnimatedSection>
        <AnimatedSection><Footer /></AnimatedSection>
      </div>
    </PageAnimator>
  );
}