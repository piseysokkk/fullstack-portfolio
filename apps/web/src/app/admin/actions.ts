'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { adminFetch,ApiError, API_URL, TOKEN_COOKIE } from '@/lib/admin-api';

// ---------- Auth ----------

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  let accessToken: string;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      cache: 'no-store',
    });

    if (res.status === 400 || res.status === 401) {
      return { error: 'Wrong email or password.' };
    }
    if (!res.ok) return { error: 'Login failed. Please try again.' };

    ({ accessToken } = await res.json());
  } catch {
    return { error: "Can't reach the API. Is it running?" };
  }

  (await cookies()).set(TOKEN_COOKIE, accessToken, {
    httpOnly: true, // browser JavaScript can't read it
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day, same as the JWT expiry
  });

  redirect('/admin'); // must be outside try/catch, because redirect works by throwing
}

export async function logout() {
  (await cookies()).delete(TOKEN_COOKIE);
  redirect('/admin/login');
}

// ---------- Messages ----------

export async function markMessageRead(id: string) {
  await adminFetch(`/contact/${id}/read`, { method: 'PATCH' });
  revalidatePath('/admin', 'layout');
}

export async function deleteMessage(id: string) {
  await adminFetch(`/contact/${id}`, { method: 'DELETE' });
  revalidatePath('/admin', 'layout');
}

// ---------- Projects ----------

export type FormState = { error?: string };

function projectFromForm(formData: FormData) {
  const text = (key: string) => String(formData.get(key) ?? '').trim();
  const optional = (key: string) => text(key) || null; // empty field → null (clears the value)

  return {
    title: text('title'),
    slug: text('slug'),
    summary: text('summary'),
    content: optional('content'),
    techStack: text('techStack')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    liveUrl: optional('liveUrl'),
    githubUrl: optional('githubUrl'),
    featured: formData.get('featured') === 'on',
    sortOrder: Number(text('sortOrder') || 0),
  };
}

export async function createProject(formData: FormData): Promise<FormState> {
  try {
    await adminFetch('/projects', { method: 'POST', body: projectFromForm(formData) });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    throw err; // let Next.js handle redirects and unexpected errors
  }
  revalidatePath('/', 'layout'); // refresh the public site and admin pages
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData): Promise<FormState> {
  try {
    await adminFetch(`/projects/${id}`, { method: 'PATCH', body: projectFromForm(formData) });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    throw err;
  }
  revalidatePath('/', 'layout');
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  await adminFetch(`/projects/${id}`, { method: 'DELETE' });
  revalidatePath('/', 'layout');
}