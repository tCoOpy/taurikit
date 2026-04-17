"use client";

import { useState } from "react";
import { AnimateIn } from "./AnimateIn";

const FEATURES = [
  "Full source code",
  "All auth providers",
  "All UI frameworks",
  "CLI generator",
  "Free updates forever",
  "Commercial use license",
];

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("https://api.crabyard.dev/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json()) as { url?: string };
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <section
      id="pricing"
      className="relative py-28 px-6 bg-zinc-950 noise overflow-hidden border-t border-white/10"
    >
      <div
        className="absolute top-[-25%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-600/12 blur-[120px] float-slow pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-[-20%] right-[5%] w-[400px] h-[400px] rounded-full bg-brand-500/8 blur-[100px] pulse-glow pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimateIn>
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Simple, one-time pricing
          </h2>
          <p className="text-zinc-400 text-lg mb-14 font-light">
            Pay once, use forever. No subscriptions. Free updates for life.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15} className="max-w-sm mx-auto">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 rounded-2xl blur-lg opacity-45" />
            <div className="relative gradient-border-card rounded-2xl bg-zinc-900 p-8">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-brand-500/30">
                  Lifetime access
                </span>
              </div>

              <div className="mt-4 mb-8">
                <span className="text-5xl font-extrabold text-white">$49</span>
                <span className="text-zinc-500 ml-1 text-lg">one-time</span>
              </div>

              <ul className="space-y-3.5 text-left mb-8">
                {FEATURES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-brand-500/15 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Redirecting…" : "Get Crabyard"}
              </button>

              <p className="mt-4 text-xs text-zinc-600">
                Secure checkout via Stripe · Instant license key delivery
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
