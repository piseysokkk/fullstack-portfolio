'use client';

import { useState, useTransition } from 'react';
import type { FormState } from '@/app/admin/actions';

type Options = {
  resetOnSuccess?: boolean; // clear the form after a successful save
};

export function useServerForm(
  action: (formData: FormData) => Promise<FormState>,
  options: Options = {},
) {
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // save it now: currentTarget is gone after the await
    const formData = new FormData(form);
    setError(undefined);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
      } else if (options.resetOnSuccess) {
        form.reset();
      }
    });
  }

  return { error, pending, handleSubmit };
}