import Link from 'next/link';
import type { Project } from '@/lib/types';

const colors = ['bg-peach', 'bg-lavender', 'bg-mint', 'bg-butter'];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[2rem] bg-surface shadow-soft transition hover:-translate-y-1">
      {/* Colored cover panel. We'll swap in real screenshots once image upload is added */}
      <div
        className={`flex h-40 items-center justify-center ${colors[index % colors.length]}`}
        aria-hidden
      >
        <span className="font-display text-6xl font-semibold text-on-pastel transition group-hover:scale-110">
          {project.title.charAt(0)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
          {project.featured && (
            <span className="shrink-0 rounded-full bg-butter px-3 py-1 text-xs font-bold text-on-pastel">
              ⭐ Featured
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech} className="rounded-full border-2 border-ink/10 px-3 py-0.5 text-xs font-bold">
              {tech}
            </li>
          ))}
        </ul>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 self-start rounded-full bg-accent px-5 py-2 font-bold text-on-pastel transition hover:-translate-y-0.5"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}