import React, { useEffect, useRef, useState } from "react";
import { Camera, Users, TrendingUp, Eye } from "lucide-react";

const STAT_ICONS = [Camera, Users, TrendingUp, Eye];
const STAT_TAGS = ["ARCHIVE", "COLLECTIVE", "COMMUNITY", "IMPRESSIONS"];

const format = (value, kind) => {
  if (kind === "K") return Math.round(value / 1000) + "K";
  if (kind === "M") return (value / 1000000).toFixed(value < 2000000 ? 1 : 0) + "M";
  return String(Math.round(value));
};

/** Counter band — luxury glassmorphic metrics bento with ambient glow. */
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stats]);

  return (
    <section
      ref={ref}
      className="w-full relative py-12 sm:py-16 bg-gradient-to-b from-[#0e0b08] via-[#0a0806] to-[#0e0b08] overflow-hidden border-y border-gold-500/20"
    >
      {/* Top and bottom luxury gold shimmer beams */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      {/* Central ambient glow spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-32 bg-gold-500/8 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-32 bg-amber-500/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header / Eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gold-500/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-barlow-condensed font-bold tracking-[0.25em] text-xs sm:text-sm uppercase text-gold-400/90">
              Impact & Footprint · 2025–26
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-foreground/40 font-barlow tracking-wider">
            <span>Verified Campus Metrics</span>
          </div>
        </div>

        {/* 4 Bento Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            const tag = STAT_TAGS[i % STAT_TAGS.length];

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-b from-white/[0.05] via-dark-card/70 to-dark-base/90 border border-gold-500/15 hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(212,162,46,0.12)] flex flex-col justify-between min-h-[190px]"
              >
                {/* Top golden accent line per card */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent group-hover:via-gold-400/80 transition-all duration-300" />

                {/* Subtle hover radial flare */}
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/25 transition-all duration-500 pointer-events-none" />

                {/* Card Top Row: Icon + Micro-tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300 shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-barlow-condensed font-semibold tracking-widest text-[11px] uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-foreground/60 group-hover:text-gold-300 group-hover:border-gold-500/30 transition-colors">
                    {tag}
                  </span>
                </div>

                {/* Number with Superscript Plus */}
                <div className="inline-flex items-start font-anton tracking-tight select-none my-1">
                  <span className="bg-gold-gradient bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-[64px] leading-none filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                    {format(values[i], stat.kind)}
                  </span>
                  <sup className="text-gold-400/90 text-2xl sm:text-3xl font-anton ml-1 mt-0.5 align-super leading-none">
                    +
                  </sup>
                </div>

                {/* Label & Description */}
                <div className="mt-2 pt-2 border-t border-white/[0.04]">
                  <div className="font-barlow-condensed font-bold text-sm sm:text-[15px] uppercase tracking-[0.14em] text-foreground/95 leading-tight group-hover:text-gold-200 transition-colors">
                    {stat.label}
                  </div>
                  {stat.sub && (
                    <div className="font-barlow text-xs text-foreground/50 mt-1 leading-snug">
                      {stat.sub}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
