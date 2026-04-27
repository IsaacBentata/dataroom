"use client";

import Link from "next/link";

const navCards = [
  { href: "/product", label: "Product", description: "How the app works and why it matters", color: "border-accent-blue/30 hover:border-accent-blue/60" },
  { href: "/growth", label: "Growth", description: "MAU, DAU, and install metrics", color: "border-accent-green/30 hover:border-accent-green/60" },
  { href: "/retention", label: "Retention", description: "Retention curves and engagement data", color: "border-accent-purple/30 hover:border-accent-purple/60" },
  { href: "/demographics", label: "Demographics", description: "Gender, age, and geography data", color: "border-accent-green/30 hover:border-accent-green/60" },
  { href: "/music-industry", label: "Music Industry", description: "Label partnerships and strategy", color: "border-accent-orange/30 hover:border-accent-orange/60" },
  { href: "/monetisation", label: "Monetisation", description: "Revenue model and A/B test results", color: "border-accent-blue/30 hover:border-accent-blue/60" },
  { href: "/ai", label: "AI Adoption", description: "How AI multiplies a team of 9", color: "border-accent-purple/30 hover:border-accent-purple/60" },
  { href: "/team", label: "Team", description: "The people building Equals", color: "border-accent-green/30 hover:border-accent-green/60" },
  { href: "/roadmap", label: "Roadmap", description: "Where we are going", color: "border-accent-purple/30 hover:border-accent-purple/60" },
  { href: "/legal", label: "Legal", description: "Corporate structure and cap table", color: "border-accent-orange/30 hover:border-accent-orange/60" },
  { href: "/financials", label: "Financials", description: "Revenue and financial position", color: "border-accent-blue/30 hover:border-accent-blue/60" },
];

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-accent-purple/5 to-accent-orange/5 animate-gradient" />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
          EQUALS
        </h1>
        <p className="text-lg md:text-xl text-foreground-secondary mb-2">
          Data Room
        </p>
        <p className="text-foreground-secondary text-sm max-w-md mx-auto mb-16">
          The music social network uniting the world through its most universal language.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`bg-surface/60 backdrop-blur-sm rounded-xl border ${card.color} p-4 transition-all hover:bg-surface group`}
            >
              <div className="text-sm font-medium mb-1 group-hover:text-foreground transition-colors">{card.label}</div>
              <div className="text-xs text-foreground-secondary">{card.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
