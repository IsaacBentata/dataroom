"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/", label: "Overview" },
  { href: "/product", label: "Product" },
  { href: "/growth", label: "Growth" },
  { href: "/retention", label: "Retention" },
  { href: "/demographics", label: "Demographics" },
  { href: "/music-industry", label: "Music Industry" },
  { href: "/monetisation", label: "Monetisation" },
  { href: "/ai", label: "AI Adoption" },
  { href: "/team", label: "Team" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/legal", label: "Legal" },
  { href: "/financials", label: "Financials" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop nav - fixed left sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-56 bg-background/80 backdrop-blur-xl border-r border-border z-50 flex-col py-8 px-4">
        <Link href="/" className="text-lg font-bold tracking-tight mb-8 px-3">
          EQUALS
        </Link>
        <div className="flex flex-col gap-0.5 flex-1">
          {sections.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                pathname === href
                  ? "bg-surface text-foreground font-medium"
                  : "text-foreground-secondary hover:text-foreground hover:bg-surface/50"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="px-3 text-xs text-foreground-secondary">
          Series A Data Room
        </div>
      </nav>

      {/* Mobile nav - top bar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-b border-border z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-bold tracking-tight">
            EQUALS
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground-secondary hover:text-foreground p-2 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="px-4 pb-4 flex flex-col gap-0.5 border-t border-border pt-2">
            {sections.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  pathname === href
                    ? "bg-surface text-foreground font-medium"
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
