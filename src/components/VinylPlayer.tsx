"use client";

import { useState } from "react";

export default function VinylPlayer() {
  const [playing, setPlaying] = useState(true);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-start px-2"
      style={{ width: 393 }}
    >
      <div
        className="flex w-full items-center justify-between rounded-[32px] bg-white pl-1 pr-3 py-1"
        style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }}
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

          {/* Album cover */}
          <div
            className="relative shrink-0 overflow-hidden rounded-[4px]"
            style={{
              width: 44,
              height: 44,
              border: "0.5px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, #2a2a2a 0%, #111 45%, #000 100%)",
              }}
            />
            {/* sphere highlight */}
            <div
              className="absolute"
              style={{
                left: "18%",
                top: "14%",
                width: "26%",
                height: "20%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(1px)",
              }}
            />
            {/* floor reflection */}
            <div
              className="absolute"
              style={{
                left: 0,
                right: 0,
                bottom: 0,
                height: "30%",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />
          </div>

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
            <p className="text-black truncate">きらり</p>
            <p className="truncate" style={{ color: "rgba(0,0,0,0.4)" }}>
              New Jeans
            </p>
          </div>
        </div>

        {/* Play / Pause button */}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="relative shrink-0 overflow-hidden flex items-center justify-center cursor-pointer"
          style={{ width: 32, height: 32, background: "transparent", border: "none" }}
        >
          {playing ? (
            // Pause icon: two black bars
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
              <rect x="11.33" y="9" width="3.34" height="14" rx="0.7" fill="#000" />
              <rect x="17.33" y="9" width="3.34" height="14" rx="0.7" fill="#000" />
            </svg>
          ) : (
            // Play icon: triangle
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
              <path d="M11 9.2 L23 16 L11 22.8 Z" fill="#000" />
            </svg>
          )}
        </button>
      </div>

    </div>
  );
}
