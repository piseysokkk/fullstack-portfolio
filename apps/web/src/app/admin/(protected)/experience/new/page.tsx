import { createExperience } from '@/app/admin/actions';
import { ExperienceForm } from '@/components/admin/ExperienceForm';

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="font-display mb-6 text-3xl font-semibold">New experience ✨</h1>
      <ExperienceForm action={createExperience} submitLabel="Add experience" />
    </div>
  );
}