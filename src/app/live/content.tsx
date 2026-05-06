"use client";

import { useCallback, useState } from "react";

const GLOBE_API_URL = process.env.NEXT_PUBLIC_GLOBE_API_URL || "";

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
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0, background: "#ffffff" }}>
      <iframe
        src={src}
        className="border-0"
        onLoad={onIframeLoad}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
      />
    </div>
  );
}
