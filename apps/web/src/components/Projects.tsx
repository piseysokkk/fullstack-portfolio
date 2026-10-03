import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { SectionHeading } from './SectionHeading';

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-6 py-20">
      <SectionHeading emoji="🎈" title="Things I've made" subtitle="A few projects I'm proud of" />

      {projects.length === 0 ? (
        <p className="text-center text-muted">Projects are on their way! 🚧</p>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}