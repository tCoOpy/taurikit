import { AnimateIn } from "./AnimateIn";

const STEPS = [
  {
    num: "1",
    title: "Run the setup wizard",
    desc: "Installs the CLI and launches the interactive project wizard.",
    code: (
      <>
        <span className="text-zinc-600">$</span>
        <span className="text-zinc-300">
          {" "}
          curl -fsSL https://taurikit.dev/setup.sh | sh
        </span>
      </>
    ),
  },
  {
    num: "2",
    title: "Pick your stack",
    desc: "Choose your auth provider and UI framework. All combinations work perfectly.",
    code: (
      <>
        <span className="text-zinc-600">?</span>
        <span className="text-zinc-300"> Auth: </span>
        <span className="text-green-400">GitHub</span>
        <span className="text-zinc-600"> · </span>
        <span className="text-zinc-300">UI: </span>
        <span className="text-green-400">shadcn</span>
      </>
    ),
  },
  {
    num: "3",
    title: "Start building",
    desc: "Auth, settings, UI — all working. Focus on your app's unique features.",
    code: (
      <>
        <span className="text-zinc-600">$</span>
        <span className="text-zinc-300"> cd my-app </span>
        <span className="text-zinc-600">&&</span>
        <span className="text-brand-400"> bun</span>
        <span className="text-zinc-300"> run tauri dev</span>
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 border-t border-zinc-800/40">
      <div className="max-w-4xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
            From zero to running app in 3 steps
          </h2>
        </AnimateIn>

        <div className="relative space-y-0">
          <div className="absolute left-[23px] top-[40px] bottom-[40px] w-px bg-gradient-to-b from-brand-600/40 via-brand-500 to-brand-600/40 hidden sm:block" />

          {STEPS.map((step, i) => (
            <AnimateIn key={step.num} delay={i * 0.1} className="flex gap-6 sm:gap-8 items-start pb-14 last:pb-0">
              <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-brand-500/30 relative z-10 ring-4 ring-brand-500/10">
                {step.num}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">{step.title}</h3>
                <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl px-5 py-4 font-mono text-sm mt-3 shadow-lg">
                  {step.code}
                </div>
                <p className="text-zinc-500 text-sm mt-3">{step.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
