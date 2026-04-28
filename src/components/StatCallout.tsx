interface StatCalloutProps {
  value: string;
  label: string;
  color?: string;
}

export default function StatCallout({ value, label, color = "text-accent-green" }: StatCalloutProps) {
  return (
    <div className="text-center py-4">
      <div className={`text-3xl md:text-4xl font-bold ${color} mb-1.5`} style={{ fontFamily: 'var(--font-fair-favorit-heading)', letterSpacing: '-0.03em' }}>{value}</div>
      <div className="text-muted-foreground text-xs">{label}</div>
    </div>
  );
}
