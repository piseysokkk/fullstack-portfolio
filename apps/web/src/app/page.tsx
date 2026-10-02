import { api } from '@/lib/api';

export default async function Home() {
  const [projects, skills, experience] = await Promise.all([
    api.getProjects(),
    api.getSkills(),
    api.getExperience(),
  ]);

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-8">
      <h1 className="text-3xl font-bold">Portfolio — connection test</h1>

      <section>
        <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
        <ul className="list-disc pl-6">
          {projects.map((p) => (
            <li key={p.id}>{p.title} — {p.techStack.join(', ')}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Skills ({skills.length})</h2>
        <ul className="list-disc pl-6">
          {skills.map((s) => (
            <li key={s.id}>{s.name} ({s.category})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Experience ({experience.length})</h2>
        <ul className="list-disc pl-6">
          {experience.map((e) => (
            <li key={e.id}>{e.role} at {e.company}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}