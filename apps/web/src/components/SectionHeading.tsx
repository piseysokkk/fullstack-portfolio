type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
    </div>
  );
}