type TimelineItemProps = {
  children: React.ReactNode;
};

export function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div className="relative pb-10 last:pb-0 group/item pl-8">
      {/* Line */}
      <div className="absolute left-1.5 top-1.5 -bottom-1.5 sm:top-7.5 sm:-bottom-7.5 w-0.5 bg-zinc-100 dark:bg-zinc-900 group-last/item:hidden" />

      {/* Dot */}
      <div className="absolute left-0 top-1.5 sm:top-7.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950" />
      
      {children}
    </div>
  );
}