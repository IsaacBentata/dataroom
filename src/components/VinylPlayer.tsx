"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PLAYER_W = 393;
const PLAYER_H = 60;

type Track = { title: string; artist: string; cover: string; audio: string };

const DEFAULT_TRACK: Track = {
  title: "One More Time",
  artist: "Daft Punk",
  cover: "/player/discovery.jpg",
  audio: "/player/one-more-time.m4a",
};

// 5×3 grid; `null` = empty "+" slot, Track = playable tile.
const PICKER_GRID: (Track | null)[] = [
  { title: "NUEVAYoL", artist: "Bad Bunny", cover: "/player/bad-bunny-debi.png", audio: "/player/bad-bunny-nuevayol.m4a" },
  DEFAULT_TRACK,
  null,
  { title: "Dream On", artist: "Aerosmith", cover: "/player/aerosmith.jpeg", audio: "/player/aerosmith-dream-on.m4a" },
  { title: "Super Shy", artist: "NewJeans", cover: "/player/newjeans-super-shy.png", audio: "/player/newjeans-super-shy.m4a" },
  { title: "Supersonic", artist: "Oasis", cover: "/player/oasis-definitely-maybe.jpeg", audio: "/player/oasis-supersonic.m4a" },
  null,
  { title: "Too Cool To Be Careless", artist: "PAWSA", cover: "/player/pawsa-too-cool.jpeg", audio: "/player/pawsa-too-cool.m4a" },
  { title: "360", artist: "Charli XCX", cover: "/player/charli-xcx-brat.png", audio: "/player/charli-xcx-360.m4a" },
  null,
  { title: "Rottweiler", artist: "EsDeeKid", cover: "/player/rottweiler.jpeg", audio: "/player/rottweiler.m4a" },
  null,
  { title: "Rock That Body", artist: "The Black Eyed Peas", cover: "/player/bep-the-end.jpg", audio: "/player/bep-rock-that-body.m4a" },
  { title: "The Chain", artist: "Fleetwood Mac", cover: "/player/fleetwood-mac-rumours.jpeg", audio: "/player/fleetwood-mac-the-chain.m4a" },
  null,
];

const VISIT_KEY = "vinyl-visit-count";

