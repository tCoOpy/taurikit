import { AnimateIn } from "./AnimateIn";

const FEATURES = [
  {
    title: "Settings System",
    description:
      "Persistent settings with Tauri plugin-store. Theme switching, workspace folder selection, and a clean settings UI — already built.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Custom Title Bar",
    description:
      "Native-feeling custom title bar with window controls, app menu, and user avatar. Works on Windows, macOS, and Linux.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Auto-Updates",
    description:
      "Built-in Tauri updater with download progress, version display, and one-click install. Ship updates seamlessly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    title: "One Command Setup",
    description:
      "Install the CLI, run crabyard new, answer a few prompts, and you&apos;re building. No manual wiring, no copy-paste.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Dark Mode",
    description:
      "Light and dark themes pre-configured with system preference detection. Theme toggle with persistent settings.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
  },
  {
    title: "Zero Warnings",
    description:
      "Every combination compiles with zero Rust warnings and zero TypeScript errors. CI/CD release workflow included.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-24 px-6 bg-zinc-950 noise overflow-hidden border-t border-white/10">
      <div
        className="absolute top-[-20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-brand-600/8 blur-[120px] pulse-glow pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-500/6 blur-[100px] float-slow pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimateIn className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
            And much more built in
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glow-card rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center text-brand-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
