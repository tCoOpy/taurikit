import { AnimateIn } from "./AnimateIn";

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
  return (
    <section className="py-24 px-6 border-t border-zinc-800/40">
      <div className="max-w-4xl mx-auto">
        <AnimateIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
            What&apos;s in the box
          </h2>
          <p className="mt-3 text-zinc-500 text-lg font-light">
            Every Crabyard project includes:
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-3">
            {ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-5 py-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800/50 hover:border-brand-500/20 hover:bg-zinc-900 transition-all duration-200"
              >
                <span className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-3 h-3 text-green-400"
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
                <span className="text-zinc-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
