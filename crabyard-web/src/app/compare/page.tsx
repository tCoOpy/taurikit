import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";
import Link from "next/link";

const ROWS = [
  { feature: "Auth (GitHub OAuth)", crabyard: "Built-in, one flag", scratch: "2–4 days" },
  { feature: "Auth (Google OAuth PKCE)", crabyard: "Built-in, one flag", scratch: "3–5 days" },
  { feature: "Custom title bar", crabyard: "Included", scratch: "1–2 days" },
  { feature: "Settings system", crabyard: "Included", scratch: "1–2 days" },
  { feature: "Auto-updates", crabyard: "Included", scratch: "1–3 days" },
  { feature: "Theme switching", crabyard: "Included", scratch: "0.5–1 day" },
  { feature: "State management", crabyard: "Zustand pre-wired", scratch: "0.5–1 day" },
  { feature: "UI framework setup", crabyard: "Pick shadcn/daisyUI/tesign", scratch: "0.5–1 day" },
  { feature: "CI/CD release workflow", crabyard: "Included", scratch: "1–2 days" },
  { feature: "Cross-platform builds", crabyard: "Pre-configured", scratch: "1–2 days" },
  { feature: "Project structure", crabyard: "Best practices included", scratch: "Varies" },
  { feature: "Zero warnings guarantee", crabyard: "Every combination tested", scratch: "Ongoing effort" },
];

export default function ComparePage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24 px-6 min-h-screen">
        <AnimateIn className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Comparison
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Crabyard vs. building from scratch
          </h1>
          <p className="mt-4 text-zinc-400 text-lg font-light max-w-2xl mx-auto">
            See how much time you save when you start with a production-ready
            foundation instead of wiring everything manually.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1} className="max-w-4xl mx-auto">
          <div className="border border-zinc-800/60 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-zinc-900 border-b border-zinc-800/60">
              <div className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Feature
              </div>
              <div className="px-6 py-4 text-xs font-semibold text-brand-400 uppercase tracking-wider text-center">
                Crabyard
              </div>
              <div className="px-6 py-4 text-xs font-semibold text-zinc-600 uppercase tracking-wider text-center">
                From scratch
              </div>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${
                  i < ROWS.length - 1 ? "border-b border-zinc-800/40" : ""
                } hover:bg-zinc-900/40 transition-colors`}
              >
                <div className="px-6 py-4 text-sm text-zinc-300 font-medium">
                  {row.feature}
                </div>
                <div className="px-6 py-4 text-sm text-center">
                  <span className="inline-flex items-center gap-1.5 text-green-400 font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {row.crabyard}
                  </span>
                </div>
                <div className="px-6 py-4 text-sm text-center text-zinc-600">
                  {row.scratch}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-8">
              <div className="text-4xl font-extrabold text-brand-400 mb-2">~30 min</div>
              <div className="text-zinc-500 text-sm">
                Time to production-ready app with Crabyard
              </div>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-8">
              <div className="text-4xl font-extrabold text-zinc-600 mb-2">2–4 weeks</div>
              <div className="text-zinc-500 text-sm">
                Typical time building everything from scratch
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-1 transition-all active:scale-[0.98]"
            >
              Get Crabyard — $49
              <svg
                className="w-5 h-5"
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
            </Link>
            <p className="mt-4 text-sm text-zinc-600">
              One-time purchase. Unlimited projects. Free updates forever.
            </p>
          </div>
        </AnimateIn>
      </main>
      <Footer />
    </>
  );
}
