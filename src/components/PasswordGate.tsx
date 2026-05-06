"use client";

import { useEffect } from "react";
import { identifyInvestor, trackEvent } from "@/lib/posthog";

const INVESTOR_KEY = "equals-data-room-investor";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Re-identify returning visitors from localStorage (for PostHog).
    // The investor name is stored in localStorage by the proxy login page
    // after a successful /api/auth call.
    const investor = localStorage.getItem(INVESTOR_KEY);
    if (investor) {
      identifyInvestor(investor);
      trackEvent("data_room_session_resumed", { investor });
    }
  }, []);

  // Auth gating is handled server-side by src/proxy.ts.
  // This component only provides PostHog identification for returning users.
  return <>{children}</>;
}
