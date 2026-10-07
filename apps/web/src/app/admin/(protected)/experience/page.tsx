import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';
import type { Experience } from '@/lib/types';
import { deleteExperience } from '@/app/admin/actions';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function AdminExperiencePage() {
  const experience = await adminFetch<Experience[]>('/experience');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="rounded-full bg-accent px-6 py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5"
        >
          + New experience
        </Link>
      </div>

      {experience.length === 0 ? (
        <p className="mt-6 text-muted">No experience yet. Add your first role!</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {experience.map((job) => (
            <li
              key={job.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-surface p-6 shadow-soft"
            >
              <div>
                <p className="font-display text-xl font-semibold">{job.role}</p>
                <p className="text-sm text-muted">
                  {job.company} · {job.startDate} → {job.endDate ?? 'Present'}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/experience/${job.id}/edit`}
                  className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-on-pastel"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteExperience.bind(null, job.id)}
                  confirmMessage={`Delete "${job.role} at ${job.company}"?`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}