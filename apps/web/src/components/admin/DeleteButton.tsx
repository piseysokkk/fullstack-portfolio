'use client';

import { useTransition } from 'react';

type Props = {
  action: () => Promise<void>;
  confirmMessage: string;
};

export function DeleteButton({ action, confirmMessage }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(async () => {
            await action();
          });
        }
      }}
      className="rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-bold transition hover:border-accent disabled:opacity-60"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}