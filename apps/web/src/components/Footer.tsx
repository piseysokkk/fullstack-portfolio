export function Footer() {
  return (
    <footer className="mt-24 px-6 py-10 text-center text-muted">
      <p className="font-display text-lg text-ink">Thanks for stopping by! 🌸</p>
      <div className="mt-3 flex justify-center gap-4 font-semibold">
        <a href="https://github.com/your-username" className="hover:text-accent">GitHub</a>
        <a href="https://linkedin.com/in/your-username" className="hover:text-accent">LinkedIn</a>
      </div>
      <p className="mt-4 text-sm">
        © {new Date().getFullYear()} Pisey · Built with Next.js & NestJS
      </p>
    </footer>
  );
}