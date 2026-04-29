import AnimateText from "@/components/AnimateText";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <div data-page-header className="flex gap-8">
      <div style={{ flex: "0 0 50%" }}>
        <span className="inline-flex items-center gap-1 font-normal uppercase tracking-[0] mb-2 text-black" style={{ fontSize: "12px", fontFamily: "var(--font-fair-favorit-mono), monospace" }}>
          <span className="inline-block w-[10px] h-[10px] rounded-full bg-black" />
          {label}
        </span>
        <AnimateText
          as="h1"
          text={title}
          className="font-bold leading-[1.05] tracking-[-0.03em]" style={{ fontSize: "32px" }}
        />
      </div>
      {subtitle && (
        <div style={{ flex: "0 0 50%" }} className="flex items-start pt-[22px]">
          <AnimateText
            as="p"
            text={subtitle}
            className="text-black leading-[1.4]"
            style={{ fontFamily: "var(--font-fair-favorit-book), sans-serif", fontSize: "16px" }}
            staggerMs={35}
            delay={180}
          />
        </div>
      )}
    </div>
  );
}
