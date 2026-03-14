"use client";

import { useEffect, useRef } from "react";

const WORDS = ["minutes", "seconds", "5 steps"];

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const el = wordRef.current;
      if (!el) return;
      const word = WORDS[wordIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        timeoutId = setTimeout(tick, 120);
        return;
      }

      if (isDeleting) {
        charIndex--;
        el.textContent = word.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          timeoutId = setTimeout(tick, 350);
          return;
        }
        timeoutId = setTimeout(tick, 55);
      } else {
        charIndex++;
        el.textContent = word.substring(0, charIndex);
        if (charIndex === word.length) {
          isPaused = true;
          timeoutId = setTimeout(tick, 2200);
          return;
        }
        timeoutId = setTimeout(tick, 95);
      }
    }

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 noise dot-grid">
      {/* gradient blobs */}
      <div
        className="absolute top-[-15%] left-[-8%] w-[650px] h-[650px] rounded-full bg-brand-600/15 blur-[130px] float-slow pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-[-12%] right-[-8%] w-[550px] h-[550px] rounded-full bg-brand-500/12 blur-[110px] pulse-glow pointer-events-none"
        style={{ animationDelay: "-3s" }}
        aria-hidden
      />
      <div
        className="absolute top-[30%] right-[10%] w-[280px] h-[280px] rounded-full bg-brand-400/8 blur-[80px] pulse-glow pointer-events-none"
        style={{ animationDelay: "-1.5s" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 text-center flex flex-col items-center">
        {/* badge */}
        <div className="mb-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/8 backdrop-blur-sm text-brand-400 text-xs sm:text-sm font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Built for Tauri v2 + React + TypeScript
        </div>

        {/* headline */}
        <h1 className="text-5xl md:text-[72px] tracking-tight mb-5 leading-tight md:leading-none flex flex-col items-center gap-1 sm:gap-3">
          <span className="text-zinc-100 font-light">Ship desktop apps</span>
          <span className="font-extrabold flex items-center gap-2 sm:gap-3">
            <span className="text-zinc-100">in</span>
            <span
              ref={wordRef}
              className="bg-gradient-to-r from-brand-400 via-brand-500 to-brand-300 bg-clip-text text-transparent inline-block min-w-[3ch] text-left"
            />
            <span className="typing-cursor" />
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light px-2">
          A production-ready starter kit for Rust Tauri desktop apps. Auth,
          settings, UI components, auto-updates — all wired up. Pick your stack.
          Run one command. Start building.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="/#pricing"
            className="group px-8 py-3.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-xl font-bold text-lg inline-flex items-center gap-3 shadow-2xl shadow-brand-500/25 hover:shadow-brand-500/45 hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            Get Crabyard — $49
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="/#features"
            className="px-8 py-3.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-xl font-medium text-lg transition-all backdrop-blur-sm"
          >
            See what&apos;s included
          </a>
        </div>

        <p className="text-zinc-600 text-xs sm:text-sm font-medium mb-14">
          One-time purchase · Unlimited projects · Free updates forever
        </p>

        {/* terminal window */}
        <div className="relative max-w-3xl mx-auto w-full">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600/20 via-brand-500/10 to-brand-400/20 rounded-2xl blur-xl" />
          <div className="relative glass rounded-2xl p-6 text-left font-mono text-sm shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors" />
              <span className="ml-auto text-[10px] text-zinc-600 uppercase tracking-widest">
                terminal
              </span>
            </div>
            <div className="text-zinc-400">
              <span className="text-zinc-600">$</span>
              <span className="text-brand-400"> crabyard</span>
              <span className="text-zinc-300"> new</span>
              <span className="text-green-400"> &quot;My App&quot;</span>
              <span className="text-zinc-600"> --auth github --ui shadcn</span>
            </div>
            <div className="mt-3 space-y-1.5 text-zinc-500">
              <div>
                <span className="text-green-400/80">✓</span> Copied base template
              </div>
              <div>
                <span className="text-green-400/80">✓</span> Applied auth/github overlay
              </div>
              <div>
                <span className="text-green-400/80">✓</span> Applied ui/shadcn overlay
              </div>
              <div>
                <span className="text-green-400/80">✓</span> Installed 247 packages
              </div>
              <div className="text-green-400">✓ Project ready at ./my-app</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
