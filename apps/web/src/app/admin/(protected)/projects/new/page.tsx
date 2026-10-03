import { ProjectForm } from '@/components/admin/ProjectForm';
import { createProject } from '../../../actions';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display mb-6 text-3xl font-semibold">New project ✨</h1>
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}