"use client";

import { useEffect, useRef, useState, type ElementType, type CSSProperties } from "react";

type AnimateTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  staggerMs?: number;
  durationMs?: number;
  triggerOnView?: boolean;
};

export default function AnimateText({
  text,
  as: Tag = "span",
  className,
  style,
  delay = 0,
  staggerMs = 90,
  durationMs = 760,
  triggerOnView = true,
}: AnimateTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) return;
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && "matchMedia" in window) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnimate(true);
        return;
      }
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setAnimate(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerOnView]);

  const lines = text.split("\n");

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      aria-label={text}
      data-animate-text
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          className="anim-line"
          data-active={animate ? "1" : "0"}
          style={{
            animationDelay: `${delay + i * staggerMs}ms`,
            animationDuration: `${durationMs}ms`,
          }}
        >
          {line === "" ? " " : line}
        </span>
      ))}
    </Tag>
  );
}
