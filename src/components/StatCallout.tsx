import AnimateText from "@/components/AnimateText";

interface StatCalloutProps {
  value: string;
  label: string;
  color?: string;
}

export default function StatCallout({ value, label, color = "text-accent-green" }: StatCalloutProps) {
  return (
    <div data-slot="stat" className="text-center py-4">
      <AnimateText
        as="div"
        text={value}
        className={`font-bold ${color} mb-0.5`}
        style={{ fontFamily: "var(--font-fair-favorit-heading)", letterSpacing: "-0.03em", fontSize: "32px" }}
      />
      <div className="text-muted-foreground" style={{ fontFamily: "var(--font-fair-favorit-book), sans-serif", fontSize: "14px", fontWeight: 400 }}>{label}</div>
    </div>
  );
}
