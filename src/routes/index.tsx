import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  ShieldCheck,
  Sparkles,
  Search,
  Star,
} from "lucide-react";
import heroLeft from "@/assets/hero-left.jpg";
import heroRight from "@/assets/hero-right.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";
import barber4 from "@/assets/barber-4.jpg";
import { Wordmark } from "@/components/Wordmark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barberly — Book a barber you'll actually love" },
      {
        name: "description",
        content:
          "Barberly is a booking marketplace for barbers and hair stylists. Find a verified stylist for a cut, color, perm or beard trim and book your slot in a few taps.",
      },
      { property: "og:title", content: "Barberly — Book a barber you'll actually love" },
      {
        property: "og:description",
        content:
          "Find a verified barber or stylist near you and book a cut, color, perm or beard trim in a few taps.",
      },
    ],
  }),
  component: Landing,
});

const FILTERS = ["All", "Cut", "Color", "Perm", "Beard"] as const;

const FEATURES = [
  { icon: BadgeCheck, label: "Verified Barbers" },
  { icon: CalendarClock, label: "Instant Booking" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Sparkles, label: "Top-Rated Styles" },
];

const BARBERS = [
  {
    name: "Marco Vitale",
    shop: "Vitale & Co · SoHo, New York",
    image: barber1,
    services: ["Cut", "Beard"],
    rating: 4.9,
    reviews: 214,
    from: 38,
  },
  {
    name: "Elena Moretti",
    shop: "Studio Moretti · Shoreditch, London",
    image: barber2,
    services: ["Cut", "Color", "Perm"],
    rating: 4.8,
    reviews: 178,
    from: 52,
  },
  {
    name: "Andre Silva",
    shop: "Fade Lab · Da'an, Taipei",
    image: barber3,
    services: ["Cut", "Beard"],
    rating: 4.9,
    reviews: 132,
    from: 26,
  },
  {
    name: "Nina Larsen",
    shop: "Larsen Hair · Vesterbro, Copenhagen",
    image: barber4,
    services: ["Color", "Cut"],
    rating: 5.0,
    reviews: 96,
    from: 64,
  },
];

const PARTNERS = ["AVENIR", "LUMEN SALON", "NORDHAIR", "MAISON CRÈME", "ATELIER 9"];

function Landing() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <Wordmark />
          <div className="relative ml-auto hidden max-w-xs flex-1 items-center sm:flex">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search barbers"
              placeholder="Search"
              className="w-full rounded-full border border-input bg-cream/70 py-2.5 pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>
          <Link
            to="/login"
            className="ml-auto rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:ml-0"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.35fr_1fr]">
          <div className="order-2 overflow-hidden rounded-[2rem] lg:order-1 animate-fade-in">
            <img
              src={heroLeft}
              alt="Woman with glossy, voluminous styled hair"
              width={736}
              height={912}
              className="h-48 w-full object-cover object-center sm:h-72 lg:h-[26rem]"
            />
          </div>

          <div className="order-1 text-center lg:order-2 animate-fade-up">
            <span className="inline-block rounded-full border border-border bg-cream px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-clay">
              New Look
            </span>
            <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl">
              Style with
              <br />
              Confident Hair
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-sm text-muted-foreground">
              Discover a barber or stylist you trust, then book your chair in a few taps.
            </p>

            <div className="relative mx-auto mt-8 max-w-md">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                aria-label="Find your stylist or search a style"
                placeholder="Find your stylist or search a style"
                className="w-full rounded-full border border-input bg-card py-4 pl-12 pr-5 text-sm shadow-card outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    activeFilter === filter
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="order-3 overflow-hidden rounded-[2rem] animate-fade-in animate-delay-200">
            <img
              src={heroRight}
              alt="Man with a sharp fresh barber haircut and groomed beard"
              width={736}
              height={912}
              loading="lazy"
              className="h-48 w-full object-cover object-center sm:h-72 lg:h-[26rem]"
            />
          </div>
        </div>
      </section>

      {/* Trust logo strip */}
      <section aria-label="Partner salons" className="border-y border-border bg-cream/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 py-7">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="font-display text-sm tracking-[0.28em] text-muted-foreground"
            >
              {partner}
            </span>
          ))}
        </div>
      </section>

      {/* Feature row */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-3xl sm:text-4xl">Best booking experience</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-3xl border border-border bg-card p-7 text-center shadow-card"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sand">
                <Icon className="h-5 w-5 text-accent-foreground" strokeWidth={1.6} />
              </span>
              <p className="mt-4 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular grid */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <h2 className="text-3xl sm:text-4xl">Popular</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Barbers and stylists our customers keep coming back to.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BARBERS.map((barber) => (
            <Link
              key={barber.name}
              to="/login"
              className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative">
                <img
                  src={barber.image}
                  alt={`${barber.name}, barber at ${barber.shop}`}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
                  Popular
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl">{barber.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{barber.shop}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {barber.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-cream px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-clay text-clay" />
                    <span className="font-medium text-foreground">{barber.rating}</span>(
                    {barber.reviews})
                  </span>
                  <span className="text-sm font-medium">from ${barber.from}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-cream/60">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center text-xs text-muted-foreground">
          © 2026 Barberly
        </div>
      </footer>
    </div>
  );
}
