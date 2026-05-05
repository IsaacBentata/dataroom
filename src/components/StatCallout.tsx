import AnimateText from "@/components/AnimateText";

interface StatCalloutProps {
  value: string;
  label: string;
  color?: string;
  compact?: boolean;
}

export default function StatCallout({ value, label, color = "text-accent-green", compact = false }: StatCalloutProps) {
  return (
    <div data-slot="stat" className={compact ? "text-center py-3" : "text-center py-4"}>
      <AnimateText
        as="div"
        text={value}
        className={`font-bold ${color} mb-0.5`}
        style={{ fontFamily: "var(--font-fair-favorit-heading)", letterSpacing: "-0.03em", fontSize: compact ? "26px" : "32px" }}
      />
      <div className="text-muted-foreground" style={{ fontFamily: "var(--font-fair-favorit-book), sans-serif", fontSize: compact ? "11px" : "14px", fontWeight: 400 }}>{label}</div>
    </div>
  );
}
