interface StatCalloutProps {
  value: string;
  label: string;
  color?: string;
}

export default function StatCallout({ value, label, color = "text-accent-green" }: StatCalloutProps) {
  return (
    <div className="text-center">
      <div className={`text-3xl md:text-4xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-foreground-secondary text-xs md:text-sm">{label}</div>
    </div>
  );
}
