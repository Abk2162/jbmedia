import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Sparkles, ArrowUpRight, Users, Trophy, ChevronDown, Camera, Film, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OurStoryTimeline from "@/components/OurStoryTimeline.jsx";

export function AboutPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Cinematic slow entrance reveal for hero elements
      gsap.fromTo(
        el.querySelectorAll(".hero-anim-item"),
        { y: 35, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToTimeline = () => {
    const target = document.getElementById("chapter-1");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-28 overflow-x-hidden">
      {/* ---------------- HERO HEADER (Cinematic Viewfinder & Editorial Story) ---------------- */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center text-center gap-7 pt-6 sm:pt-12 pb-6"
      >
        {/* Ambient Warm Golden Halo Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-gold-500/15 via-amber-500/10 to-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Viewfinder HUD Framing Brackets */}
        <div className="absolute -top-2 left-2 sm:left-6 w-8 h-8 border-t-2 border-l-2 border-gold-400/40 pointer-events-none" />
        <div className="absolute -top-2 right-2 sm:right-6 w-8 h-8 border-t-2 border-r-2 border-gold-400/40 pointer-events-none" />
        <div className="absolute -bottom-2 left-2 sm:left-6 w-8 h-8 border-b-2 border-l-2 border-gold-400/40 pointer-events-none" />
        <div className="absolute -bottom-2 right-2 sm:right-6 w-8 h-8 border-b-2 border-r-2 border-gold-400/40 pointer-events-none" />

        {/* Camera HUD Status Ribbon */}
        <div className="hero-anim-item flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono tracking-widest text-gold-300/80 bg-dark-card/70 border border-gold-500/25 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <span className="flex items-center gap-1.5 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            REC ● 4K 10-BIT
          </span>
          <span className="hidden sm:inline text-foreground/30">|</span>
          <span className="hidden sm:inline">23.98 FPS · SLOG-3</span>
          <span className="text-foreground/30">|</span>
          <span className="text-gold-200">TC 00:04:21:18</span>
        </div>

        {/* Story Kicker */}
        <div className="hero-anim-item flex items-center gap-2">
          <Badge variant="gold" className="px-3.5 py-1 gap-1.5 text-xs font-barlow-condensed tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-dark-base" />
            <span>OUR STORY</span>
          </Badge>
          <span className="font-barlow-condensed uppercase tracking-widest text-xs text-foreground/70 font-semibold">
            From 4 Founders to 50+ Creators
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="hero-anim-item font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-foreground max-w-5xl leading-[0.93]">
          FROM A BORROWED LENS <br className="hidden sm:inline" />
          TO THE <span className="bg-gold-gradient bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(230,184,0,0.35)]">BRANDING HUB</span>
        </h1>

        {/* Narrative Intro */}
        <p className="hero-anim-item font-barlow text-lg sm:text-xl text-foreground/85 max-w-2xl leading-relaxed font-light">
          Every landmark begins with an idea. Explore how four students with a single camera built JB Media into the creative heartbeat of JBIET — shaping culture, framing moments, and telling our collective story.
        </p>

        {/* Quick Stats Strip */}
        <div className="hero-anim-item flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
          <div className="px-4 py-2 rounded-full border border-gold-500/30 bg-dark-card/70 backdrop-blur-md text-xs sm:text-sm font-barlow text-foreground/80 flex items-center gap-2 shadow-sm hover:border-gold-400/60 transition-colors">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>Founded in <strong>2021</strong></span>
          </div>
          <div className="px-4 py-2 rounded-full border border-gold-500/30 bg-dark-card/70 backdrop-blur-md text-xs sm:text-sm font-barlow text-foreground/80 flex items-center gap-2 shadow-sm hover:border-gold-400/60 transition-colors">
            <Users className="w-3.5 h-3.5 text-gold-400" />
            <span><strong>4 to 50+</strong> Active Members</span>
          </div>
          <div className="px-4 py-2 rounded-full border border-gold-500/30 bg-dark-card/70 backdrop-blur-md text-xs sm:text-sm font-barlow text-foreground/80 flex items-center gap-2 shadow-sm hover:border-gold-400/60 transition-colors">
            <Trophy className="w-3.5 h-3.5 text-gold-400" />
            <span><strong>1st Ever</strong> Media Fest in JBIET</span>
          </div>
        </div>

        {/* Scroll To Explore Prompt */}
        <button
          onClick={scrollToTimeline}
          className="hero-anim-item mt-4 group flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-surface/60 border border-gold-500/25 hover:border-gold-400/70 text-xs font-barlow text-gold-300/90 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(230,184,0,0.2)] cursor-pointer"
        >
          <span>Scroll to explore the journey</span>
          <ChevronDown className="w-3.5 h-3.5 text-gold-400 group-hover:translate-y-1 transition-transform" />
        </button>
      </section>

      {/* ---------------- THE TIMELINE (GSAP ScrollTrigger Slow-Reveal) ---------------- */}
      <section className="flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="jb-eyebrow">The Evolution</div>
          <h2 className="jb-h2 text-foreground">Our Milestone Journey</h2>
          <p className="font-barlow text-sm sm:text-base text-foreground/70 max-w-lg">
            Scroll down to watch the defining chapters unfold frame by frame.
          </p>
          <div className="jb-rule mt-2 max-w-xs" />
        </div>

        {/* The Interactive GSAP Timeline Component */}
        <OurStoryTimeline />
      </section>

      {/* ---------------- CTA BOTTOM (Showstopper Cinematic Finish) ---------------- */}
      <section className="relative rounded-3xl border border-gold-500/30 bg-gradient-to-br from-dark-surface via-dark-card to-dark-surface p-10 sm:p-16 overflow-hidden text-center flex flex-col items-center gap-6 shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
        {/* Background glow orb */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <Badge variant="gold" className="gap-1.5 text-xs font-barlow-condensed tracking-wider">
          <Flame className="w-3.5 h-3.5 text-dark-base" />
          <span>JOIN THE LEGACY</span>
        </Badge>

        <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-foreground max-w-2xl leading-tight">
          READY TO SHAPE <span className="bg-gold-gradient bg-clip-text text-transparent">BRAND JBIET?</span>
        </h2>

        <p className="font-barlow text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed font-light">
          From 4 members to 50+, our family continues to grow. If you're a photographer, cinematographer, editor, designer, writer, or sound creator, there’s a stage waiting for you.
        </p>

        <Link to="/join" className="pt-2">
          <Button size="lg" variant="default" className="gap-2.5 px-9 py-6 text-base font-anton uppercase tracking-wider shadow-[0_0_25px_rgba(230,184,0,0.35)] hover:shadow-[0_0_40px_rgba(230,184,0,0.5)] transition-all duration-300">
            <span>Apply for Induction</span>
            <ArrowUpRight className="w-5 h-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default AboutPage;
