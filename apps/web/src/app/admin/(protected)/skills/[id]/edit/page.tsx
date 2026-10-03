import { notFound } from 'next/navigation';
import { adminFetch, ApiError } from '@/lib/admin-api';
import type { Skill } from '@/lib/types';
import { updateSkill } from '@/app/admin/actions';
import { SkillForm } from '@/components/admin/SkillForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditSkillPage({ params }: Props) {
  const { id } = await params;

  let skill: Skill;
  try {
    skill = await adminFetch<Skill>(`/skills/${id}`);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) notFound();
    throw err;
  }

  return (
    <div>
      <h1 className="font-display mb-6 text-3xl font-semibold">Edit “{skill.name}”</h1>
      <div className="rounded-[2rem] bg-surface p-6 shadow-soft">
        <SkillForm action={updateSkill.bind(null, skill.id)} skill={skill} submitLabel="Save changes" showCancel />
      </div>
    </div>
  );
}