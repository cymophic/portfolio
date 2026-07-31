"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE;

const wip = new Set([
  "/projects/hangman/",
  "/projects/cymo-gpt/",
  "/projects/pmc-business/",
  "/projects/mobilecare-ph/",
]);

export default function ComingSoon({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  if (children && SITE_MODE !== "coming_soon" && !wip.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 text-center">
        {/* 000 display */}
        <div className="font-mono text-8xl font-bold tracking-widest text-zinc-200 dark:text-zinc-800 select-none">
          000
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
            Coming soon
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
            I&#39;m still writing the code for this one.<br />
            Try checking it out again later.
          </p>
        </div>
        <p className="font-console text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          / work in progress
        </p>

        {/* Home button */}
        <Link href="/" className="w-full sm:px-0">
          <Button variant="secondary" size="md" className="rounded-lg w-full max-w-94 sm:w-54 sm:h-11 sm:px-4 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70">
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}