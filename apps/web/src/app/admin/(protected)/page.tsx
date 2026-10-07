import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';
import type { ContactMessage, Experience, Project, Skill } from '@/lib/types';

export default async function DashboardPage() {
  const [projects, skills, experience, messages] = await Promise.all([
    adminFetch<Project[]>('/projects'),
    adminFetch<Skill[]>('/skills'),
    adminFetch<Experience[]>('/experience'),
    adminFetch<ContactMessage[]>('/contact'),
  ]);

  const unread = messages.filter((m) => !m.isRead).length;

  const stats = [
    { label: 'Projects', value: projects.length, color: 'bg-peach', href: '/admin/projects' },
    { label: 'Skills', value: skills.length, color: 'bg-lavender', href: '/admin/skills' },
    { label: 'Experience', value: experience.length, color: 'bg-mint', href: '/admin/experience' },
    { label: 'Unread messages', value: unread, color: 'bg-butter', href: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Welcome back!</h1>
      <p className="mt-1 text-muted">Here&apos;s what&apos;s on your portfolio right now.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const card = (
            <div className={`rounded-[2rem] p-6 text-on-pastel shadow-soft ${stat.color}`}>
              <p className="font-display text-4xl font-semibold">{stat.value}</p>
              <p className="font-bold">{stat.label}</p>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="transition hover:-translate-y-1">
              {card}
            </Link>
          ) : (
            <div key={stat.label}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}