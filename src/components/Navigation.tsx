"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop nav - fixed left sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-56 bg-background/90 backdrop-blur-xl border-r border-border/50 z-50 flex-col py-8 px-4">
        <Link href="/" className="mb-10 px-3">
          <img src="/equals-icon.svg" alt="Equals" className="h-[20px] w-auto" />
        </Link>
        <div className="flex flex-col gap-0.5 flex-1">
          {sections.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-left px-3 py-2 rounded-xl transition-all ${
                pathname === href
                  ? "text-foreground font-bold"
                  : "text-black/20 hover:text-foreground"
              }`}
              style={{ fontSize: "20px" }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="px-3 text-[11px] text-muted-foreground/60">
          Series A Data Room
        </div>
      </nav>

      {/* Mobile nav - top bar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-b border-border/50 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/">
            <img src="/equals-icon.svg" alt="Equals" className="h-[20px] w-auto" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {isOpen && (
          <div className="px-4 pb-4 flex flex-col gap-0.5 border-t border-border/50 pt-2">
            {sections.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-left px-3 py-2 rounded-xl transition-all ${
                  pathname === href
                    ? "text-foreground font-bold"
                    : "text-black/20 hover:text-foreground"
                }`}
                style={{ fontSize: "20px" }}
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
