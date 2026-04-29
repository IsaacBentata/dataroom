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
        className={`text-3xl md:text-4xl font-bold ${color} mb-1.5`}
        style={{ fontFamily: "var(--font-fair-favorit-heading)", letterSpacing: "-0.03em" }}
      />
      <div className="text-muted-foreground text-xs">{label}</div>
    </div>
  );
}
