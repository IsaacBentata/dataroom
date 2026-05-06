"use client";

import { usePathname } from "next/navigation";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      <main>
        {children}
      </main>
    </PasswordGate>
  );
}
