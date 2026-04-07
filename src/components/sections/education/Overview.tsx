export default function EducationOverviewSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-20 sm:px-10 sm:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Education
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
          Degrees &amp; learning
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          This page will outline your formal education, certifications, and
          notable courses.
        </p>
      </div>
    </section>
  );
}

