"use client";

import { useEffect, useState } from "react";

type TopVideo = {
  handle: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  url: string;
  thumb: string;
  video?: string;
  text: string;
  createTime: string | null;
};

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

const METRIC_KEYS = ["views", "likes", "shares", "comments"] as const;
type MetricKey = (typeof METRIC_KEYS)[number];
const METRIC_LABELS: Record<MetricKey, string> = {
  views: "VIEWS",
  likes: "LIKES",
  shares: "SHARES",
  comments: "COMMENTS",
};

export default function TopVideosCarousel() {
  const [videos, setVideos] = useState<TopVideo[]>([]);

  useEffect(() => {
    fetch("/tiktok/manifest.json")
      .then((r) => r.json())
      .then((data: TopVideo[]) => setVideos(data))
      .catch(() => setVideos([]));
  }, []);

  if (videos.length === 0) return null;

  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...videos, ...videos];

  return (
    <div
      className="relative overflow-hidden mt-8"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `tiktok-marquee ${videos.length * 6}s linear infinite`,
        }}
      >
        {loop.map((v, i) => (
          <div
            key={`${v.handle}-${i}`}
            className="relative shrink-0 w-[180px] aspect-[9/16] rounded-[14px] overflow-hidden"
            title={`@${v.handle} — ${formatViews(v.views)} views`}
          >
            {v.video ? (
              <video
                src={v.video}
                poster={v.thumb}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={v.thumb}
                alt={v.handle}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <TileTicker video={v} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TileTicker({ video }: { video: TopVideo }) {
  // Build a single ticker string of all engagement metrics, separated by ·.
  const parts = METRIC_KEYS.map(
    (k) => `${formatViews(video[k] ?? 0)} ${METRIC_LABELS[k]}`,
  );
  const ticker = parts.join("·");

  return (
    <div
      className="tile-ticker-text absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none"
      style={{
        height: 20,
        lineHeight: "20px",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        className="flex w-max whitespace-nowrap"
        style={{ animation: "tile-ticker 14s linear infinite" }}
      >
        <span className="px-3">{ticker}</span>
        <span className="px-3" aria-hidden>
          ·
        </span>
        <span className="px-3" aria-hidden>
          {ticker}
        </span>
        <span className="px-3" aria-hidden>
          ·
        </span>
      </div>
    </div>
  );
}

