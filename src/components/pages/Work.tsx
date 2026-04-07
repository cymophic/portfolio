export default function WorkPage() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-20 sm:px-10 sm:py-24">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Work
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Professional experience
          </h1>
          <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            This page will list roles, responsibilities, and selected highlights
            from your work history.
          </p>
        </header>
        {/* Future: timeline / cards for each role */}
      </main>
    </div>
  );
}

