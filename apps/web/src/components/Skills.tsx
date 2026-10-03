import type { Skill, SkillCategory } from '@/lib/types';
import { SectionHeading } from './SectionHeading';

const categories: { key: SkillCategory; label: string; emoji: string; color: string }[] = [
  { key: 'frontend', label: 'Frontend', emoji: '🎨', color: 'bg-peach' },
  { key: 'mobile', label: 'Mobile', emoji: '📱', color: 'bg-lavender' },
  { key: 'backend', label: 'Backend', emoji: '🛠️', color: 'bg-mint' },
  { key: 'tools', label: 'Tools', emoji: '🧰', color: 'bg-butter' },
];

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="px-6 py-20">
      <SectionHeading emoji="🧁" title="My toolbox" subtitle="Things I build with every day" />

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const items = skills.filter((s) => s.category === cat.key);
          if (items.length === 0) return null;

          return (
            <div key={cat.key} className="rounded-[2rem] bg-surface p-6 shadow-soft">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${cat.color}`}
                aria-hidden
              >
                {cat.emoji}
              </div>
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