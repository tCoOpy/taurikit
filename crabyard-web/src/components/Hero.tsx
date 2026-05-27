"use client";

import { useEffect, useRef, useState } from "react";

const SETUP_COMMANDS = [
  {
    id: "unix",
    label: "macOS / Linux",
    command: "curl -fsSL https://crabyard.dev/setup.sh | sh",
  },
  {
    id: "windows",
    label: "Windows",
    command: "irm https://crabyard.dev/setup.ps1 | iex",
  },
] as const;

type PlatformId = (typeof SETUP_COMMANDS)[number]["id"];

const WORDS = ["minutes", "seconds", "5 steps"];

const TECH = [
  {
    name: "Rust",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 106 106" fill="currentColor">
        <path d="M53 0C23.7 0 0 23.7 0 53s23.7 53 53 53 53-23.7 53-53S82.3 0 53 0zm29.5 78.6c-1.4 2.4-4.5 3.2-6.9 1.8L53 66.9 30.4 80.4c-2.4 1.4-5.5.6-6.9-1.8-1.4-2.4-.6-5.5 1.8-6.9L47.8 58V32.7c0-2.8 2.3-5.1 5.1-5.1s5.1 2.3 5.1 5.1V58l22.5 13.6c2.5 1.5 3.3 4.6 1.9 7z" />
      </svg>
    ),
  },
  {
    name: "Tauri v2",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 4.86a8.25 8.25 0 00-14.28 0A8.25 8.25 0 002 12a8.25 8.25 0 001.64 4.94l.22.3 7.36 6.34a1 1 0 001.56 0l7.36-6.34.22-.3A8.25 8.25 0 0022 12a8.25 8.25 0 00-2.86-7.14zm-3.53 9.47L12 17.94l-3.61-3.61a5.1 5.1 0 117.22 0z" />
      </svg>
    ),
  },
  {
    name: "React 19",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.06-.84.175C4.39 2.22 3.75 4.343 4.38 7.3c-1.92.717-3.38 1.79-3.38 3.014 0 2.403 4.103 4.397 9.4 4.67V19h3.2v-4.017c5.297-.273 9.4-2.266 9.4-4.67 0-1.224-1.46-2.297-3.38-3.014.63-2.957-.01-5.08-1.882-5.79a1.88 1.88 0 00-.84-.176zM6.5 12.313c0-1.72 2.458-3.176 5.5-3.176s5.5 1.456 5.5 3.176c0 1.72-2.458 3.176-5.5 3.176S6.5 14.033 6.5 12.313z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375V9.938z" />
      </svg>
    ),
  },
  {
    name: "Tailwind v4",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>("unix");
  const selectedSetup =
    SETUP_COMMANDS.find((item) => item.id === selectedPlatform) ?? SETUP_COMMANDS[0];

  const selectPlatform = (platform: PlatformId) => {
    setSelectedPlatform(platform);
    setCopied(false);
  };

  const copySetupCommand = async () => {
    try {
      await navigator.clipboard.writeText(selectedSetup.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

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
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-36 sm:pt-44 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#071724] to-black" aria-hidden>
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[140px] animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-400/[0.04] rounded-full blur-[140px] animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
      </div>
      <div className="absolute inset-0 opacity-50 os-grid-mask pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
          <span className="inline-block">Ship desktop apps in</span>
          <br />
          <span className="inline-flex items-baseline gap-2 sm:gap-3">
            <span
              ref={wordRef}
              className="bg-gradient-to-r from-brand-400 via-brand-300 to-brand-400 bg-clip-text text-transparent animate-gradient inline-block min-w-[3ch] text-left"
            />
            <span className="typing-cursor text-brand-400" />
          </span>
          <br />
          <span className="inline-block text-white/90">with Crabyard.</span>
        </h1>

        <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-3 leading-relaxed font-light">
          A production-ready starter kit for Rust Tauri desktop apps. Auth,
          settings, UI components, auto-updates — all wired up.
        </p>
        <p className="text-sm text-white/30 max-w-2xl mx-auto mb-10 leading-relaxed">
          Pick your stack · Run one command · Start building
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="/#get-started"
            className="group px-8 py-3 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-xl font-bold text-base inline-flex items-center gap-3 shadow-2xl shadow-brand-500/25 hover:shadow-brand-500/45 hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            Get started free
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
            className="px-8 py-3 border border-white/15 hover:border-white/30 text-zinc-300 hover:text-white rounded-xl font-medium text-base transition-all backdrop-blur-sm"
          >
            See what&apos;s included
          </a>
        </div>

        <p className="text-white/30 text-xs sm:text-sm font-medium mb-10">
          Free to use · Unlimited projects · Free updates
        </p>

        <div className="mb-12 w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3 text-white/60">
            <svg className="w-4 h-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
            <span className="text-xs sm:text-sm">
              Install the CLI and start the setup wizard
            </span>
          </div>
          <div className="mb-3 inline-flex w-full sm:w-auto rounded-lg border border-white/10 bg-black/30 p-1">
            {SETUP_COMMANDS.map((item) => {
              const selected = selectedPlatform === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectPlatform(item.id)}
                  aria-pressed={selected}
                  className={`h-8 flex-1 sm:flex-none rounded-md px-4 text-xs font-semibold transition-colors ${
                    selected
                      ? "bg-brand-500/15 text-brand-300"
                      : "text-white/45 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-stretch rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm font-mono text-left shadow-lg">
            <code className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-zinc-300 overflow-x-auto whitespace-nowrap">
              {selectedSetup.command}
            </code>
            <button
              type="button"
              onClick={copySetupCommand}
              aria-label="Copy setup command"
              className="px-3 border-l border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="11" height="11" rx="2" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15V5a2 2 0 012-2h10" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mb-14 w-full">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mb-5">
            Built with battle-tested technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {TECH.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors"
              >
                {t.svg}
                <span className="text-sm font-semibold">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto w-full group">
          <div className="absolute -inset-8 bg-gradient-to-r from-brand-500/15 to-brand-300/15 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" aria-hidden />
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
          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-brand-500/50 rounded-tl-lg" aria-hidden />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-brand-500/50 rounded-tr-lg" aria-hidden />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-brand-500/50 rounded-bl-lg" aria-hidden />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-brand-500/50 rounded-br-lg" aria-hidden />
        </div>
      </div>
    </section>
  );
}
