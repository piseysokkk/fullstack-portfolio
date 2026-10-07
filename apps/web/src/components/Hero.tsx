import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24">
      {/* Decorative blobs */}
      <div aria-hidden className="blob -top-10 -left-20 h-72 w-72 bg-peach" />
      <div aria-hidden className="blob top-20 -right-16 h-64 w-64 bg-lavender [animation-delay:-3s]" />
      <div aria-hidden className="blob -bottom-16 left-1/3 h-56 w-56 bg-mint [animation-delay:-6s]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="inline-block rounded-full bg-butter px-4 py-1 text-sm font-bold text-on-pastel">
          Hi there, I&apos;m Pisey
        </p>

        <h1 className="font-display mt-6 text-4xl leading-tight font-semibold sm:text-6xl">
          I build friendly apps for{' '}
          <span className="inline-block -rotate-2 rounded-2xl bg-mint px-3 text-on-pastel">web</span>{' '}
          &{' '}
          <span className="inline-block rotate-2 rounded-2xl bg-peach px-3 text-on-pastel">mobile</span>
        </h1>

        <p className="mt-6 text-lg text-muted">
          React, Next.js and React Native developer, now building full-stack with NestJS and PostgreSQL.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/#projects"
            className="rounded-full bg-accent px-7 py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5"
          >
            See my work
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border-2 border-ink/15 px-7 py-3 font-bold transition hover:-translate-y-0.5 hover:border-ink/30"
          >
            Say hello
          </Link>
        </div>
      </div>
    </section>
  );
}