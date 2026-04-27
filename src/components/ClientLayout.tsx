"use client";

import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      <Navigation />
      <main className="lg:ml-56">
        {children}
      </main>
    </PasswordGate>
  );
}
