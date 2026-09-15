import React, { useState } from "react";
import { ArrowUpRight, Users, Sparkles } from "lucide-react";

/**
 * TeamGridCard component matching Drive Capital's editorial card design:
 * - Top hairline rule with uppercase Name • Role
 * - Grayscale default photo transitioning to full vibrant color on hover
 * - Roll No, Branch, and Domain Squad badges
 */
export function TeamGridCard({ person, index, onSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelect?.(person)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300 select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(person);
        }
      }}
      aria-label={`View details for ${person.name}, ${person.position}`}
    >
      {/* Top Editorial Hairline & Metadata Label */}
      <div className="pt-3 pb-3.5 border-t border-gold-500/25 group-hover:border-gold-400 transition-colors duration-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-barlow-condensed font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-foreground/80 group-hover:text-gold-300 transition-colors duration-200 truncate">
            {person.name}
          </span>
          <span className="text-gold-500/50 text-xs">•</span>
          <span className="font-barlow-condensed font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase text-gold-400/90 group-hover:text-gold-200 transition-colors duration-200 truncate">
            {person.position}
          </span>
        </div>

        {/* Index indicator & Hover Arrow */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="font-barlow-condensed text-[11px] font-semibold text-foreground/40 group-hover:text-gold-400/70 tracking-wider transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gold-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
        </div>
      </div>

      {/* Portrait Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-dark-card border border-gold-500/15 group-hover:border-gold-400/50 shadow-lg group-hover:shadow-[0_12px_40px_rgba(230,184,0,0.15)] transition-all duration-500">
        {/* Subtle Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-base/90 via-dark-base/20 to-transparent z-10 pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Shimmer skeleton while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-dark-surface animate-pulse" />
        )}

        {/* Image with Drive Capital's signature Grayscale -> Color hover transition */}
        {!imgError ? (
          <img
            src={person.image}
            alt={person.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-center grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          /* Fallback Initials Portrait */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1813] via-[#120f0c] to-[#1c1813] p-6 text-center">
            <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center mb-3 bg-gold-500/10 shadow-inner">
              <span className="font-anton text-3xl text-gold-300">
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="font-barlow-condensed font-bold text-sm text-foreground/80 tracking-widest uppercase">
              {person.name}
            </span>
          </div>
        )}

        {/* Bottom Floating Metadata Pills */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-dark-base/80 backdrop-blur-md border border-gold-500/30 text-[10px] sm:text-xs font-barlow-condensed font-semibold tracking-wider text-foreground/90 group-hover:border-gold-400/60 transition-colors shadow-sm">
            {person.branch} • {person.year}
          </span>

          <span className="px-2 py-1 rounded-full bg-dark-card/90 backdrop-blur-md border border-gold-500/20 text-[10px] font-mono text-gold-300/90 shadow-sm">
            {person.rollNo}
          </span>
        </div>

        {/* Corner Highlight Pip */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_#f5c542] block" />
        </div>
      </div>

      {/* Squad & Domain Info footer */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-barlow text-foreground/60 group-hover:text-foreground/90 transition-colors">
        <Users className="w-3 h-3 text-gold-400/80 flex-shrink-0" />
        <span className="truncate">{person.squad}</span>
      </div>
    </article>
  );
}

export default TeamGridCard;
