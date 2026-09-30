import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Wordmark } from "@/components/Wordmark";

export const Route = createFileRoute("/_authenticated/barbers")({
  head: () => ({
    meta: [
      { title: "Your Barberly space" },
      {
        name: "description",
        content: "Your Barberly account home — browsing, booking and barber tools are on the way.",
      },
      { property: "og:title", content: "Your Barberly space" },
      {
        property: "og:description",
        content: "Your Barberly account home — browsing, booking and barber tools are on the way.",
      },
    ],
  }),
  component: BarbersShell,
});

function BarbersShell() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, []);

  const isBarber = user?.user_metadata?.["role"] === "shop";

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-cream/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <Wordmark />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Hi {user?.email ?? "…"}</span>
            {isBarber && (
              <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium tracking-wide text-accent-foreground">
                barber
              </span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-24 text-center animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-clay">
          {isBarber ? "Barber dashboard" : "Coming soon"}
        </p>
        <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">
          {isBarber ? "理髮師後台即將上線" : "附近的理髮師即將上線"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          {isBarber
            ? "下一個里程碑會加上個人檔案、服務項目與排班管理。 / Your barber dashboard is coming soon — profile, services & schedule arrive in the next milestone."
            : "下一個里程碑會加上瀏覽與預約功能。 / Barbers near you are coming soon — browse & booking arrive in the next milestone."}
        </p>
      </main>
    </div>
  );
}
