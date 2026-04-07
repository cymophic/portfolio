export default function ComingSoon() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <section className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Coming soon...
          </h1>
        </div>
      </section>
    </div>
  );
}
