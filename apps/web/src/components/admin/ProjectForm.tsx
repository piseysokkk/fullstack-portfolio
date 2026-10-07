'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import type { FormState } from '@/app/admin/actions';
import type { Project } from '@/lib/types';

type Props = {
  action: (formData: FormData) => Promise<FormState>;
  project?: Project; // present when editing
  submitLabel: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const inputClass =
  'w-full rounded-2xl border-2 border-ink/10 bg-bg px-4 py-3 outline-none transition focus:border-accent';

export function ProjectForm({ action, project, submitLabel }: Props) {
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(project?.title ?? '');
  const [slug, setSlug] = useState(project?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(Boolean(project)); // editing: don't auto-change the slug

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(undefined);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-surface p-8 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1 block font-bold">Title</label>
          <input
            id="title"
            name="title"
            required
            maxLength={100}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1 block font-bold">Slug</label>
          <input
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers and dashes"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugEdited(true);
            }}
            className={inputClass}
          />
          <p className="mt-1 text-sm text-muted">URL: /projects/{slug || '…'}</p>
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="mb-1 block font-bold">Summary</label>
        <input
          id="summary"
          name="summary"
          required
          maxLength={300}
          defaultValue={project?.summary}
          className={inputClass}
        />
        <p className="mt-1 text-sm text-muted">One sentence, shown on the project card.</p>
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block font-bold">Details</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={project?.content ?? ''}
          className={inputClass}
        />
        <p className="mt-1 text-sm text-muted">Shown on the project page. Line breaks are kept.</p>
      </div>

      <div>
        <label htmlFor="techStack" className="mb-1 block font-bold">Tech stack</label>
        <input
          id="techStack"
          name="techStack"
          defaultValue={project?.techStack.join(', ')}
          placeholder="React, TypeScript, NestJS"
          className={inputClass}
        />
        <p className="mt-1 text-sm text-muted">Separate with commas.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="liveUrl" className="mb-1 block font-bold">Live URL</label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={project?.liveUrl ?? ''}
            placeholder="https://"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="githubUrl" className="mb-1 block font-bold">GitHub URL</label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl ?? ''}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-8">
        <div>
          <label htmlFor="sortOrder" className="mb-1 block font-bold">Sort order</label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            step={1}
            defaultValue={project?.sortOrder ?? 0}
            className={`${inputClass} w-28`}
          />
        </div>

        <label className="flex items-center gap-3 pb-3 font-bold">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={project?.featured}
            className="h-5 w-5 accent-[var(--accent)]"
          />
          Featured
        </label>
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
        <Link href="/admin/projects" className="font-semibold text-muted hover:text-accent">
          Cancel
        </Link>
      </div>
    </form>
  );
}