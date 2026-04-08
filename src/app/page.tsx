import Introduction from "@/components/sections/Introduction";
import WorkTimeline from "@/components/sections/Work";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <Introduction />
      <WorkTimeline />
    </div>
  );
}