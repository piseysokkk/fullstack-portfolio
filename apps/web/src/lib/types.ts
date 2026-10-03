export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type SkillCategory = 'frontend' | 'mobile' | 'backend' | 'tools';

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string | null;
  sortOrder: number;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string;
  techStack: string[];
};
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export const skillCategories: SkillCategory[] = ['frontend', 'mobile', 'backend', 'tools'];