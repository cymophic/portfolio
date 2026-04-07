export default function Hero() {
  return (
    <section className="w-full border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-20 sm:px-10 sm:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Intro
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
          Luis Abhram Mata
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Software engineer focused on building performant, animation-rich web
          experiences with Next.js, TypeScript, and modern tooling.
        </p>
      </div>
    </section>
  );
}

