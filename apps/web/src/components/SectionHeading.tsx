type Props = {
  emoji: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ emoji, title, subtitle }: Props) {
  return (
    <div className="mb-10 text-center">
      <span aria-hidden className="text-4xl">{emoji}</span>
      <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
    </div>
  );
}