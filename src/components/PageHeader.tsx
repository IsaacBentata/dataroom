interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <p className="text-accent-blue text-xs font-medium uppercase tracking-wider mb-3">{label}</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      {subtitle && (
        <p className="text-lg text-foreground-secondary max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
}
