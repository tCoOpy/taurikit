"use client";

import { useEffect, useRef } from "react";
import { AnimateIn } from "./AnimateIn";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const STEPS = [
  {
    num: "1",
    title: "Run the setup wizard",
    desc: "Installs the CLI and launches the interactive project wizard.",
    code: (
      <>
        <span className="text-zinc-500">$</span>
        <span className="text-zinc-200">
          {" "}
          curl -fsSL https://crabyard.dev/setup.sh | sh
        </span>
      </>
    ),
  },
  {
    num: "2",
    title: "Pick your stack",
    desc: "Choose your auth provider and UI framework. All combinations work perfectly.",
    code: (
      <>
        <span className="text-zinc-500">?</span>
        <span className="text-zinc-200"> Auth: </span>
        <span className="text-cyan-300">GitHub</span>
        <span className="text-zinc-500"> · </span>
        <span className="text-zinc-200">UI: </span>
        <span className="text-cyan-300">shadcn</span>
      </>
    ),
  },
  {
    num: "3",
    title: "Start building",
    desc: "Auth, settings, UI — all working. Focus on your app's unique features.",
    code: (
      <>
        <span className="text-zinc-500">$</span>
        <span className="text-zinc-200"> cd my-app </span>
        <span className="text-zinc-500">&&</span>
        <span className="text-cyan-300"> bun</span>
        <span className="text-zinc-200"> run tauri dev</span>
      </>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const h2Ref = useSplitReveal<HTMLHeadingElement>({ type: "chars", stagger: 0.02, y: 24 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    if (reduce || mobile) return;

    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-step-card]");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0.35, y: 40, scale: 0.96 });
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=80",
          end: () => `+=${cards.length * 600}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, idx) => {
        if (idx === 0) return;
        tl.to(cards[idx - 1], { opacity: 0.3, y: -30, scale: 0.95, duration: 1 }, idx)
          .to(card, { opacity: 1, y: 0, scale: 1, duration: 1 }, idx);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 border-t border-cyan-400/10 overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] bg-blue-500/8 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-10 w-[380px] h-[380px] rounded-full blur-[120px] bg-crab-500/8 pointer-events-none"
        aria-hidden
      />
      <div className="max-w-4xl mx-auto relative">
        <AnimateIn className="text-center mb-20">
          <p className="text-cyan-300 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            How it works
          </p>
          <h2
            ref={h2Ref}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100"
            style={{ fontFamily: "var(--font-display), var(--font-inter), sans-serif" }}
          >
            From zero to running app in 3 steps
          </h2>
        </AnimateIn>

        <div ref={trackRef} className="relative grid gap-8">
          <div
            className="hidden sm:block absolute left-[23px] top-[40px] bottom-[40px] w-px bg-gradient-to-b from-cyan-400/50 via-blue-500 to-crab-500/50"
            aria-hidden
          />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-step-card
              className="flex gap-6 sm:gap-8 items-start"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-cyan-500/30 relative z-10 ring-4 ring-cyan-400/10">
                {step.num}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">{step.title}</h3>
                <div className="gradient-border-card rounded-xl px-5 py-4 font-mono text-sm mt-3 shadow-lg">
                  {step.code}
                </div>
                <p className="text-zinc-400 text-sm mt-3">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
