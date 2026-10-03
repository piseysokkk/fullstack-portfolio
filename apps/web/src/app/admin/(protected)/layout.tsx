import Link from 'next/link';
import type { Metadata } from 'next';
import { adminFetch } from '@/lib/admin-api';
import { logout } from '../actions';

export const metadata: Metadata = {
  title: 'Admin — Pisey',
  robots: { index: false, follow: false }, // keep admin pages out of Google
};

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/messages', label: 'Messages' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const me = await adminFetch<{ id: string; email: string }>('/auth/me');

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-surface px-6 py-4 shadow-soft">
        <Link href="/admin" className="font-display text-2xl font-semibold">
          Admin<span className="text-accent">.</span>
        </Link>

        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 font-semibold text-muted transition hover:bg-lavender hover:text-on-pastel"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:inline">{me.email}</span>
          <form action={logout}>
            <button type="submit" className="rounded-full bg-butter px-4 py-2 font-bold text-on-pastel">
              Log out
            </button>
          </form>
          <Link href="/" className="text-sm font-semibold text-muted hover:text-accent">
            View site ↗
          </Link>
        </div>
      </header>

      {children}
    </div>
  );
}