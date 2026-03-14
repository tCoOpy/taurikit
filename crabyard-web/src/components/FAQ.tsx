"use client";

import { useState } from "react";
import { AnimateIn } from "./AnimateIn";

const QUESTIONS = [
  {
    q: "What do I get after purchase?",
    a: "You receive a license key via email. Use it with the Crabyard CLI to generate unlimited projects. You get the full source code — no obfuscation, no lock-in.",
  },
  {
    q: "Can I use it for commercial projects?",
    a: "Yes. The license covers personal and commercial use. Build and ship as many apps as you want.",
  },
  {
    q: "What if Tauri releases a new major version?",
    a: "Updates are free forever. When Tauri releases new versions, Crabyard templates will be updated accordingly.",
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
    a: "Crabyard generates cross-platform apps that run on Windows, macOS, and Linux. The CLI itself also runs on all three platforms.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 border-t border-zinc-800/40">
      <div className="max-w-3xl mx-auto">
        <AnimateIn className="text-center mb-14">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
            Frequently asked questions
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="space-y-3">
            {QUESTIONS.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl hover:border-zinc-700/80 transition-colors"
              >
                <button
                  className="flex items-center justify-between w-full p-6 text-left cursor-pointer"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-base font-medium text-zinc-100 pr-4">
                    {item.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 transition-all duration-200 ${
                      open === i
                        ? "bg-brand-500/15 text-brand-400 rotate-45"
                        : ""
                    }`}
                    aria-hidden
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                {open === i && (
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
