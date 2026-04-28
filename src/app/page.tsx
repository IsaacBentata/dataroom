"use client";

import Link from "next/link";

const navCards = [
  { href: "/product", label: "Product", description: "How the app works and why it matters" },
  { href: "/growth", label: "Growth", description: "MAU, DAU, and install metrics" },
  { href: "/retention", label: "Retention", description: "Retention curves and engagement data" },
  { href: "/demographics", label: "Demographics", description: "Gender, age, and geography data" },
  { href: "/music-industry", label: "Music Industry", description: "Label partnerships and strategy" },
  { href: "/monetisation", label: "Monetisation", description: "Revenue model and A/B test results" },
  { href: "/ai", label: "AI Adoption", description: "How AI multiplies a team of 9" },
  { href: "/team", label: "Team", description: "The people building Equals" },
  { href: "/roadmap", label: "Roadmap", description: "Where we are going" },
  { href: "/legal", label: "Legal", description: "Corporate structure and cap table" },
  { href: "/financials", label: "Financials", description: "Revenue and financial position" },
];

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-[-0.05em] mb-4">
          EQUALS
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          Data Room
        </p>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-20">
          The music social network uniting the world through its most universal language.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
          {navCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <div className="rounded-2xl border border-border/60 px-5 py-4 transition-all hover:bg-secondary/60 hover:border-border group">
                <div className="text-sm font-medium mb-1 group-hover:text-foreground transition-colors">{card.label}</div>
                <div className="text-xs text-muted-foreground">{card.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
