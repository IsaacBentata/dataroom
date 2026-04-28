"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CORRECT_PASSWORD = "equals2026";
const STORAGE_KEY = "equals-data-room-auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthenticated(localStorage.getItem(STORAGE_KEY) === "true");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecking(false);
  }, []);

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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-transparent border-0 ring-0 shadow-none">
        <CardContent>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight mb-3">EQUALS</h1>
            <p className="text-muted-foreground text-lg">Series A Data Room</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                autoFocus
                className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {error && (
              <p className="text-destructive text-sm">Incorrect password. Please try again.</p>
            )}
            <Button type="submit" className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background rounded-xl">
              Access Data Room
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-0 bg-transparent">
          <p className="text-muted-foreground text-xs text-center">
            This data room contains confidential information intended for prospective investors only.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
