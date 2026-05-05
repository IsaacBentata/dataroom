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
};

const pageComponents: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(pageLoaders).map(([href, load]) => [
    href,
    dynamic(load, { ssr: false }),
  ]),
);

const ROW_H = 19; // 12px font × 160% line-height

// Browser autoplay policy: even muted videos can be blocked when our R3F
// video element is created inside a dynamically-imported chunk that mounts
// AFTER the click gesture window has expired. The fix: create the real
// feature video elements synchronously inside the click handler, start them
// playing under the live user gesture, and stash them on window so
// PhoneVideo3D's useScreenTexture can reuse them instead of creating new
// (unprimed) elements later.
const FEATURE_VIDEO_SRCS = [
  "/videos/feature-1.mp4",
  "/videos/feature-2.mp4",
  "/videos/feature-3.mp4",
  "/videos/feature-4.mp4",
  "/videos/feature-5.mp4",
];
let mediaPrimed = false;
function primeMediaAutoplay(href: string) {
  if (mediaPrimed) return;
  if (typeof document === "undefined") return;
  void href;
  const store: Record<string, HTMLVideoElement> = {};
  for (const src of FEATURE_VIDEO_SRCS) {
    const v = document.createElement("video");
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("loop", "");
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.loop = true;
    v.preload = "auto";
    // Keep videos in viewport (top-left corner, 1x1, invisible) - Safari
    // and some Chrome versions block autoplay for off-viewport videos
    // even when muted. opacity:0 + 1x1 keeps them visually invisible.
    v.style.cssText =
      "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1;";
    document.body.appendChild(v);
    v.src = src;
    // play() inside the click handler captures the user gesture for ALL
    // feature videos - they all stay primed and will be reused by
    // PhoneVideo3D's useScreenTexture when the texture for that src is needed.
    void v.play().catch(() => {});
    // Retry on metadata/canplay in case the initial play() raced the load.
    const retry = () => void v.play().catch(() => {});
    v.addEventListener("loadedmetadata", retry, { once: true });
    v.addEventListener("canplay", retry, { once: true });
    store[src] = v;
  }
  (window as unknown as { __primedFeatureVideos?: Record<string, HTMLVideoElement> }).__primedFeatureVideos = store;
  mediaPrimed = true;
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const wheelAccum = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const offset = Math.round((items.length - 1 - 2 * index) * (ROW_H / 2));
  const isPreviewing = previewIndex !== null;
  const PreviewComponent = isPreviewing
    ? pageComponents[items[previewIndex!].href]
    : null;

  if (isMobile) {
    return (
      <section className="fixed inset-0 overflow-hidden bg-background select-none flex items-center justify-center px-8">
        <p
          className="text-center text-foreground"
          style={{
            fontFamily: "var(--font-fair-favorit-mono), monospace",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "160%",
            letterSpacing: "0.24px",
            textTransform: "uppercase",
          }}
        >
          Please visit on your laptop
        </p>
        <VinylPlayer pinnedBottomCenter />
      </section>
    );
  }

  return (
    <section className="fixed inset-0 overflow-hidden bg-background select-none">
      {/* Menu - animates between centered and pinned-left */}
      <div
        className="absolute top-1/2 z-30"
        style={{
          left: isPreviewing ? "64px" : "50%",
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
            className="absolute right-full top-1/2 -translate-y-1/2 mr-4 flex items-center text-foreground bg-transparent border-0 p-0 enabled:cursor-pointer disabled:cursor-default"
          >
            <svg width="32" height="20" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="6" fill="currentColor" />
              <rect y="12" width="30" height="6" fill="currentColor" />
            </svg>
          </button>
          <ul
            className="flex flex-col items-start"
            style={{
              transform: `translateY(${offset}px)`,
              transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
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
                    // Warm up media autoplay using the live click gesture.
                    // We synchronously start a hidden muted video so the
                    // document is marked as having user-initiated media,
                    // making subsequent muted plays in PhoneVideo3D pass
                    // browser autoplay policy without a scroll/click.
                    primeMediaAutoplay(it.href);
                    setIndex(i);
                    setPreviewIndex(i);
                  }}
                  style={{
                    fontFamily: "var(--font-fair-favorit-mono), monospace",
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: "160%",
                    letterSpacing: "0.24px",
                    textTransform: "uppercase" as const,
                  }}
                  className={`flex items-center cursor-pointer transition-colors duration-200 ${
                    previewing || (selected && !isPreviewing)
                      ? "text-foreground"
                      : "text-foreground/15 hover:text-foreground/40"
                  }`}
                >
                  {previewing && <span style={{ marginRight: 6 }}>→</span>}
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

      {/* Full-page content panel - fills the right side, soft-blur entrance */}
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
