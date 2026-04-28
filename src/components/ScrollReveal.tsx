"use client";

import { useEffect, useRef } from "react";

const CONTAINER_SELECTOR =
  ".max-w-5xl, .max-w-4xl, .max-w-3xl, .max-w-6xl, [data-reveal-root]";

const NESTED_GROUP_SELECTOR = [
  '[class*="space-y-"]',
  '[class*="grid-cols-"]',
  '[class*="flex-col"]',
].join(",");

function shouldSkip(el: HTMLElement): boolean {
  if (el.closest("[data-animate-text]")) return false;
  if (el.querySelector("[data-animate-text]")) return false;
  return false;
}

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof window !== "undefined" && "matchMedia" in window) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const collectTargets = (): HTMLElement[] => {
      const containers = Array.from(root.querySelectorAll<HTMLElement>(CONTAINER_SELECTOR));
      const outs: HTMLElement[] = [];

      const expand = (parent: HTMLElement) => {
        const kids = Array.from(parent.children) as HTMLElement[];
        for (const kid of kids) {
          if (kid.classList.contains("reveal-block")) continue;
          if (shouldSkip(kid)) continue;
          // If kid is a layout group (grid/space-y/flex-col), recurse one level
          if (kid.matches(NESTED_GROUP_SELECTOR) && kid.children.length > 1) {
            expand(kid);
          } else {
            outs.push(kid);
          }
        }
      };

      if (containers.length === 0) {
        // Fallback: use direct children of the root
        expand(root);
      } else {
        for (const c of containers) expand(c);
      }
      return outs;
    };

    const mark = () => {
      const targets = collectTargets();
      const fresh: HTMLElement[] = [];
      for (const el of targets) {
        if (el.classList.contains("reveal-block")) continue;
        el.classList.add("reveal-block");
        const siblings = Array.from(el.parentElement?.children ?? []) as HTMLElement[];
        const idx = siblings.indexOf(el);
        if (idx > 0) {
          el.style.animationDelay = `${Math.min(idx * 60, 240)}ms`;
        }
        fresh.push(el);
      }
      if (fresh.length === 0) return;
      // Force one paint of the hidden state before observing, so the animation
      // actually plays for elements already in the viewport.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          for (const el of fresh) obs.observe(el);
        });
      });
    };

    // First pass after a microtask so the DOM has settled
    queueMicrotask(mark);

    const mo = new MutationObserver(() => mark());
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mo.disconnect();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
