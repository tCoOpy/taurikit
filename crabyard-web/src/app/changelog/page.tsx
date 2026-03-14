import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";

const RELEASES = [
  {
    version: "1.5.3",
    date: "March 12, 2026",
    changes: [
      "Added tesign UI framework as third option alongside shadcn and daisyUI",
      "CLI: improved error messages for missing prerequisites",
      "Fixed Google OAuth PKCE redirect on Windows",
      "Updated Tauri to v2.5.1",
    ],
  },
  {
    version: "1.5.0",
    date: "February 28, 2026",
    changes: [
      "New: crabyard update-ui command to switch UI frameworks post-generation",
      "New: crabyard eject command to remove Crabyard overlay system",
      "Improved: Settings system now supports nested configuration objects",
      "Updated: React 19.1, Tailwind CSS v4.2",
    ],
  },
  {
    version: "1.4.0",
    date: "February 10, 2026",
    changes: [
      "New: crabyard doctor auto-installs missing prerequisites",
      "Added: Bun package manager auto-detection and install",
      "Improved: TUI progress display with animated crab mascot",
      "Fixed: stdin TTY fix for piped installs on Unix",
    ],
  },
  {
    version: "1.3.0",
    date: "January 20, 2026",
    changes: [
      "Added auto-update system with download progress and version display",
      "New: CI/CD release workflow template included in generated projects",
      "Improved: Token replacement now skips binary files correctly",
      "Fixed: Windows registry check for WebView2",
    ],
  },
  {
    version: "1.2.0",
    date: "January 5, 2026",
    changes: [
      "Initial public release",
      "Auth modules: GitHub Device Flow, Google PKCE Loopback, None",
      "UI modules: shadcn/ui, daisyUI",
      "CLI with interactive wizard, doctor checks, and TUI progress",
      "Cross-platform support: Windows, macOS, Linux",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="mb-16 text-center">
            <p className="text-brand-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Changelog
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
              What&apos;s new
            </h1>
            <p className="mt-4 text-zinc-400 font-light">
              Release history and updates for Crabyard.
            </p>
          </AnimateIn>

          <div className="space-y-10">
            {RELEASES.map((release, i) => (
              <AnimateIn key={release.version} delay={i * 0.05}>
                <div className="border border-zinc-800/60 rounded-2xl bg-zinc-900/40 p-7 hover:border-zinc-700/60 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-mono font-semibold">
                        v{release.version}
                      </span>
                      {i === 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                          Latest
                        </span>
                      )}
                    </div>
                    <time className="text-sm text-zinc-600 shrink-0">{release.date}</time>
                  </div>
                  <ul className="space-y-2.5">
                    {release.changes.map((change) => (
                      <li key={change} className="flex items-start gap-3 text-sm text-zinc-400">
                        <span className="text-brand-500/60 mt-0.5 shrink-0">—</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
