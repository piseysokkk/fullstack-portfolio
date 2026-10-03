import { notFound } from 'next/navigation';
import { adminFetch, ApiError } from '@/lib/admin-api';
import type { Project } from '@/lib/types';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { updateProject } from '../../../../actions';

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  let project: Project;
  try {
    project = await adminFetch<Project>(`/projects/${id}`);
  } catch (err) {
    // 404: no such project. 400: the id isn't a valid UUID.
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) notFound();
    throw err;
  }

  return (
    <div>
      <h1 className="font-display mb-6 text-3xl font-semibold">Edit “{project.title}”</h1>
      <ProjectForm
        action={updateProject.bind(null, project.id)}
        project={project}
        submitLabel="Save changes"
      />
    </div>
  );
}