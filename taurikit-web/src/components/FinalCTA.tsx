import { AnimateIn } from "./AnimateIn";

export default function FinalCTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden border-t border-zinc-800/40">
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-[20%] left-[30%] w-[450px] h-[450px] rounded-full bg-brand-500/8 blur-[110px] pulse-glow pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <AnimateIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Ready to build?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg font-light">
            Stop wrestling with boilerplate. Get the starter kit trusted by Rust
            developers.
          </p>
          <a
            href="/#pricing"
            className="group inline-flex items-center gap-3 mt-8 px-10 py-4 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-xl font-bold text-lg shadow-2xl shadow-brand-500/25 hover:shadow-brand-500/45 hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            Get TauriKit — $49
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
          <p className="mt-4 text-sm text-zinc-600">
            One-time purchase. Unlimited projects. Free updates forever.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
