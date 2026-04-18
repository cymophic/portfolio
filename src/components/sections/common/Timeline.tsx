type TimelineItemProps = {
  children: React.ReactNode;
};

export function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div className="relative pb-10 last:pb-0 group/item pl-8">
      <div className="absolute left-1.75 top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 group-last/item:hidden" />
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950" />
      {children}
    </div>
  );
}