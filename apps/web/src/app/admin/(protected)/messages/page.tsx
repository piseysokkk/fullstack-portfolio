import { adminFetch } from '@/lib/admin-api';
import type { ContactMessage } from '@/lib/types';
import { deleteMessage, markMessageRead } from '../../actions';

const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' });

export default async function MessagesPage() {
  const messages = await adminFetch<ContactMessage[]>('/contact');

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Messages 💌</h1>

      {messages.length === 0 ? (
        <p className="mt-6 text-muted">No messages yet. They&apos;ll show up here!</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`rounded-[2rem] bg-surface p-6 shadow-soft ${
                msg.isRead ? 'opacity-70' : 'border-l-8 border-accent'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-xl font-semibold">
                    {msg.name}
                    {!msg.isRead && (
                      <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-xs font-bold text-on-pastel">
                        New
                      </span>
                    )}
                  </p>
                  <a href={`mailto:${msg.email}`} className="text-sm font-semibold text-muted hover:text-accent">
                    {msg.email}
                  </a>
                </div>
                <p className="text-sm text-muted">{formatter.format(new Date(msg.createdAt))}</p>
              </div>

              <p className="mt-4 leading-relaxed whitespace-pre-line">{msg.message}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: your message')}`}
                  className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-on-pastel"
                >
                  Reply by email
                </a>

                {!msg.isRead && (
                  <form action={markMessageRead.bind(null, msg.id)}>
                    <button type="submit" className="rounded-full bg-butter px-4 py-2 text-sm font-bold text-on-pastel">
                      Mark as read
                    </button>
                  </form>
                )}

                <form action={deleteMessage.bind(null, msg.id)}>
                  <button
                    type="submit"
                    className="rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-bold hover:border-accent"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}