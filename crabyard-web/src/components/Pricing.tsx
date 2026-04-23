"use client";

import { useState } from "react";
import { AnimateIn } from "./AnimateIn";
import MagneticButton from "./MagneticButton";
import BrandMark from "./BrandMark";
import { useSplitReveal } from "@/hooks/useSplitReveal";

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
  const h2Ref = useSplitReveal<HTMLHeadingElement>({ type: "chars", stagger: 0.018, y: 24 });

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
      className="relative py-28 px-6 bg-abyss-950 noise overflow-hidden border-t border-cyan-400/10"
    >
      <div
        className="absolute top-[-25%] left-[10%] w-[560px] h-[560px] rounded-full bg-blue-600/12 blur-[130px] float-slow pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-[-20%] right-[5%] w-[460px] h-[460px] rounded-full bg-crab-500/10 blur-[120px] pulse-glow pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimateIn>
          <p className="text-cyan-300 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Pricing
          </p>
          <h2
            ref={h2Ref}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-display), var(--font-inter), sans-serif" }}
          >
            Simple, one-time pricing
          </h2>
          <p className="text-zinc-400 text-lg mb-14 font-light">
            Pay once, use forever. No subscriptions. Free updates for life.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15} className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-brand rounded-2xl blur-xl opacity-50 animate-pulse" style={{ animationDuration: "4s" }} />
            <div className="relative gradient-border-card rounded-2xl bg-abyss-900 p-8">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-brand text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/30">
                  Lifetime access
                </span>
              </div>

              <div className="mt-4 mb-8">
                <span className="text-6xl font-extrabold text-gradient-brand animate-gradient">$49</span>
                <span className="text-zinc-400 ml-2 text-lg">one-time</span>
              </div>

              <ul className="space-y-3.5 text-left mb-8">
                {FEATURES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-200">
                    <span className="w-5 h-5 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-cyan-300"
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

              <MagneticButton strength={0.2} as="div">
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  data-cursor="hover"
                  aria-label="Get Blue Crab Yard"
                  className="btn-glass w-full px-6 py-5 rounded-xl font-bold text-xl whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <span>Redirecting…</span>
                  ) : (
                    <>
                      <span>Get</span>
                      <BrandMark size={32} gap="0.22em" />
                    </>
                  )}
                </button>
              </MagneticButton>

              <p className="mt-4 text-xs text-zinc-500">
                Secure checkout via Stripe · Instant license key delivery
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
