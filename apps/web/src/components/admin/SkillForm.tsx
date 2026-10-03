'use client';

import Link from 'next/link';
import type { FormState } from '@/app/admin/actions';
import { skillCategories, type Skill } from '@/lib/types';
import { useServerForm } from './useServerForm';

type Props = {
  action: (formData: FormData) => Promise<FormState>;
  skill?: Skill;
  submitLabel: string;
  resetOnSuccess?: boolean;
  showCancel?: boolean;
};

const inputClass =
  'w-full rounded-2xl border-2 border-ink/10 bg-bg px-4 py-3 outline-none transition focus:border-accent';

export function SkillForm({ action, skill, submitLabel, resetOnSuccess, showCancel }: Props) {
  const { error, pending, handleSubmit } = useServerForm(action, { resetOnSuccess });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[2fr_1.5fr_1.5fr_1fr]">
        <div>
          <label htmlFor="name" className="mb-1 block font-bold">Name</label>
          <input id="name" name="name" required maxLength={50} defaultValue={skill?.name} className={inputClass} />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block font-bold">Category</label>
          <select
            id="category"
            name="category"
            required
            defaultValue={skill?.category ?? 'frontend'}
            className={`${inputClass} capitalize`}
          >
            {skillCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="icon" className="mb-1 block font-bold">Icon (optional)</label>
          <input id="icon" name="icon" defaultValue={skill?.icon ?? ''} placeholder="react" className={inputClass} />
        </div>

        <div>
          <label htmlFor="sortOrder" className="mb-1 block font-bold">Order</label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            step={1}
            defaultValue={skill?.sortOrder ?? 0}
            className={inputClass}
          />
        </div>
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
          className="rounded-full bg-accent px-6 py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? 'Saving…' : submitLabel}
        </button>
        {showCancel && (
          <Link href="/admin/skills" className="font-semibold text-muted hover:text-accent">
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}