import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';
import type { Project } from '@/lib/types';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteProject } from '../../actions';

export default async function AdminProjectsPage() {
  const projects = await adminFetch<Project[]>('/projects');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Projects 🎈</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-accent px-6 py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5"
        >
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-muted">No projects yet. Add your first one!</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-surface p-6 shadow-soft"
            >
              <div>
                <p className="font-display text-xl font-semibold">
                  {project.title}
                  {project.featured && <span className="ml-2" aria-label="Featured">⭐</span>}
                </p>
                <p className="text-sm text-muted">/projects/{project.slug}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-full px-4 py-2 text-sm font-bold text-muted hover:text-accent"
                >
                  View ↗
                </Link>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-on-pastel"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteProject.bind(null, project.id)}
                  confirmMessage={`Delete "${project.title}"? This can't be undone.`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}