export default function VinylPlayer({ pinnedBottomCenter = false }: { pinnedBottomCenter?: boolean } = {}) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [track, setTrack] = useState<Track>(DEFAULT_TRACK);

  // First-ever visit: keep Daft Punk and try to autoplay (browsers may block
  // if there's no user gesture). Every refresh after that: open with a random
  // non-Daft-Punk track from the picker grid.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let count = 0;
    try {
      count = parseInt(window.localStorage.getItem(VISIT_KEY) || "0", 10) || 0;
    } catch {}
    try {
      window.localStorage.setItem(VISIT_KEY, String(count + 1));
    } catch {}
    if (count === 0) {
      requestAnimationFrame(() => {
        const a = audioRef.current;
        if (!a) return;
        a.play().catch(() => {});
      });
    } else {
      const others = PICKER_GRID.filter(
        (t): t is Track => t !== null && t.audio !== DEFAULT_TRACK.audio,
      );
      if (others.length > 0) {
        setTrack(others[Math.floor(Math.random() * others.length)]);
      }
    }
  }, []);

  const pickTrack = (t: Track) => {
    setTrack(t);
    setPickerOpen(false);
    requestAnimationFrame(() => {
      const a = audioRef.current;
      if (!a) return;
      a.play().catch(() => setPlaying(false));
    });
  };

  // When a track ends, jump to a random different track and auto-play.
  // Gives a continuous "radio" feel: Daft Punk first, then random rotation.
  const advanceToRandomTrack = () => {
    const playable = PICKER_GRID.filter((x): x is Track => x !== null);
    const others = playable.filter((x) => x.audio !== track.audio);
    const next = others.length > 0
      ? others[Math.floor(Math.random() * others.length)]
      : playable[0];
    setTrack(next);
    requestAnimationFrame(() => {
      const a = audioRef.current;
      if (!a) return;
      a.play().catch(() => setPlaying(false));
    });
  };

  // Warm picker cover images on mount so the grid renders instantly on first open.
  // Fire HEAD-level <link rel=preload> hints into <head> for browser-priority
  // fetching, and also kick off Image() + decode() so the bitmaps are decoded
  // and ready for the picker's <img> tags to render synchronously.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const links: HTMLLinkElement[] = [];
    for (const entry of PICKER_GRID) {
      if (!entry || entry.cover === DEFAULT_TRACK.cover) continue;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = entry.cover;
      (link as HTMLLinkElement & { fetchPriority?: string }).fetchPriority = "high";
      document.head.appendChild(link);
      links.push(link);
      const img = new Image();
      (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
      img.src = entry.cover;
      void img.decode().catch(() => {});
    }
    return () => {
      for (const l of links) {
        if (l.parentNode) l.parentNode.removeChild(l);
      }
    };
  }, []);
  const dragOffset = useRef<{ dx: number; dy: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const albumBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const onDocPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (
        pickerRef.current && !pickerRef.current.contains(t) &&
        albumBtnRef.current && !albumBtnRef.current.contains(t)
      ) {
        setPickerOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

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
      // Snap to whichever of the 4 edges is closest to the player's center.
      setPos((prev) => {
        if (!prev) return prev;
        const margin = 24;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxX = Math.max(0, vw - PLAYER_W);
        const maxY = Math.max(0, vh - PLAYER_H);
        const centerX = prev.x + PLAYER_W / 2;
        const centerY = prev.y + PLAYER_H / 2;
        const distLeft = centerX;
        const distRight = vw - centerX;
        const distTop = centerY;
        const distBottom = vh - centerY;
        const min = Math.min(distLeft, distRight, distTop, distBottom);
        const clampedY = Math.max(margin, Math.min(maxY - margin, prev.y));
        const clampedX = Math.max(margin, Math.min(maxX - margin, prev.x));
        if (min === distLeft) {
          return { x: Math.min(margin, maxX), y: clampedY };
        }
        if (min === distRight) {
          return { x: Math.max(0, maxX - margin), y: clampedY };
        }
        if (min === distTop) {
          return { x: clampedX, y: Math.min(margin, maxY) };
        }
        return { x: clampedX, y: Math.max(0, maxY - margin) };
      });
      setSnapping(true);
      // Clear the snapping flag once the transition finishes so future
      // drags start without animation.
      window.setTimeout(() => setSnapping(false), 480);
    }
  };

  if (pinnedBottomCenter) {
    return (
      <div
        className="fixed z-50 flex flex-col items-start px-2 vinyl-player-enter"
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
          key={track.audio}
          src={track.audio}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={advanceToRandomTrack}
        />
        {pickerOpen && (
          <AlbumPicker
            pickerRef={pickerRef}
            anchorRef={pillRef}
            onPick={pickTrack}
          />
        )}
        <div
          ref={pillRef}
          className="relative flex w-full items-center justify-between rounded-[32px] bg-white pl-1 pr-3 py-1"
          style={{ boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}
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
            <button
              ref={albumBtnRef}
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Choose album"
              className="shrink-0 cursor-pointer p-0"
              style={{ background: "transparent", border: "none" }}
            >
              <img
                src={track.cover}
                alt={`${track.artist} — ${track.title}`}
                width={44}
                height={44}
                draggable={false}
                className="block rounded-[4px] object-cover"
                style={{ width: 44, height: 44, border: "0.5px solid rgba(0,0,0,0.05)" }}
              />
            </button>
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
              <p className="text-black truncate">{track.title}</p>
              <p className="truncate" style={{ color: "rgba(0,0,0,0.4)" }}>
                {track.artist}
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
      className="fixed z-50 flex flex-col items-start px-2 vinyl-player-enter"
      style={{
        width: PLAYER_W,
        left: pos?.x ?? 24,
        top: pos?.y ?? "auto",
        bottom: pos ? "auto" : 24,
        visibility: pos ? "visible" : "hidden",
        userSelect: "none",
        touchAction: "none",
        transition: snapping
          ? "left 460ms cubic-bezier(0.34, 1.56, 0.64, 1), top 460ms cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "none",
      }}
    >
      <audio
        ref={audioRef}
        key={track.audio}
        src={track.audio}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={advanceToRandomTrack}
      />
      {pickerOpen && (
        <AlbumPicker
          pickerRef={pickerRef}
          anchorRef={pillRef}
          onPick={pickTrack}
        />
      )}
      <div
        ref={pillRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative flex w-full items-center justify-between rounded-[32px] bg-white pl-1 pr-3 py-1"
        style={{
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
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

          {/* Album cover */}
          <button
            ref={albumBtnRef}
            type="button"
            data-no-drag
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setPickerOpen((v) => !v)}
            aria-label="Choose album"
            className="shrink-0 cursor-pointer p-0"
            style={{ background: "transparent", border: "none" }}
          >
            <img
              src={track.cover}
              alt={`${track.artist} — ${track.title}`}
              width={44}
              height={44}
              draggable={false}
              className="block rounded-[4px] object-cover"
              style={{
                width: 44,
                height: 44,
                border: "0.5px solid rgba(0,0,0,0.05)",
              }}
            />
          </button>

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
            <p className="text-black truncate">{track.title}</p>
            <p className="truncate" style={{ color: "rgba(0,0,0,0.4)" }}>
              {track.artist}
            </p>
          </div>
        </div>

        {/* Play / Pause button - won't initiate drag */}
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

function AlbumPicker({
  pickerRef,
  anchorRef,
  onPick,
}: {
  pickerRef: React.RefObject<HTMLDivElement | null>;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onPick: (track: Track) => void;
}) {
  const TILE = 42;
  const GAP = 3;
  const COLS = 5;
  const ROWS = 3;
  const width = COLS * TILE + (COLS - 1) * GAP;
  const height = ROWS * TILE + (ROWS - 1) * GAP;

  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

  // Position the picker above the pill anchor in viewport coordinates.
  // Tracked via getBoundingClientRect so it follows the pill while it's
  // dragged or the page scrolls.
  useLayoutEffect(() => {
    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCoords({ left: r.left + 4, top: r.top - 12 - height });
    };
    update();
    let raf = 0;
    const tick = () => {
      update();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef, height]);

  if (!coords || typeof document === "undefined") return null;

  // Portaled to body and rendered with NO stacking-context-creating styles
  // (no z-index, no transform, no opacity<1, no filter) so backdrop-filter
  // on each empty tile reaches the page content beneath.
  return createPortal(
    <div
      ref={pickerRef}
      role="dialog"
      aria-label="Choose album"
      style={{
        position: "fixed",
        left: coords.left,
        top: coords.top,
        width,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${TILE}px)`,
          gridAutoRows: `${TILE}px`,
          gap: GAP,
        }}
      >
        {PICKER_GRID.map((entry, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const delayMs = (row + col) * 18;
          const isEmpty = entry === null;
          // Figma: 17.82 / 118.8 = 0.15 of tile size
          const iconSize = Math.round(TILE * 0.15);
          return (
            <button
              key={i}
              type="button"
              onClick={() => { if (entry) onPick(entry); }}
              aria-label={isEmpty ? "Add album" : `${entry!.artist} — ${entry!.title}`}
              className="relative cursor-pointer p-0 overflow-hidden"
              style={{
                width: TILE,
                height: TILE,
                border: "none",
                borderRadius: 0,
                background: isEmpty ? "rgba(223,223,223,0.2)" : "#000",
                backdropFilter: isEmpty ? "blur(16.971px)" : undefined,
                WebkitBackdropFilter: isEmpty ? "blur(16.971px)" : undefined,
                animation: `album-tile-in 260ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delayMs}ms both`,
              }}
            >
              {isEmpty ? (
                <svg
                  width={iconSize}
                  height={iconSize}
                  viewBox="0 0 14 14"
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <path
                    d="M7 1 L7 13 M1 7 L13 7"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <img
                  src={entry.cover}
                  alt=""
                  draggable={false}
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  className="block object-cover"
                  style={{ width: TILE, height: TILE }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}
