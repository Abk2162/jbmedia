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
    <section ref={ref} className="w-full border-y border-gold-500/15 bg-dark-card/60 backdrop-blur-md relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-20 bg-gold-500/5 blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-7 sm:py-9">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-1.5 group py-1 px-2 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
            >
              {/* Animated Figure Number with pinned top-right superscript plus */}
              <div className="inline-flex items-start font-anton tracking-tight select-none">
                <span className="bg-gold-gradient bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-7xl leading-none">
                  {format(values[i], stat.kind)}
                </span>
                <sup className="text-gold-400/80 text-lg sm:text-2xl lg:text-3xl font-anton ml-0.5 mt-0.5 align-super leading-none">
                  +
                </sup>
              </div>

              {/* Sub-label Hierarchy */}
              <div className="font-barlow-condensed font-bold text-[11px] sm:text-sm lg:text-[15px] uppercase tracking-wider sm:tracking-[0.2em] text-foreground/85 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
