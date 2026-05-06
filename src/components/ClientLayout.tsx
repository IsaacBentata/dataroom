"use client";

import { useEffect, useState } from "react";
import PasswordGate from "@/components/PasswordGate";
import VinylPlayer from "@/components/VinylPlayer";
import { initPostHog } from "@/lib/posthog";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { initPostHog(); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <PasswordGate>
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
      </PasswordGate>
    );
  }

  return (
    <PasswordGate>
      <main>
        {children}
      </main>
    </PasswordGate>
  );
}
