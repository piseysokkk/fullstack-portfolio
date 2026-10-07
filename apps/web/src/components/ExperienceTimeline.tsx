import type { Experience } from '@/lib/types';
import { SectionHeading } from './SectionHeading';

const formatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC', // dates are stored without time, so format them as UTC to avoid off-by-one months
});

function formatRange(start: string, end: string | null) {
  const from = formatter.format(new Date(start));
  const to = end ? formatter.format(new Date(end)) : 'Present';
  return `${from} – ${to}`;
}

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="px-6 py-20">
      <SectionHeading title="Where I've worked" />

      {experience.length === 0 ? (
        <p className="text-center text-muted">Coming soon!</p>
      ) : (
        <ol className="mx-auto max-w-3xl space-y-6 border-l-4 border-dashed border-lavender pl-8">
          {experience.map((job) => (
            <li key={job.id} className="relative">
              {/* Dot on the timeline */}
              <span
                aria-hidden
                className="absolute top-6 -left-[2.6rem] h-5 w-5 rounded-full border-4 border-bg bg-accent"
              />

              <div className="rounded-[2rem] bg-surface p-6 shadow-soft">
                <p className="text-sm font-bold text-muted">
                  {formatRange(job.startDate, job.endDate)}
                  {job.location && ` · ${job.location}`}
                </p>
                <h3 className="font-display mt-1 text-2xl font-semibold">{job.role}</h3>
                <p className="font-semibold">{job.company}</p>
                <p className="mt-3 leading-relaxed text-muted whitespace-pre-line">{job.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.techStack.map((tech) => (
                    <li key={tech} className="rounded-full border-2 border-ink/10 px-3 py-0.5 text-xs font-bold">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}