'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { adminFetch, API_URL, TOKEN_COOKIE } from '@/lib/admin-api';

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