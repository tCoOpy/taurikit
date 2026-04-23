"use client";

import { useState, type ReactNode } from "react";
import { AnimateIn } from "./AnimateIn";
import BrandMark from "./BrandMark";
import { useSplitReveal } from "@/hooks/useSplitReveal";

const InlineBrand = () => <BrandMark size={16} gap="0.12em" yardClassName="text-zinc-200" />;

const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "What do I get after purchase?",
    a: (
      <>
        You receive a license key via email. Use it with the <InlineBrand /> CLI to
        generate unlimited projects. You get the full source code — no obfuscation, no
        lock-in.
      </>
    ),
  },
  {
    q: "Can I use it for commercial projects?",
    a: "Yes. The license covers personal and commercial use. Build and ship as many apps as you want.",
  },
  {
    q: "What if Tauri releases a new major version?",
    a: (
      <>
        Updates are free forever. When Tauri releases new versions, <InlineBrand /> templates
        will be updated accordingly.
      </>
    ),
  },
  {
    q: "Do I need Rust experience?",
    a: "Basic Rust knowledge helps, but the generated code is well-structured and documented. Most of your day-to-day work will be in the React/TypeScript frontend.",
  },
  {
    q: "Can I switch UI frameworks after generating?",
    a: "Yes. Run crabyard update-ui in your project directory to swap between shadcn/ui, daisyUI, or tesign at any time.",
  },
  {
    q: "What platforms are supported?",
    a: (
      <>
        <InlineBrand /> generates cross-platform apps that run on Windows, macOS, and
        Linux. The CLI itself also runs on all three platforms.
      </>
    ),
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const h2Ref = useSplitReveal<HTMLHeadingElement>({ type: "chars", stagger: 0.018, y: 20 });

  return (
    <section className="relative py-28 px-4 bg-abyss-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" aria-hidden />
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[380px] h-[380px] rounded-full blur-[130px] bg-crab-500/5 pointer-events-none"
        aria-hidden
      />
      <div className="max-w-3xl mx-auto relative">
        <AnimateIn className="text-center mb-14">
          <h2
            ref={h2Ref}
            className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-display), var(--font-inter), sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="space-y-2">
            {QUESTIONS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-cyan-400/10 group">
                  <button
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-cursor="hover"
                  >
                    <span className="text-lg font-medium text-white/90 group-hover:text-cyan-300 transition-colors pr-4">
                      {item.q}
                    </span>
                    <span
                      className={`btn-glass-ghost ml-4 w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                        isOpen ? "rotate-45 text-crab-300" : "text-cyan-300"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="pb-6 text-zinc-300 leading-relaxed">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
