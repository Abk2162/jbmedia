import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, Film, Sparkles, ChevronRight, Award, Compass, Play } from "lucide-react";
import Silk from "@/components/Silk.jsx";
import InfiniteMenu from "@/components/InfiniteMenu.jsx";
import { PhoneMockup } from "@/components/PhoneMockup.jsx";
import CircularGallery from "@/components/CircularGallery.jsx";
import ProfileCard from "@/components/ProfileCard.jsx";
import StatsBand from "@/components/StatsBand.jsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SPHERE_ITEMS, STATS, LEADERSHIP, REELS, PHOTO_BANK } from "@/data/site.js";

function useOnScreen(ref, initial = false) {
  const [visible, setVisible] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

const MARQUEE = [
  "CONNECT",
  "COMMUNICATE",
  "COLLABORATE",
  "BROADCAST",
  "CREATIVES",
  "ARCHIVE"
];

export function HomePage() {
  const [activeTitle, setActiveTitle] = useState(SPHERE_ITEMS[0]?.title || "JB Media");
  const [isMoving, setIsMoving] = useState(false);
  const heroRef = useRef(null);
  const workRef = useRef(null);
  const heroVisible = useOnScreen(heroRef, true);
  const workVisible = useOnScreen(workRef);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ---------------- HERO SECTION ---------------- */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-center overflow-hidden pt-28 pb-16">
        {/* React Bits Animated WebGL Silk Background */}
        <Silk
          speed={6}
          scale={0.9}
          color="#F97316"
          noiseIntensity={1.5}
          rotation={0}
          paused={!heroVisible}
        />
        
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/80 via-dark-base/30 to-dark-base pointer-events-none z-[1]" />

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center my-auto">
          {/* Left Column Copy matching reference picture */}
          <div className="lg:col-span-6 flex flex-col gap-5 text-left z-20">
            <div className="flex items-center gap-3">
              <Badge variant="default" className="gap-1.5 px-3.5 py-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span>The Branding Hub</span>
              </Badge>
              <span className="text-xs font-barlow-condensed text-gold-400/80 tracking-widest uppercase font-semibold">
                JBIET HYDERABAD
              </span>
            </div>

            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[0.92] text-foreground">
              THE BRANDING HUB <br />
              <span className="bg-gold-gradient bg-clip-text text-transparent">OF JBIET</span>
            </h1>

            <p className="font-barlow text-base sm:text-lg text-foreground/80 max-w-lg leading-relaxed font-light">
              At JB Media, we capture history, celebrate student talent, and craft Brand JBIET through the power of cinematography, photography, design, and storytelling. Drag the sphere to explore our radial archive.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
              <Link to="/gallery" className="w-full sm:w-auto">
                <Button size="lg" variant="default" className="w-full sm:w-auto gap-2">
                  <span>Explore Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/join" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <span>Join The Family</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Realistic iPhone Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative w-full">
            <PhoneMockup activeTitle={activeTitle} isMoving={isMoving}>
              <InfiniteMenu
                items={SPHERE_ITEMS}
                scale={0.65}
                paused={!heroVisible}
                onActiveChange={(item) => item && setActiveTitle(item.title)}
                onMovementChange={setIsMoving}
              />
            </PhoneMockup>
          </div>
        </div>
      </section>


      {/* ---------------- MARQUEE TICKER ---------------- */}
      <section className="jb-marquee" aria-label="Brand Keywords Ribbon">
        <div className="jb-marquee__track">
          {[0, 1, 2, 3].map((pass) =>
            MARQUEE.map((word, i) => (
              <span key={`${pass}-${word}`} className="jb-marquee__item-wrapper">
                <span className="jb-marquee__dot" />
                <span
                  className={
                    i % 2 === 0
                      ? "jb-marquee__item jb-marquee__item--gold"
                      : "jb-marquee__item"
                  }
                >
                  {word}
                </span>
              </span>
            ))
          )}
        </div>
      </section>
      {/* ---------------- RECENT WORK / REELS CAROUSEL ---------------- */}
      <section ref={workRef} className="py-20 border-t border-gold-500/20 bg-dark-card/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="jb-eyebrow mb-2">Social & Visuals</div>
            <h2 className="jb-h2 text-foreground">Recent Releases</h2>
            <div className="jb-rule mt-3" />
          </div>
          <a
            href="https://www.instagram.com/media_jbiet/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-barlow-condensed font-semibold text-sm uppercase tracking-widest text-gold-300 hover:text-gold-100"
          >
            <span>Instagram Feed</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3D Circular Reel Gallery */}
        <div className="w-full">
          <CircularGallery items={REELS} paused={!workVisible} />
        </div>
      </section>
          
      {/* ---------------- LEADERSHIP SPOTLIGHT ---------------- */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="flex flex-col gap-3 mb-14 text-center sm:text-left">
          <div className="jb-eyebrow">Under Whose Watch</div>
          <h2 className="jb-h2 text-foreground">Leadership</h2>
          <div className="jb-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader, i) => (
            <ProfileCard key={leader.name} person={leader} index={i} />
          ))}
        </div>
      </section>

      

      {/* ---------------- COUNTER STATS BAND ---------------- */}
      <StatsBand stats={STATS} />
      
      {/* ---------------- RECRUITMENT CALL (DRIFT WALL) ---------------- */}
      <section className="jb-join relative overflow-hidden">
        <div className="jb-driftwall" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              className="jb-driftwall__col"
              style={{
                animation: `jbDrift${col % 2 === 0 ? "Up" : "Down"} ${28 + col * 4}s linear infinite`,
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((tile) => {
                const photoIndex = (col * 6 + tile) % PHOTO_BANK.length;
                return (
                  <div
                    key={tile}
                    className="jb-driftwall__tile"
                    style={{
                      height: 170 + ((tile * 37 + col * 23) % 90),
                      backgroundImage: `url(${PHOTO_BANK[photoIndex]})`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="jb-join__scrim" />

        <div className="jb-join__inner">
          <Badge variant="default" className="gap-1.5 px-4 py-1.5 shadow-[0_0_20px_rgba(212,162,46,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Inductions Open · 2025–26</span>
          </Badge>

          <h2 className="jb-join__title">
            Shape Brand JBIET. <br />
            <span className="bg-gold-gradient bg-clip-text text-transparent">Join The Family.</span>
          </h2>

          <p className="font-barlow text-lg sm:text-xl text-foreground/80 max-w-xl leading-relaxed font-light">
            We are looking for passionate photographers, cinematographers, video editors, poster designers, podcast hosts, and web creators to build history together.
          </p>

          <div className="pt-3 flex flex-wrap gap-4 justify-center">
            <Link to="/join">
              <Button size="lg" variant="default" className="min-w-[210px] gap-2 shadow-[0_10px_25px_rgba(212,162,46,0.25)]">
                <span>Apply for Induction</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="min-w-[180px]">
                <span>Our Gear Locker</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
