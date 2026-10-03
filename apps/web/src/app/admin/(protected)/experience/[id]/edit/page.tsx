import { notFound } from 'next/navigation';
import { adminFetch, ApiError } from '@/lib/admin-api';
import type { Experience } from '@/lib/types';
import { updateExperience } from '@/app/admin/actions';
import { ExperienceForm } from '@/components/admin/ExperienceForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;

  let experience: Experience;
  try {
    experience = await adminFetch<Experience>(`/experience/${id}`);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) notFound();
    throw err;
  }

  return (
    <div>
      <h1 className="font-display mb-6 text-3xl font-semibold">
        Edit “{experience.role} at {experience.company}”
      </h1>
      <ExperienceForm
        action={updateExperience.bind(null, experience.id)}
        experience={experience}
        submitLabel="Save changes"
      />
    </div>
  );
}