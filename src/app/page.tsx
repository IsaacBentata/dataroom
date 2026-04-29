"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import VinylPlayer from "@/components/VinylPlayer";
import AnimateText from "@/components/AnimateText";
import ScrollReveal from "@/components/ScrollReveal";

const items = [
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

const pageLoaders: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "/product": () => import("./product/page"),
  "/growth": () => import("./growth/page"),
  "/retention": () => import("./retention/page"),
  "/demographics": () => import("./demographics/page"),
  "/music-industry": () => import("./music-industry/page"),
  "/monetisation": () => import("./monetisation/page"),
  "/ai": () => import("./ai/page"),
  "/team": () => import("./team/page"),
  "/roadmap": () => import("./roadmap/page"),
  "/legal": () => import("./legal/page"),
  "/financials": () => import("./financials/page"),
};

const pageComponents: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(pageLoaders).map(([href, load]) => [
    href,
    dynamic(load, { ssr: false }),
  ]),
);

const ROW_H = 22;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const wheelAccum = useRef(0);

  useEffect(() => {
    if (previewIndex !== null) return;
    const max = items.length - 1;
    const advanceBy = (delta: number) => {
      if (!delta) return;
      setIndex((i) => Math.max(0, Math.min(max, i + delta)));
    };

    const WHEEL_STEP = 40;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccum.current += e.deltaY;
      let steps = 0;
      while (wheelAccum.current >= WHEEL_STEP) {
        steps += 1;
        wheelAccum.current -= WHEEL_STEP;
      }
      while (wheelAccum.current <= -WHEEL_STEP) {
        steps -= 1;
        wheelAccum.current += WHEEL_STEP;
      }
      if (steps) advanceBy(steps);
    };

    let touchStartY = 0;
    let touchAccum = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchAccum = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0].clientY;
      touchAccum += touchStartY - y;
      touchStartY = y;
      let steps = 0;
      while (touchAccum > ROW_H) {
        steps += 1;
        touchAccum -= ROW_H;
      }
      while (touchAccum < -ROW_H) {
        steps -= 1;
        touchAccum += ROW_H;
      }
      if (steps) advanceBy(steps);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [previewIndex]);

  // Warm the inline-preview chunk on hover so the soft-blur entrance feels
  // instant; chart-heavy modules are only fetched after the user signals interest.
  const prefetched = useRef(new Set<string>());
  const prefetchOnHover = (href: string) => {
    if (prefetched.current.has(href)) return;
    prefetched.current.add(href);
    pageLoaders[href]?.();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setIndex((i) => Math.min(items.length - 1, i + 1));
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        setPreviewIndex(index);
      } else if (e.key === "Escape") {
        setPreviewIndex(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, previewIndex]);

  const offset = (items.length - 1 - 2 * index) * (ROW_H / 2);
  const isPreviewing = previewIndex !== null;
  const PreviewComponent = isPreviewing
    ? pageComponents[items[previewIndex!].href]
    : null;

  return (
    <section className="fixed inset-0 overflow-hidden bg-background select-none">
      {/* Menu — animates between centered and pinned-left */}
      <div
        className="absolute top-1/2 z-30"
        style={{
          left: isPreviewing ? "48px" : "50%",
          transform: isPreviewing
            ? "translate(0, -50%)"
            : "translate(-50%, -50%)",
          transition:
            "left 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="relative">
          <button
            type="button"
            aria-label={isPreviewing ? "Back to menu" : "EQUALS"}
            disabled={!isPreviewing}
            onClick={() => setPreviewIndex(null)}
            className="absolute right-full top-1/2 -translate-y-1/2 mr-5 flex items-center text-foreground bg-transparent border-0 p-0 enabled:cursor-pointer disabled:cursor-default"
          >
            <svg width="16" height="10" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="6" fill="currentColor" />
              <rect y="12" width="30" height="6" fill="currentColor" />
            </svg>
          </button>
          <ul
            className="flex flex-col items-start"
            style={{
              transform: `translateY(${offset}px)`,
              transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {items.map((it, i) => {
              const selected = i === index;
              const previewing = i === previewIndex;
              return (
                <li
                  key={it.href}
                  onMouseEnter={() => prefetchOnHover(it.href)}
                  onClick={() => {
                    setIndex(i);
                    setPreviewIndex(i);
                  }}
                  style={{
                    height: ROW_H,
                    fontFamily: "var(--font-fair-favorit-body), sans-serif",
                    fontWeight: previewing || (selected && !isPreviewing) ? 700 : 400,
                    fontSize: 12,
                    lineHeight: 1.2,
                    letterSpacing: "0.24px",
                  }}
                  className={`flex items-center cursor-pointer transition-colors duration-200 ${
                    previewing || (selected && !isPreviewing)
                      ? "text-foreground"
                      : "text-foreground/15 hover:text-foreground/40"
                  }`}
                >
                  <AnimateText
                    text={it.label}
                    triggerOnView={false}
                    delay={80 + i * 60}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Full-page content panel — fills the right side, soft-blur entrance */}
      {isPreviewing && PreviewComponent && (
        <div
          key={previewIndex}
          className="minimal-preview absolute inset-0 overflow-y-auto"
          style={{
            paddingLeft: "200px",
            contain: "layout paint style",
            animation: "preview-panel-fade 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <ScrollReveal>
            <PreviewComponent />
          </ScrollReveal>
        </div>
      )}


      <VinylPlayer />
    </section>
  );
}
