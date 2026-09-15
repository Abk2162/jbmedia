import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Calendar, Users, Camera, Radio, Trophy, Heart, ArrowUpRight, X, ZoomIn, Eye, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TIMELINE_MILESTONES } from "@/data/timeline.js";

gsap.registerPlugin(ScrollTrigger);

// Authentic cinema lens & production metadata tags for extra visual flavor
const MILESTONE_CAMERA_TAGS = [
  { focal: "35mm T1.5 Cine", iso: "ISO 800", mode: "ORIGIN 4K" },
  { focal: "24-70mm f/2.8 GM", iso: "ISO 1600", mode: "STAGE TRACK" },
  { focal: "DJI 4-Track 32-Bit", iso: "STUDIO AUDIO", mode: "BROADCAST" },
  { focal: "70-200mm f/2.8 GM", iso: "ISO 3200", mode: "FEST ARENA" },
  { focal: "Dual FX3 Full-Frame", iso: "SLOG-3", mode: "FLAGSHIP" }
];

export function OurStoryTimeline() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const containerRef = useRef(null);
  const activeSpineRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // 1. Dynamic Golden Spine Progress Animation (Scrubs along with page scroll)
      if (activeSpineRef.current) {
        gsap.fromTo(
          activeSpineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 65%",
              end: "bottom 85%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Slow, majestic reveal for each milestone row
      const rows = el.querySelectorAll(".timeline-milestone-row");
      rows.forEach((row, i) => {
        const node = row.querySelector(".milestone-node");
        const nodeRing = row.querySelector(".milestone-node-ring");
        const photoCard = row.querySelector(".milestone-photo");
        const contentCard = row.querySelector(".milestone-content");
        const contentItems = row.querySelectorAll(".milestone-anim-item");
        const isEven = i % 2 === 0;

        // Set initial invisible & displaced states
        gsap.set(node, { scale: 0, opacity: 0 });
        if (nodeRing) gsap.set(nodeRing, { scale: 0.4, opacity: 0 });

        gsap.set(photoCard, {
          x: isEven ? -80 : 80,
          opacity: 0,
          scale: 0.92,
          filter: "blur(10px)",
        });

        gsap.set(contentCard, {
          x: isEven ? 60 : -60,
          opacity: 0,
          filter: "blur(8px)",
        });

        if (contentItems.length) {
          gsap.set(contentItems, { y: 25, opacity: 0 });
        }

        // Dedicated ScrollTrigger timeline with slow cinematic easing
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 76%", // Activates smoothly once scrolling into view
            toggleActions: "play none none none",
            once: true,
          },
        });

        rowTl
          // Milestone node appears with a bounce and glow pulse
          .to(node, {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(2)",
          })
          .to(
            nodeRing,
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=0.7"
          )
          // Photo card drifts in slowly with blur clearing
          .to(
            photoCard,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.5, // Slow cinematic effect
              ease: "power3.out",
            },
            "-=0.8"
          )
          // Content card drifts in simultaneously
          .to(
            contentCard,
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.4, // Slow cinematic effect
              ease: "power3.out",
            },
            "-=1.2"
          )
          // Text and pills reveal with a gentle cascade
          .to(
            contentItems,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=1.0"
          );

        // 3. Image parallax scroll effect
        const photoImg = row.querySelector(".milestone-photo-img");
        if (photoImg) {
          gsap.fromTo(
            photoImg,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: photoCard,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-12 overflow-hidden">
      {/* Cinematic ambient lighting atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gold-500/10 via-amber-500/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Timeline Wrapper */}
      <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
        {/* Base Inactive Spine (Dim gold guide line) */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-white/10" />

        {/* Active Animated Golden Thread Spine (Draws down dynamically as you scroll) */}
        <div
          ref={activeSpineRef}
          style={{ transformOrigin: "top center" }}
          className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gold-300 via-gold-400 to-amber-500 shadow-[0_0_15px_rgba(230,184,0,0.85)] z-10"
        />

        {/* Milestone Rows */}
        <div className="flex flex-col gap-24 md:gap-36 relative z-10">
          {TIMELINE_MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;
            const cameraTag = MILESTONE_CAMERA_TAGS[index] || MILESTONE_CAMERA_TAGS[0];

            return (
              <div
                key={item.id}
                id={item.id}
                className="timeline-milestone-row relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
              >
                {/* Milestone Node Marker on Spine */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-20 flex items-center justify-center pointer-events-none">
                  <div className="relative group flex items-center justify-center">
                    {/* Glowing outer pulse ring */}
                    <div className="milestone-node-ring absolute w-14 h-14 rounded-full bg-gold-400/15 border border-gold-400/30 blur-[2px] animate-pulse" />
                    
                    {/* Node Core */}
                    <div className="milestone-node relative w-11 h-11 rounded-full bg-dark-base border-2 border-gold-400 shadow-[0_0_20px_rgba(230,184,0,0.5)] flex flex-col items-center justify-center">
                      <span className="font-anton text-xs text-gold-300 tracking-wider">
                        {item.step}
                      </span>
                      <span className="w-1.5 h-0.5 rounded-full bg-gold-400/80" />
                    </div>
                  </div>
                </div>

                {/* Left Column (Photo for Even, Narrative for Odd on desktop) */}
                <div
                  className={`pl-14 md:pl-0 ${
                    isEven
                      ? "md:pr-14 md:text-right order-2 md:order-1"
                      : "md:pr-14 order-2 md:order-1"
                  }`}
                >
                  {isEven ? (
                    /* Image on Left (Desktop) */
                    <TimelinePhotoCard
                      item={item}
                      cameraTag={cameraTag}
                      onSelect={() => setSelectedPhoto(item)}
                    />
                  ) : (
                    /* Text on Left (Desktop) */
                    <TimelineContentCard item={item} align="right" />
                  )}
                </div>

                {/* Right Column (Narrative for Even, Photo for Odd on desktop) */}
                <div
                  className={`pl-14 md:pl-0 ${
                    isEven
                      ? "md:pl-14 order-1 md:order-2"
                      : "md:pl-14 order-1 md:order-2"
                  }`}
                >
                  {isEven ? (
                    /* Text on Right (Desktop) */
                    <TimelineContentCard item={item} align="left" />
                  ) : (
                    /* Image on Right (Desktop) */
                    <TimelinePhotoCard
                      item={item}
                      cameraTag={cameraTag}
                      onSelect={() => setSelectedPhoto(item)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Resolution Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-base/90 backdrop-blur-xl p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-dark-card border border-gold-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-dark-base/80 border border-gold-500/40 flex items-center justify-center text-foreground/80 hover:text-gold-300 hover:border-gold-400 transition-colors shadow-lg"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.imageAlt}
                className="w-full h-full object-cover"
              />
              {/* Corner Framing HUD overlay */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400/80 pointer-events-none" />
              <div className="absolute top-4 right-16 w-6 h-6 border-t-2 border-r-2 border-gold-400/80 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400/80 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400/80 pointer-events-none" />
            </div>

            <div className="p-6 sm:p-8 bg-dark-card flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Badge variant="gold" className="text-xs px-2.5 py-0.5 font-barlow-condensed tracking-wider">
                  CHAPTER {selectedPhoto.step} · {selectedPhoto.year}
                </Badge>
                <span className="font-barlow-condensed font-semibold text-xs tracking-widest text-gold-300/90 uppercase">
                  {selectedPhoto.tagline}
                </span>
              </div>
              <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-foreground">
                {selectedPhoto.title}
              </h3>
              <p className="font-barlow text-sm sm:text-base text-foreground/75 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Visual photo card with camera HUD reticles, parallax zoom, and film badges
 */
function TimelinePhotoCard({ item, cameraTag, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="milestone-photo group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-500/25 bg-dark-card/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-700 hover:border-gold-400/90 hover:shadow-[0_15px_45px_rgba(230,184,0,0.22)]"
    >
      <div className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-dark-surface">
        {/* Parallax Image container */}
        <div className="w-full h-[120%] -mt-[10%] overflow-hidden">
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className="milestone-photo-img w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-base/95 via-dark-base/30 to-black/30 opacity-70 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

        {/* Viewfinder Camera HUD Brackets (Appear & expand on hover) */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60 group-hover:w-6 group-hover:h-6 group-hover:border-gold-400 transition-all duration-500 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60 group-hover:w-6 group-hover:h-6 group-hover:border-gold-400 transition-all duration-500 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400/60 group-hover:w-6 group-hover:h-6 group-hover:border-gold-400 transition-all duration-500 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400/60 group-hover:w-6 group-hover:h-6 group-hover:border-gold-400 transition-all duration-500 pointer-events-none" />

        {/* Top HUD Tag Strip */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono tracking-widest text-gold-300/80">
          <span className="bg-dark-base/70 backdrop-blur-md px-2 py-0.5 rounded border border-gold-500/20">
            {cameraTag.focal}
          </span>
          <span className="bg-dark-base/70 backdrop-blur-md px-2 py-0.5 rounded border border-gold-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            {cameraTag.mode}
          </span>
        </div>

        {/* Center Hover Magnifier Prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-dark-base/85 backdrop-blur-md border border-gold-400/80 text-xs font-barlow text-gold-300 flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to expand capture</span>
          </div>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="font-barlow text-xs text-foreground/90 bg-dark-base/80 backdrop-blur-md border border-gold-500/25 px-3 py-1.5 rounded-full truncate max-w-[80%] shadow-lg">
            {item.imageCaption}
          </span>
          <span className="font-anton text-xs text-gold-300 bg-dark-base/80 backdrop-blur-md px-2.5 py-1.5 rounded-full shrink-0 border border-gold-500/20">
            {item.year}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Narrative story card with staggered GSAP animation targets
 */
function TimelineContentCard({ item, align = "left" }) {
  const isRight = align === "right";

  return (
    <div
      className={`milestone-content flex flex-col gap-4 ${
        isRight ? "md:items-end md:text-right" : "md:items-start md:text-left"
      }`}
    >
      {/* Eyebrow & Year Badge */}
      <div className="milestone-anim-item flex items-center gap-2.5 flex-wrap">
        <Badge variant="gold" className="text-xs px-3 py-1 font-barlow-condensed tracking-wider shadow-sm">
          CHAPTER {item.step} · {item.year}
        </Badge>
        <span className="font-barlow-condensed text-xs uppercase tracking-widest text-gold-300/80 font-semibold">
          {item.tagline}
        </span>
      </div>

      {/* Editorial Title */}
      <h3 className="milestone-anim-item font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-foreground leading-[1.05]">
        {item.title}
      </h3>

      {/* Context Subtitle */}
      <div className="milestone-anim-item font-barlow-condensed font-semibold text-sm sm:text-base text-gold-400 tracking-wider">
        {item.subtitle}
      </div>

      {/* Narrative Story */}
      <p className="milestone-anim-item font-barlow text-base text-foreground/80 leading-relaxed font-light max-w-xl">
        {item.description}
      </p>

      {/* Highlight quote */}
      {item.highlight && (
        <div
          className={`milestone-anim-item p-4 rounded-2xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 to-amber-500/5 text-gold-200 font-barlow text-sm italic max-w-xl shadow-inner ${
            isRight ? "md:border-r-4 md:border-l-0" : "border-l-4"
          }`}
        >
          {item.highlight}
        </div>
      )}

      {/* Metric / Stat Pills */}
      <div className="milestone-anim-item flex flex-wrap gap-2.5 pt-2">
        {item.stats.map((stat, i) => (
          <div
            key={i}
            className="px-3.5 py-1.5 rounded-xl bg-dark-card/90 border border-gold-500/25 flex items-center gap-1.5 text-xs font-barlow shadow-sm hover:border-gold-400/50 transition-colors"
          >
            <span className="text-foreground/60">{stat.label}:</span>
            <span className="font-barlow-condensed font-bold text-gold-300 tracking-wide">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurStoryTimeline;
