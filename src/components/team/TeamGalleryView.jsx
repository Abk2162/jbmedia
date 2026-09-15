import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Users, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons.jsx";

/**
 * TeamGalleryView: The full-screen cinematic spotlight mode inspired by Drive Capital's Gallery View:
 * - Giant kinetic typography background with active member's name
 * - Center stage spotlight portrait
 * - Filmstrip thumbnail carousel at bottom
 * - Arrow / keyboard / swipe navigation
 */
export function TeamGalleryView({ members, initialIndex = 0, onToggleView }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const filmstripRef = useRef(null);

  const active = members[activeIndex] || members[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : members.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < members.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onToggleView?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [members.length, onToggleView]);

  // Keep active thumbnail scrolled into view
  useEffect(() => {
    if (filmstripRef.current) {
      const activeThumb = filmstripRef.current.querySelector(`[data-thumb-index="${activeIndex}"]`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeIndex]);

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-24 pb-8 select-none">
      {/* ---------------- BACKGROUND KINETIC MARQUEE TYPOGRAPHY ---------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-10">
        <div className="font-anton text-[18vw] uppercase whitespace-nowrap tracking-tight text-foreground/40 leading-none select-none animate-marquee">
          {active.name} • {active.position} • {active.name} • {active.position}
        </div>
      </div>

      {/* ---------------- TOP BAR: TOGGLE BACK TO GRID & STATUS ---------------- */}
      <div className="relative z-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onToggleView}
          className="group gap-2 px-5 py-2.5 rounded-full border-gold-500/30 bg-dark-card/80 backdrop-blur-md text-xs font-barlow-condensed font-bold tracking-widest uppercase text-gold-300 hover:text-dark-base hover:bg-gold-400 hover:border-gold-400 transition-all duration-300 shadow-md"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>GRID VIEW</span>
        </Button>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-mono border-gold-500/30 text-gold-300">
            {String(activeIndex + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
          </Badge>
        </div>
      </div>

      {/* ---------------- CENTER STAGE: SPOTLIGHT HERO ---------------- */}
      <div className="relative z-10 px-4 sm:px-8 max-w-6xl mx-auto w-full py-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="hidden lg:flex w-12 h-12 rounded-full border-gold-500/30 bg-dark-card/60 backdrop-blur-md hover:border-gold-400 text-gold-300 hover:bg-gold-500/20 transition-all shadow-lg flex-shrink-0"
          aria-label="Previous member"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Big Spotlight Portrait */}
        <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden bg-dark-surface border-2 border-gold-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex-shrink-0 group">
          <img
            key={active.id}
            src={active.image}
            alt={active.name}
            className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base/95 via-dark-base/20 to-transparent pointer-events-none" />

          {/* Floating Pill on Image */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-dark-base/80 backdrop-blur-md border border-gold-500/40 text-xs font-barlow-condensed font-bold tracking-wider text-gold-300">
              {active.branch} • {active.year}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-dark-card/90 backdrop-blur-md border border-gold-500/20 text-xs font-mono text-foreground/70">
              {active.rollNo}
            </span>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="flex flex-col gap-4 max-w-lg text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <Badge variant="gold" className="text-xs font-barlow-condensed tracking-widest uppercase">
              {active.categoryLabel}
            </Badge>
          </div>

          <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-foreground leading-tight">
            {active.name}
          </h1>

          <div className="font-barlow-condensed font-bold text-lg sm:text-xl tracking-widest text-gold-400 uppercase">
            {active.position}
          </div>

          <div className="jb-rule max-w-xs mx-auto lg:mx-0" />

          <p className="font-barlow text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
            {active.bio}
          </p>

          {/* Squad highlight box */}
          <div className="p-4 rounded-2xl bg-dark-card/70 border border-gold-500/25 flex flex-col gap-1 text-left backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-barlow-condensed font-bold text-gold-300 tracking-widest uppercase">
              <Users className="w-3.5 h-3.5 text-gold-400" />
              <span>Production Domain & Crew</span>
            </div>
            <p className="font-barlow text-xs sm:text-sm text-foreground/90 font-medium">
              {active.squad}
            </p>
            <span className="text-[11px] font-barlow text-foreground/60 italic">
              {active.squadCount}
            </span>
          </div>

          {/* Mobile Arrows */}
          <div className="flex lg:hidden items-center justify-center gap-4 pt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border-gold-500/30"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="font-mono text-xs text-foreground/60">
              {activeIndex + 1} of {members.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border-gold-500/30"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="hidden lg:flex w-12 h-12 rounded-full border-gold-500/30 bg-dark-card/60 backdrop-blur-md hover:border-gold-400 text-gold-300 hover:bg-gold-500/20 transition-all shadow-lg flex-shrink-0"
          aria-label="Next member"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* ---------------- BOTTOM FILMSTRIP CAROUSEL ---------------- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-barlow-condensed font-bold uppercase tracking-[0.2em] text-foreground/50">
            TEAM ROSTER FILMSTRIP (SELECT MEMBER)
          </span>
          <span className="text-[11px] font-barlow text-gold-400/80 hidden sm:inline">
            Use ← → Arrow Keys to Navigate
          </span>
        </div>

        <div
          ref={filmstripRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x"
        >
          {members.map((m, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={m.id}
                data-thumb-index={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer snap-center ${
                  isSelected
                    ? "border-gold-400 scale-105 shadow-[0_0_20px_rgba(245,197,66,0.4)] opacity-100"
                    : "border-gold-500/20 opacity-50 hover:opacity-80 hover:border-gold-400/50"
                }`}
                aria-label={`Select ${m.name}`}
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className={`w-full h-full object-cover object-center ${
                    isSelected ? "grayscale-0" : "grayscale"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base/90 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 text-center truncate">
                  <span className="font-barlow-condensed text-[9px] font-bold uppercase text-foreground truncate block">
                    {m.name.split(" ")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamGalleryView;
