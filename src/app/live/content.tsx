"use client";

import { useCallback, useState } from "react";

const GLOBE_API_URL = process.env.NEXT_PUBLIC_GLOBE_API_URL || "https://dataroom-production-ac2b.up.railway.app/api/globe-rates";

export default function LiveContent() {
  const [loaded, setLoaded] = useState(false);

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

  const src = GLOBE_API_URL
    ? `/equals-globe/globe.html?api=${encodeURIComponent(GLOBE_API_URL)}`
    : "/equals-globe/globe.html";

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
    </div>
  );
}
