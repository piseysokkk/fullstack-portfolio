import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { api } from '@/lib/api';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await api.getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return { title: `${project.title} — Pisey`, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await api.getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/#projects" className="font-semibold text-muted hover:text-accent">
        ← Back to projects
      </Link>

      <h1 className="font-display mt-6 text-4xl font-semibold sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-xl text-muted">{project.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech, i) => (
          <li
            key={tech}
            className={`rounded-full px-3 py-1 text-sm font-bold text-on-pastel ${
              ['bg-peach', 'bg-mint', 'bg-butter', 'bg-lavender'][i % 4]
            }`}
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-6 py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5"
            >
              Live demo ✨
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink/15 px-6 py-3 font-bold transition hover:-translate-y-0.5"
            >
              View code
            </a>
          )}
        </div>
      )}

      {project.content && (
        <div className="mt-10 rounded-4xl bg-surface p-8 text-lg leading-relaxed whitespace-pre-line shadow-soft">
          {project.content}
        </div>
      )}
    </article>
  );
}