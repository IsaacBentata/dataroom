"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";
import { initPostHog } from "@/lib/posthog";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => { initPostHog(); }, []);

  return (
    <PasswordGate>
      <main>
        {children}
      </main>
    </PasswordGate>
  );
}
