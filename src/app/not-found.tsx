import Link from "next/link";
import Button from "@/components/ui/Button";

const glitchChars = ["4", "0", "4"];

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 gap-10 text-center">

      {/* 404 display */}
      <div className="font-mono text-8xl font-bold tracking-widest text-zinc-200 dark:text-zinc-800 select-none">
        {glitchChars.map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
          Page not found
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          This page doesn&apos;t exist or may have been moved. Happens to the best deployments.
        </p>
      </div>

      {/* Fun detail */}
      <p className="font-console text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
        / error 404
      </p>

      {/* Home button */}
      <Link href="/">
        <Button variant="secondary" size="md" className="rounded-lg w-full max-w-94 sm:w-54 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70">
          Back to Main
        </Button>
      </Link>
    </div>
  );
}