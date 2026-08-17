import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Video, Camera, Cpu, Zap, Radio, Layers, Sparkles, ArrowUpRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const GEAR_ITEMS = [
  {
    category: "Bodies & Cinema",
    title: "Sony FX3 & A7 IV",
    specs: "4K 120p · 10-bit 4:2:2 · Full-Frame Dual Base ISO",
    desc: "Our primary workhorse cinema cameras for low-light fest concerts and razor-sharp sports tracking.",
  },
  {
    category: "Optics & Glass",
    title: "G-Master Prime & Telephoto Kit",
    specs: "24-70mm f/2.8 GM II · 70-200mm f/2.8 GM · 85mm f/1.4",
    desc: "From wide auditorium stage coverage to intimate podium portraits with creamy bokeh.",
  },
  {
    category: "Motion & Flight",
    title: "DJI RS 3 Pro & DJI Air 3",
    specs: "LiDAR Focusing · 3-Axis Stabilization · Dual 4K Aerials",
    desc: "Buttery-smooth tracking shots, sweeping campus fly-throughs, and crane-style cinematic moves.",
  },
  {
    category: "Audio & Recording",
    title: "DJI Mic 2 & Rode Wireless Pro",
    specs: "32-Bit Float Recording · Dual Transmitters · Noise Cancelling",
    desc: "Crystal-clear podcast audio and high-fidelity stage sound capture with zero distortion.",
  },
  {
    category: "Lighting & Studio",
    title: "Nanlite Forza 300B & Pavotubes",
    specs: "Bi-Color LED · 300W High Output · RGB Pixel Mapping",
    desc: "Studio portrait setups, dramatic interviewer key lights, and color-tuned music video stages.",
  },
  {
    category: "Post-Production Lab",
    title: "Apple Silicon M-Series Workstations",
    specs: "DaVinci Resolve Studio · Premiere Pro · After Effects · Figma",
    desc: "High-throughput color grading pipeline delivering same-night reel exports during fests.",
  },
];

const PILLARS = [
  {
    number: "01",
    title: "Connect",
    desc: "Bridging departments, student bodies, clubs, and alumni through compelling visual narratives.",
  },
  {
    number: "02",
    title: "Communicate",
    desc: "Delivering real-time event updates, live broadcasts, and official institutional branding.",
  },
  {
    number: "03",
    title: "Collaborate",
    desc: "Uniting photographers, editors, writers, and designers into a unified creative powerhouse.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-24">
      {/* Header */}
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <Badge variant="default" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Legacy & Mission</span>
          </Badge>
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground">
          ABOUT <span className="bg-gold-gradient bg-clip-text text-transparent">JB MEDIA</span>
        </h1>
        <p className="font-barlow text-lg text-foreground/75 max-w-2xl leading-relaxed">
          Founded as the official media, branding, and storytelling wing of JBIET, we capture history as it unfolds.
        </p>
      </div>

      {/* ---------------- SECTION 1: MISSION & ORIGIN ---------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="jb-eyebrow">Our Purpose</div>
          <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-wide text-foreground leading-tight">
            TURNING CAMPUS MOMENTS INTO TIMELESS CINEMA
          </h2>
          <p className="font-barlow text-base sm:text-lg text-foreground/80 leading-relaxed">
            JB Media is the engine behind all public visual communications for J.B. Institute of Engineering & Technology. Whether it is our 3-day national cultural fest Abhav, international conferences, intense sports tournaments, or student club spotlights, we operate with broadcast-grade standards.
          </p>
          <p className="font-barlow text-base text-foreground/70 leading-relaxed">
            Our members gain hands-on mastery over cinema optics, sound engineering, typography, and rapid post-production editing.
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl border border-gold-500/25 bg-dark-card/90 flex flex-col justify-between h-64 hover:border-gold-400/60 transition-colors"
            >
              <span className="font-anton text-3xl text-gold-400/50">{pillar.number}</span>
              <div className="flex flex-col gap-2">
                <h3 className="font-anton text-2xl uppercase tracking-wide text-foreground">
                  {pillar.title}
                </h3>
                <p className="font-barlow text-xs text-foreground/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 2: GEAR & EQUIPMENT LOCKER ---------------- */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="jb-eyebrow">Production Arsenal</div>
          <h2 className="jb-h2 text-foreground">The Gear Locker</h2>
          <div className="jb-rule mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GEAR_ITEMS.map((gear) => (
            <Card
              key={gear.title}
              className="p-6 border-gold-500/20 bg-dark-card/80 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-3">
                <Badge variant="outline" className="w-fit text-[10px]">
                  {gear.category}
                </Badge>
                <h3 className="font-anton text-2xl uppercase tracking-wide text-foreground group-hover:text-gold-200 transition-colors">
                  {gear.title}
                </h3>
                <div className="font-barlow-condensed font-semibold text-xs text-gold-300/90 tracking-wider">
                  {gear.specs}
                </div>
                <p className="font-barlow text-sm text-foreground/70 leading-relaxed">
                  {gear.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 3: WORKFLOW BREAKDOWN ---------------- */}
      <section className="p-8 sm:p-12 rounded-3xl border border-gold-500/20 bg-dark-surface/60 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div className="jb-eyebrow">Operational Standards</div>
          <h2 className="jb-h2 text-foreground">How We Cover Events</h2>
          <div className="jb-rule mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Brief & Shotlist", desc: "Coordinating with event leads to map key dignitaries, stage highlights, and crowd cues." },
            { step: "02", title: "Live Multi-Cam", desc: "Synchronized dual-cam angles, wireless gimbals, and stage microphones recording in log profiles." },
            { step: "03", title: "Rapid Ingest & Grade", desc: "Same-day proxy generation, RAW culling, custom LUT color grading, and audio mastering." },
            { step: "04", title: "Multi-Platform Drop", desc: "Instant high-res gallery uploads for students, official reel teasers, and press packages." },
          ].map((item) => (
            <div key={item.step} className="flex flex-col gap-2 border-l-2 border-gold-500/40 pl-4">
              <span className="font-anton text-2xl text-gold-400">{item.step}</span>
              <h4 className="font-anton text-xl uppercase tracking-wide text-foreground">{item.title}</h4>
              <p className="font-barlow text-xs text-foreground/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="text-center flex flex-col items-center gap-6 pt-4 pb-8">
        <h2 className="font-anton text-4xl uppercase text-foreground">READY TO CREATE WITH US?</h2>
        <Link to="/join">
          <Button size="lg" variant="default" className="gap-2">
            <span>Apply for the Next Induction</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
