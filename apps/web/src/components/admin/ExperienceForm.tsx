'use client';

import Link from 'next/link';
import type { FormState } from '@/app/admin/actions';
import type { Experience } from '@/lib/types';
import { useServerForm } from './useServerForm';

type Props = {
  action: (formData: FormData) => Promise<FormState>;
  experience?: Experience;
  submitLabel: string;
};

const inputClass =
  'w-full rounded-2xl border-2 border-ink/10 bg-bg px-4 py-3 outline-none transition focus:border-accent';

export function ExperienceForm({ action, experience, submitLabel }: Props) {
  const { error, pending, handleSubmit } = useServerForm(action);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-surface p-8 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className="mb-1 block font-bold">Role</label>
          <input id="role" name="role" required maxLength={100} defaultValue={experience?.role} className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block font-bold">Company</label>
          <input
            id="company"
            name="company"
            required
            maxLength={100}
            defaultValue={experience?.company}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="location" className="mb-1 block font-bold">Location (optional)</label>
          <input
            id="location"
            name="location"
            defaultValue={experience?.location ?? ''}
            placeholder="Remote"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="startDate" className="mb-1 block font-bold">Start date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={experience?.startDate}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mb-1 block font-bold">End date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={experience?.endDate ?? ''}
            className={inputClass}
          />
          <p className="mt-1 text-sm text-muted">Leave empty if you still work here.</p>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block font-bold">Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={experience?.description}
          className={inputClass}
        />
        <p className="mt-1 text-sm text-muted">What you did and what you achieved. Line breaks are kept.</p>
      </div>

      <div>
        <label htmlFor="techStack" className="mb-1 block font-bold">Tech stack</label>
        <input
          id="techStack"
          name="techStack"
          defaultValue={experience?.techStack.join(', ')}
          placeholder="React, TypeScript"
          className={inputClass}
        />
        <p className="mt-1 text-sm text-muted">Separate with commas.</p>
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-peach px-4 py-3 font-semibold text-on-pastel">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-7 py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/admin/experience" className="font-semibold text-muted hover:text-accent">
          Cancel
        </Link>
      </div>
    </form>
  );
}