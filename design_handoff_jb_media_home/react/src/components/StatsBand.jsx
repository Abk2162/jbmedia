import React, { useEffect, useRef, useState } from "react";

const format = (value, kind) => {
  if (kind === "K") return Math.round(value / 1000) + "K";
  if (kind === "M") return (value / 1000000).toFixed(value < 2000000 ? 1 : 0) + "M";
  return String(Math.round(value));
};

/** Counter band — figures ease up once, when the band scrolls into view. */
export default function StatsBand({ stats }) {
  const ref = useRef(null);
  const [values, setValues] = useState(() => stats.map(() => 0));
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / 1600, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValues(stats.map((s) => s.value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stats]);

  return (
    <section ref={ref} className="w-full border-y border-gold-500/20 bg-dark-card/50 backdrop-blur-md relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gold-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-2 group p-4 rounded-xl hover:bg-white/[0.02] transition-colors"
            >
              {/* Animated Figure Number */}
              <div className="flex items-baseline font-anton text-5xl sm:text-6xl lg:text-7xl uppercase leading-none tracking-tight">
                <span className="bg-gold-gradient bg-clip-text text-transparent">
                  {format(values[i], stat.kind)}
                </span>
                <span className="text-gold-500/40 text-3xl sm:text-4xl ml-1 font-anton">
                  +
                </span>
              </div>

              {/* Gold Hairline Divider */}
              <div className="h-0.5 w-16 bg-gold-gradient my-1 group-hover:w-24 transition-all duration-300" />

              {/* Label */}
              <div className="font-barlow-condensed font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] text-foreground/75 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
