"use client";

import { useCallback, useEffect, useState } from "react";

const GLOBE_API_URL = process.env.NEXT_PUBLIC_GLOBE_API_URL || "https://dataroom-production-ac2b.up.railway.app/api/globe-rates";
// Hold the iframe src empty until the parent menu transition (700ms) settles.
// This keeps the heavy globe.html parse + texture decode off the transition's
// hot path, so the menu animation stays smooth.
const TRANSITION_HOLD_MS = 720;

export default function LiveContent() {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const finalSrc = GLOBE_API_URL
      ? `/equals-globe/globe.html?api=${encodeURIComponent(GLOBE_API_URL)}`
      : "/equals-globe/globe.html";
    const t = window.setTimeout(() => setSrc(finalSrc), TRANSITION_HOLD_MS);
    return () => window.clearTimeout(t);
  }, []);

  const onIframeLoad = useCallback((e: React.SyntheticEvent<HTMLIFrameElement>) => {
    setLoaded(true);
    // Pass API URL to the iframe
    try {
      const win = (e.target as HTMLIFrameElement).contentWindow;
      if (win && GLOBE_API_URL) {
        (win as unknown as { GLOBE_API_URL: string }).GLOBE_API_URL = GLOBE_API_URL;
      }
    } catch {}
  }, []);

  return (
    <div style={{ width: "calc(100% + 200px)", height: "100vh", marginLeft: "-200px", padding: 0, background: "transparent", position: "relative" }}>
      {!loaded && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-fair-favorit-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}>
            Loading...
          </span>
        </div>
      )}
      {src && (
        <iframe
          src={src}
          className="border-0"
          onLoad={onIframeLoad}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "transparent",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      )}
    </div>
  );
}
