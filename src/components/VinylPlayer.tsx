"use client";

import { useEffect, useRef, useState } from "react";

const PLAYER_W = 393;
const PLAYER_H = 60;

export default function VinylPlayer({ pinnedBottomCenter = false }: { pinnedBottomCenter?: boolean } = {}) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ dx: number; dy: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  };

  useEffect(() => {
    const place = () => {
      setPos((prev) => {
        if (prev) {
          // Keep within viewport on resize
          const maxX = Math.max(0, window.innerWidth - PLAYER_W);
          const maxY = Math.max(0, window.innerHeight - PLAYER_H);
          return {
            x: Math.min(prev.x, maxX),
            y: Math.min(prev.y, maxY),
          };
        }
        return {
          x: 24,
          y: Math.max(24, window.innerHeight - PLAYER_H - 24),
        };
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pos) return;
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragOffset.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const off = dragOffset.current;
    if (!off) return;
    const maxX = Math.max(0, window.innerWidth - PLAYER_W);
    const maxY = Math.max(0, window.innerHeight - PLAYER_H);
    setPos({
      x: Math.max(0, Math.min(maxX, e.clientX - off.dx)),
      y: Math.max(0, Math.min(maxY, e.clientY - off.dy)),
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragOffset.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      dragOffset.current = null;
      setDragging(false);
    }
  };

  if (pinnedBottomCenter) {
    return (
      <div
        className="fixed z-50 flex flex-col items-start px-2"
        style={{
          width: `min(${PLAYER_W}px, calc(100vw - 32px))`,
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          userSelect: "none",
        }}
      >
        <audio
          ref={audioRef}
          src="/player/one-more-time.m4a"
          preload="metadata"
          loop
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div
          className="flex w-full items-center justify-between rounded-[32px] bg-white pl-1 pr-3 py-1"
          style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }}
        >
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <div
              className="relative shrink-0 animate-[spin_3s_linear_infinite]"
              style={{
                width: 44,
                height: 44,
                transformOrigin: "50% 50%",
                willChange: "transform",
                animationPlayState: playing ? "running" : "paused",
              }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <circle cx="22" cy="22" r="22" fill="black" />
                <rect x="20" y="4" width="4" height="4" fill="white" />
                <rect x="20" y="36" width="4" height="4" fill="white" />
              </svg>
            </div>
            <img
              src="/player/discovery.jpg"
              alt="Daft Punk — Discovery"
              width={44}
              height={44}
              draggable={false}
              className="shrink-0 rounded-[4px] object-cover"
              style={{ width: 44, height: 44, border: "0.5px solid rgba(0,0,0,0.05)" }}
            />
            <div
              className="flex flex-1 flex-col gap-[2px] min-w-0"
              style={{
                fontFamily: "var(--font-fair-favorit-body), sans-serif",
                fontWeight: 700,
                fontSize: 12,
                lineHeight: 1.2,
                letterSpacing: "0.24px",
              }}
            >
              <p className="text-black truncate">One More Time</p>
              <p className="truncate" style={{ color: "rgba(0,0,0,0.4)" }}>
                Daft Punk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="relative shrink-0 overflow-hidden flex items-center justify-center cursor-pointer"
            style={{ width: 32, height: 32, background: "transparent", border: "none" }}
          >
            {playing ? (
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                <rect x="11.33" y="9" width="3.34" height="14" rx="0.7" fill="#000" />
                <rect x="17.33" y="9" width="3.34" height="14" rx="0.7" fill="#000" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
                <path d="M11 9.2 L23 16 L11 22.8 Z" fill="#000" />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed z-50 flex flex-col items-start px-2"
      style={{
        width: PLAYER_W,
        left: pos?.x ?? 24,
        top: pos?.y ?? "auto",
        bottom: pos ? "auto" : 24,
        visibility: pos ? "visible" : "hidden",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <audio
        ref={audioRef}
        src="/player/one-more-time.m4a"
        preload="metadata"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex w-full items-center justify-between rounded-[32px] bg-white pl-1 pr-3 py-1"
        style={{
          filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <div className="flex flex-1 items-center gap-2 min-w-0">
          {/* Vinyl record */}
          <div
            className="relative shrink-0 animate-[spin_3s_linear_infinite]"
            style={{
              width: 44,
              height: 44,
              transformOrigin: "50% 50%",
              willChange: "transform",
              animationPlayState: playing ? "running" : "paused",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="22" cy="22" r="22" fill="black" />
              <rect x="20" y="4" width="4" height="4" fill="white" />
              <rect x="20" y="36" width="4" height="4" fill="white" />
            </svg>
          </div>

          {/* Album cover — Daft Punk, Discovery */}
          <img
            src="/player/discovery.jpg"
            alt="Daft Punk — Discovery"
            width={44}
            height={44}
            draggable={false}
            className="shrink-0 rounded-[4px] object-cover"
            style={{
              width: 44,
              height: 44,
              border: "0.5px solid rgba(0,0,0,0.05)",
            }}
          />

          {/* Track text */}
          <div
            className="flex flex-1 flex-col gap-[2px] min-w-0"
            style={{
              fontFamily: "var(--font-fair-favorit-body), sans-serif",
              fontWeight: 700,
              fontSize: 12,
              lineHeight: 1.2,
              letterSpacing: "0.24px",
            }}
          >
            <p className="text-black truncate">One More Time</p>
            <p className="truncate" style={{ color: "rgba(0,0,0,0.4)" }}>
              Daft Punk
            </p>
          </div>
        </div>

        {/* Play / Pause button — won't initiate drag */}
        <button
          type="button"
          data-no-drag
          onClick={togglePlay}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={playing ? "Pause" : "Play"}
          className="relative shrink-0 overflow-hidden flex items-center justify-center cursor-pointer"
          style={{ width: 32, height: 32, background: "transparent", border: "none" }}
        >
          {playing ? (
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
              <rect x="11.33" y="9" width="3.34" height="14" rx="0.7" fill="#000" />
              <rect x="17.33" y="9" width="3.34" height="14" rx="0.7" fill="#000" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
              <path d="M11 9.2 L23 16 L11 22.8 Z" fill="#000" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
