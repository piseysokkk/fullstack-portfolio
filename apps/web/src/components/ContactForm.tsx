'use client';

import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // save it now: currentTarget is gone after the await
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        throw new Error("Whoa, that's a lot of messages! Please wait a minute and try again.");
      }
      if (!res.ok) {
        throw new Error('Something went wrong. Please check your details and try again.');
      }

      form.reset();
      setStatus('sent');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-2xl border-2 border-ink/10 bg-bg px-4 py-3 outline-none transition focus:border-accent';

  return (
    <section id="contact" className="px-6 py-20">
      <SectionHeading title="Say hello" subtitle="Have a project or just want to chat? Send me a note!" />

      <div className="mx-auto max-w-xl rounded-[2rem] bg-surface p-8 shadow-soft">
        {status === 'sent' ? (
          <div className="py-8 text-center">
            <p className="font-display mt-4 text-2xl font-semibold">Message sent!</p>
            <p className="mt-2 text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 font-bold text-accent hover:underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1 block font-bold">Name</label>
              <input id="name" name="name" required minLength={2} maxLength={100} className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block font-bold">Email</label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block font-bold">Message</label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                className={inputClass}
              />
            </div>

            {/* Honeypot: hidden from humans, bots fill it in */}
            <div aria-hidden className="absolute -left-[9999px]">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-2xl bg-peach px-4 py-3 font-semibold text-on-pastel">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-accent py-3 font-bold text-on-pastel shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}