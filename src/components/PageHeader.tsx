interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <p className="text-accent-blue text-xs font-medium uppercase tracking-normal mb-1.5 font-mono">{label}</p>
      <h1 className="text-3xl md:text-[2.5rem] font-bold mb-4 leading-tight">{title}</h1>
      {subtitle && (
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
