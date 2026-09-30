import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Wordmark } from "@/components/Wordmark";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Barberly" },
      {
        name: "description",
        content:
          "Sign in or create your Barberly account as a customer or as a barber to start booking and listing appointments.",
      },
      { property: "og:title", content: "Sign in — Barberly" },
      {
        property: "og:description",
        content: "Create a Barberly account as a customer or a barber.",
      },
    ],
  }),
  component: LoginPage,
});

type Mode = "signup" | "signin";
type Role = "customer" | "shop";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signup");
  const [role, setRole] = useState<Role>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: "/barbers", replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/barbers", replace: true });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role },
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      navigate({ to: "/barbers", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Wordmark />
        <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Back to home
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col px-5 pb-20 pt-6 animate-fade-up">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
          <div className="mb-6 flex rounded-full bg-muted p-1 text-sm">
            {(["signup", "signin"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={`flex-1 rounded-full px-4 py-2 font-medium transition-colors ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "signup" ? "Sign Up" : "Sign In"}
              </button>
            ))}
          </div>

          <h1 className="text-3xl leading-tight">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signup"
              ? "Join Barberly as a customer or list your chair as a barber."
              : "Sign in to pick up where you left off."}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {mode === "signup" && (
              <div>
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  I am a
                </span>
                <div className="flex rounded-full border border-border bg-cream p-1 text-sm">
                  {(
                    [
                      { value: "customer", label: "Customer" },
                      { value: "shop", label: "Barber" },
                    ] as { value: Role; label: string }[]
                  ).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={role === option.value}
                      onClick={() => setRole(option.value)}
                      className={`flex-1 rounded-full px-4 py-2 font-medium transition-colors ${
                        role === option.value
                          ? "bg-card text-foreground shadow-card"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
