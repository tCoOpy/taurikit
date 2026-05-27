"use client";

import { useState } from "react";
import { AnimateIn } from "./AnimateIn";

const QUESTIONS = [
  {
    q: "What do I get?",
    a: "You get the Crabyard CLI, project templates, and full generated source code. Run the setup wizard to generate unlimited projects with no obfuscation or lock-in.",
  },
  {
    q: "Can I use it for commercial projects?",
    a: "Yes. Build and ship as many personal or commercial apps as you want.",
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
    <section className="py-24 px-4 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" aria-hidden />
      <div className="max-w-3xl mx-auto">
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="space-y-2">
            {QUESTIONS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-white/10">
                  <button
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium text-white/90 group-hover:text-brand-400 transition-colors pr-4">
                      {item.q}
                    </span>
                    <span
                      className={`ml-4 text-2xl text-white/40 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-6 text-white/60 leading-relaxed">
                      {item.a}
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
