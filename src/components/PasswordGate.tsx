"use client";

import { useEffect, useRef, useState } from "react";
import { identifyInvestor, trackEvent } from "@/lib/posthog";

// Each password maps to an investor name for tracking.
// Add new investors here.
const PASSWORDS: Record<string, string> = {
  Unitetheworld: "Internal",
  Mercia: "Mercia",
  Footwork: "Footwork",
  JamJar: "JamJar",
  FMC: "FMC",
  Thrive: "Thrive",
  SoftBank: "SoftBank",
  a16z: "a16z",
  Sequoia: "Sequoia",
  KP: "KP",
  Bessemer: "Bessemer",
  Breyer: "Breyer",
  Lightspeed: "Lightspeed",
  Tencent: "Tencent",
  Sony: "Sony",
  UMG: "UMG",
  Warner: "Warner",
  Goodwater: "Goodwater",
  Piton: "Piton",
  Balderton: "Balderton",
  Accel: "Accel",
  GoogleVentures: "Google Ventures",
};

const STORAGE_KEY = "equals-data-room-auth";
const INVESTOR_KEY = "equals-data-room-investor";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const authed = localStorage.getItem(STORAGE_KEY) === "true";
    const investor = localStorage.getItem(INVESTOR_KEY);
    setAuthenticated(authed);
    setChecking(false);

    // Re-identify returning visitors
    if (authed && investor) {
      identifyInvestor(investor);
      trackEvent("data_room_session_resumed", { investor });
    }
  }, []);

  useEffect(() => {
    if (!checking && !authenticated) inputRef.current?.focus();
  }, [checking, authenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const investor = PASSWORDS[password];
    if (investor) {
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(INVESTOR_KEY, investor);
      setAuthenticated(true);
      setError(false);
      identifyInvestor(investor);
      trackEvent("data_room_login", { investor });
    } else {
      setError(true);
      trackEvent("data_room_login_failed", { attempted_password: password });
    }
  };

  if (checking) {
    return <div className="min-h-screen bg-background" />;
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <section className="fixed inset-0 overflow-hidden bg-background select-none">
      <div
        className="absolute top-1/2 left-1/2 z-30"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="relative">
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            <input
              id="data-room-password"
              ref={inputRef}
              type="text"
              value={"=".repeat(password.length)}
              placeholder="Enter Password"
              onChange={(e) => {
                const next = e.target.value;
                if (next.length > password.length) {
                  const added = next.slice(password.length);
                  setPassword(password + added);
                } else {
                  setPassword(password.slice(0, next.length));
                }
                setError(false);
              }}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              className="password-gate-input"
              style={{
                fontFamily: "var(--font-fair-favorit-mono), monospace",
                fontWeight: 400,
                fontSize: 12,
                lineHeight: "160%",
                letterSpacing: "0.24px",
                textTransform: "uppercase",
                color: "var(--foreground)",
                background: "transparent",
                border: 0,
                outline: "none",
                padding: 0,
                margin: 0,
                width: 220,
                caretColor: "var(--foreground)",
              }}
            />
            {error && (
              <span
                key={password}
                className="password-gate-error"
                style={{
                  fontFamily: "var(--font-fair-favorit-mono), monospace",
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: "160%",
                  letterSpacing: "0.24px",
                  textTransform: "uppercase",
                  color: "rgba(0, 0, 0, 0.3)",
                  marginTop: 4,
                }}
              >
                Incorrect
              </span>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
