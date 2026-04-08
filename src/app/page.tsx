import Intro from "@/components/sections/Introduction";
import WorkTimeline from "@/components/sections/Work";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans pt-20 pb-20 sm:pt-28 sm:pb-28 gap-36">
      <Intro />
      <WorkTimeline />
    </div>
  );
}