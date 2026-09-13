import React, { useEffect, useRef, useState } from "react";
import { Camera, Users, TrendingUp, Eye } from "lucide-react";

const STAT_CONFIG = [
  {
    icon: Camera,
    tag: "CAMPUS ARCHIVE",
    growth: "+28% YoY",
    progress: "88%",
    watermark: "01",
    accent: "from-amber-500/20 via-gold-500/10 to-transparent"
  },
  {
    icon: Users,
    tag: "CREATIVE GUILD",
    growth: "100% Student-Led",
    progress: "94%",
    watermark: "02",
    accent: "from-gold-500/20 via-amber-400/10 to-transparent"
  },
  {
    icon: TrendingUp,
    tag: "SOCIAL REACH",
    growth: "+62% Growth",
    progress: "82%",
    watermark: "03",
    accent: "from-yellow-500/20 via-gold-500/10 to-transparent"
  },
  {
    icon: Eye,
    tag: "TOTAL AUDIENCE",
    growth: "Viral Reach",
    progress: "98%",
    watermark: "04",
    accent: "from-amber-400/20 via-gold-600/10 to-transparent"
  }
];

const format = (value, kind) => {
  if (kind === "K") return Math.round(value / 1000) + "K";
  if (kind === "M") return (value / 1000000).toFixed(value < 2000000 ? 1 : 0) + "M";
  return String(Math.round(value));
};

/** Counter band — high-voltage luxury glassmorphic metrics bento with mouse spotlight. */
export default function StatsBand({ stats }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
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

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group/band w-full relative py-14 sm:py-20 bg-gradient-to-b from-[#0e0b08] via-[#090705] to-[#0e0b08] overflow-hidden border-y border-gold-500/25"
    >
      {/* Background Subtle Tech Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#f5c542 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/band:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 197, 66, 0.12), transparent 50%)"
        }}
      />

      {/* Top & Bottom Shimmer Laser Beams */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent shadow-[0_0_12px_rgba(245,197,66,0.5)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent shadow-[0_0_10px_rgba(245,197,66,0.3)]" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* 4 Bento Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => {
            const config = STAT_CONFIG[i % STAT_CONFIG.length];
            const Icon = config.icon;

            return (
              <div
                key={stat.label}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-gold-400/30 via-gold-500/10 to-white/[0.03] hover:from-gold-400/55 hover:via-gold-500/20 hover:to-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
              >
                {/* Inner Card Container */}
                <div className="relative h-full overflow-hidden rounded-[15px] p-6 bg-gradient-to-b from-[#17120d] via-[#100d0a] to-[#0a0806] flex flex-col justify-between min-h-[225px]">
                  {/* Subtle top edge glow beam */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent group-hover:via-gold-300/80 transition-all duration-300" />

                  {/* Giant Ghost Watermark Number in Background */}
                  <span className="font-anton text-8xl tracking-tighter text-white/[0.025] group-hover:text-gold-400/[0.07] transition-colors duration-500 select-none absolute -right-2 -bottom-4 pointer-events-none leading-none">
                    {config.watermark}
                  </span>

                  {/* Card Header: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:bg-gold-500/15 group-hover:border-gold-400/35 transition-all duration-300 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="font-barlow-condensed font-bold tracking-widest text-[11px] uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-foreground/70 group-hover:text-gold-200 group-hover:border-gold-400/30 group-hover:bg-gold-500/10 transition-all shadow-sm">
                      {config.tag}
                    </span>
                  </div>

                  {/* Number with Superscript Plus and Refined Drop Shadow */}
                  <div className="relative z-10 inline-flex items-start font-anton tracking-tight select-none my-1">
                    <span className="bg-gold-gradient bg-clip-text text-transparent text-5xl sm:text-6xl lg:text-[68px] leading-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_15px_rgba(245,197,66,0.25)] transition-all">
                      {format(values[i], stat.kind)}
                    </span>
                    <sup className="text-gold-400/90 text-2xl sm:text-3xl font-anton ml-1 mt-0.5 align-super leading-none">
                      +
                    </sup>
                  </div>

                  {/* Label & Description */}
                  <div className="relative z-10 mt-1 pt-2 border-t border-white/[0.05]">
                    <div className="font-barlow-condensed font-bold text-base uppercase tracking-[0.16em] text-foreground/95 leading-tight group-hover:text-gold-200 transition-colors">
                      {stat.label}
                    </div>
                  </div>

                  {/* Velocity Progress Bar & Telemetry Footer */}
                  <div className="relative z-10 mt-3 pt-2.5 border-t border-white/[0.04] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-barlow-condensed tracking-wider">
                      <span className="text-foreground/50 truncate max-w-[140px]">
                        {stat.sub}
                      </span>
                      <span className="text-gold-400 font-bold flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                        {config.growth}
                      </span>
                    </div>

                    {/* Glowing Progress Track */}
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden p-[1px] border border-white/[0.05]">
                      <div
                        className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 rounded-full shadow-[0_0_6px_rgba(245,197,66,0.4)] transition-all duration-700"
                        style={{ width: config.progress }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
