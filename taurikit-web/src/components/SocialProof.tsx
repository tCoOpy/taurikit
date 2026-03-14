import { AnimateIn } from "./AnimateIn";

const STATS = [
  { value: "500+", label: "Projects generated" },
  { value: "4.9 ★", label: "Developer rating" },
  { value: "3", label: "Platforms supported" },
  { value: "0", label: "Compile warnings" },
];

export default function SocialProof() {
  return (
    <section className="py-12 border-y border-zinc-800/50 bg-zinc-900/20">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateIn>
          <dl className="flex flex-wrap items-center justify-center divide-x-0 md:divide-x md:divide-zinc-800 gap-y-8 md:gap-y-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-10 text-center">
                <dt className="text-3xl font-extrabold text-white">{stat.value}</dt>
                <dd className="text-sm text-zinc-500 mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </AnimateIn>
      </div>
    </section>
  );
}
