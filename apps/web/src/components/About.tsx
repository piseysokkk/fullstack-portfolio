import { SectionHeading } from './SectionHeading';

const learning = ['NestJS', 'PostgreSQL', 'Docker', 'Testing'];

export function About() {
  return (
    <section id="about" className="px-6 py-20">
      <SectionHeading title="About me" />

      <div className="mx-auto grid max-w-4xl items-center gap-10 rounded-[2rem] bg-surface p-8 shadow-soft sm:grid-cols-[auto_1fr] sm:p-12">
        {/* Swap this for your photo later with next/image */}
        <div className="font-display mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-lavender text-6xl font-semibold text-on-pastel">
          P
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            I&apos;m a web and mobile developer who loves turning ideas into apps that feel easy and
            fun to use. I work with <strong>React and TypeScript</strong> on the web and{' '}
            <strong>React Native</strong> on mobile.
          </p>
          <p>
            Lately I&apos;ve been growing into full-stack work: designing APIs, working with
            databases, and writing tests. This portfolio&apos;s backend is one of those projects!
          </p>

          <div>
            <p className="font-display text-base font-semibold">Currently learning</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {learning.map((item, i) => (
                <li
                  key={item}
                  className={`rounded-full px-3 py-1 text-sm font-bold text-on-pastel ${
                    ['bg-peach', 'bg-mint', 'bg-butter', 'bg-lavender'][i % 4]
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}