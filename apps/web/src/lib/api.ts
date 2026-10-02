import type { Experience, Project, Skill } from './types';

const API_URL = process.env.API_URL ?? 'http://localhost:4000/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 }, // re-fetch at most once a minute
  });
  if (!res.ok) throw new Error(`API request ${path} failed: ${res.status}`);
  return res.json();
}

export const api = {
  getProjects: () => get<Project[]>('/projects'),
  getProjectBySlug: (slug: string) => get<Project>(`/projects/slug/${slug}`),
  getSkills: () => get<Skill[]>('/skills'),
  getExperience: () => get<Experience[]>('/experience'),
};