import { api } from '@/lib/api';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ContactForm } from '@/components/ContactForm';

export default async function Home() {
  // If the API is down, show empty sections instead of crashing the whole page
  const [projects, skills, experience] = await Promise.all([
    api.getProjects().catch(() => []),
    api.getSkills().catch(() => []),
    api.getExperience().catch(() => []),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <ExperienceTimeline experience={experience} />
      <ContactForm />
    </>
  );
}