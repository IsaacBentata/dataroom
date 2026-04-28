"use client";

import { usePathname } from "next/navigation";
import PasswordGate from "@/components/PasswordGate";
import Navigation from "@/components/Navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <PasswordGate>
      {!isHome && <Navigation />}
      <main className={isHome ? "" : "lg:ml-56"}>
        {children}
      </main>
    </PasswordGate>
  );
}
