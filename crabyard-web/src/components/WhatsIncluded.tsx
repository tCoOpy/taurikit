"use client";

import { AnimateIn } from "./AnimateIn";
import BrandMark from "./BrandMark";
import { useSplitReveal } from "@/hooks/useSplitReveal";

const ITEMS = [
  "Rust backend with Tauri v2",
  "React 19 + TypeScript frontend",
  "OAuth authentication (GitHub / Google / None)",
  "Persistent settings system",
  "Custom title bar with window controls",
  "Zustand state management",
  "Tailwind CSS v4 styling",
  "shadcn/ui, daisyUI, or tesign components",
  "Dark mode by default",
  "Clean project structure",
  "Auto-updates with progress tracking",
  "CI/CD-ready release workflow",
  "Zero warnings, zero dead code",
  "Cross-platform (Windows, macOS, Linux)",
];

export default function WhatsIncluded() {
  const h2Ref = useSplitReveal<HTMLHeadingElement>({ type: "chars", stagger: 0.02, y: 20 });
  return (
    <section className="relative py-28 px-6 border-t border-cyan-400/10 overflow-hidden">
      <div
        className="absolute top-20 left-1/3 w-[480px] h-[480px] rounded-full blur-[140px] bg-blue-600/6 pointer-events-none"
        aria-hidden
      />
      <div className="max-w-4xl mx-auto relative">
        <AnimateIn className="text-center mb-12">
          <h2
            ref={h2Ref}
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100"
            style={{ fontFamily: "var(--font-display), var(--font-inter), sans-serif" }}
          >
            What&apos;s in the box
          </h2>
          <p className="mt-3 text-zinc-400 text-lg font-light inline-flex items-center justify-center gap-1.5 flex-wrap">
            <span>Every</span>
            <BrandMark size={18} gap="0.12em" />
            <span>project includes:</span>
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-3">
            {ITEMS.map((item) => (
              <div
                key={item}
                data-cursor="hover"
                className="flex items-center gap-3 px-5 py-3.5 glass rounded-xl hover:border-cyan-400/25 hover:-translate-y-0.5 transition-all duration-200"
              >
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
                <span className="text-zinc-200 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
