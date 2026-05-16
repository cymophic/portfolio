import { cn } from "@/lib/utils/cn";

type Props = {
  text: string;
  color?: string;
  className?: string;
};

export default function Pill({ text, color, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs whitespace-nowrap cursor-default",
        !color &&
          "border-zinc-300 text-zinc-700 dark:border-zinc-600 dark:text-zinc-300/80",
        className,
      )}
      style={
        color
          ? {
              borderColor: `${color}55`,
              backgroundColor: `${color}18`,
              color: color,
            }
          : undefined
      }
    >
      {text}
    </span>
  );
}
