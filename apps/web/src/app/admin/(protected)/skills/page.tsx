import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';
import { skillCategories, type Skill } from '@/lib/types';
import { createSkill, deleteSkill } from '@/app/admin/actions';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { SkillForm } from '@/components/admin/SkillForm';

export default async function AdminSkillsPage() {
  const skills = await adminFetch<Skill[]>('/skills');

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Skills</h1>

      <section className="mt-6 rounded-[2rem] bg-surface p-6 shadow-soft">
        <h2 className="font-display mb-4 text-xl font-semibold">Add a skill</h2>
        <SkillForm action={createSkill} submitLabel="Add skill" resetOnSuccess />
      </section>

      {skills.length === 0 ? (
        <p className="mt-6 text-muted">No skills yet. Add your first one above!</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category) => {
            const items = skills.filter((s) => s.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category} className="rounded-[2rem] bg-surface p-6 shadow-soft">
                <h2 className="font-display text-xl font-semibold capitalize">{category}</h2>
                <ul className="mt-4 space-y-2">
                  {items.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-bg px-4 py-2"
                    >
                      <span className="font-semibold">
                        {skill.name}
                        <span className="ml-2 text-sm text-muted">#{skill.sortOrder}</span>
                      </span>
                      <span className="flex gap-2">
                        <Link
                          href={`/admin/skills/${skill.id}/edit`}
                          className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-on-pastel"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteSkill.bind(null, skill.id)}
                          confirmMessage={`Delete "${skill.name}"?`}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}