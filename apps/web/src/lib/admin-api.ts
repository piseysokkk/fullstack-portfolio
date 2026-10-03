import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const API_URL = process.env.API_URL ?? 'http://localhost:4000/api';
export const TOKEN_COOKIE = 'admin_token';

type Options = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
};

export async function adminFetch<T>(path: string, options: Options = {}): Promise<T> {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;
  if (!token) redirect('/admin/login');

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: 'no-store', // admin data should always be fresh
  });

  if (res.status === 401) redirect('/admin/login'); // token expired or invalid
  if (!res.ok) throw new Error(`Admin request ${path} failed: ${res.status}`);
  return res.json();
}