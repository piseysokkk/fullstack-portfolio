import type { Skill, SkillCategory } from '@/lib/types';
import { SectionHeading } from './SectionHeading';

const categories: { key: SkillCategory; label: string; color: string }[] = [
  { key: 'frontend', label: 'Frontend', color: 'bg-peach' },
  { key: 'mobile', label: 'Mobile', color: 'bg-lavender' },
  { key: 'backend', label: 'Backend', color: 'bg-mint' },
  { key: 'tools', label: 'Tools', color: 'bg-butter' },
];

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="px-6 py-20">
      <SectionHeading title="My toolbox" subtitle="Things I build with every day" />

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const items = skills.filter((s) => s.category === cat.key);
          if (items.length === 0) return null;

          return (
            <div key={cat.key} className="rounded-[2rem] bg-surface p-6 shadow-soft">
              <div className={`h-2 w-12 rounded-full ${cat.color}`} aria-hidden />
              <h3 className="font-display mt-4 text-xl font-semibold">{cat.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill.id}
                    className="rounded-full border-2 border-ink/10 px-3 py-1 text-sm font-semibold"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}