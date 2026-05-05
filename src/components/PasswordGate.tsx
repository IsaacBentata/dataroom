"use client";

import { useEffect, useRef, useState } from "react";

const CORRECT_PASSWORD = "Unitetheworld";
const STORAGE_KEY = "equals-data-room-auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthenticated(localStorage.getItem(STORAGE_KEY) === "true");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!checking && !authenticated) inputRef.current?.focus();
  }, [checking, authenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
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
