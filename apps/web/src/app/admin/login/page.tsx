'use client';

import { useActionState } from 'react';
import { login, type LoginState } from '../actions';

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  const inputClass =
    'w-full rounded-2xl border-2 border-ink/10 bg-bg px-4 py-3 outline-none transition focus:border-accent';

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm space-y-5 rounded-[2rem] bg-surface p-8 shadow-soft">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold">Admin login</h1>
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block font-bold">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-bold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </div>

        {state.error && (
          <p role="alert" className="rounded-2xl bg-peach px-4 py-3 font-semibold text-on-pastel">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-accent py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </main>
  );
}