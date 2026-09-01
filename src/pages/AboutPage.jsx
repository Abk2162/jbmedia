import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Video, Camera, Cpu, Zap, Radio, Layers, Sparkles, ArrowUpRight, Award, Flame, Users, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const MISSION_GOALS = [
  {
    number: "01",
    title: "Represent Brand JBIET",
    desc: "Representing JBIET with creativity, integrity, and broadcast-grade professionalism across all media channels.",
  },
  {
    number: "02",
    title: "Self-Expression & Innovation",
    desc: "Giving students an open, inspiring stage for creative self-expression, cinematography, and digital arts.",
  },
  {
    number: "03",
    title: "Connect The Community",
    desc: "Connecting faculty, alumni, student bodies, and clubs through powerful human stories, voices, and visuals.",
  },
  {
    number: "04",
    title: "Set Media Benchmarks",
    desc: "Setting new standards for student-led media, podcasting, live broadcast production, and institutional branding.",
  },
  {
    number: "05",
    title: "Enduring Legacy",
    desc: "Mentoring upcoming creators and building an enduring archive of campus life that inspires future generations.",
  },
];

const GEAR_ITEMS = [
  {
    category: "Bodies & Cinema",
    title: "Sony FX3 & A7 IV",
    specs: "4K 120p · 10-bit 4:2:2 · Full-Frame Dual Base ISO",
    desc: "Our primary workhorse cinema cameras for low-light fest concerts, national conferences, and sports tracking.",
  },
  {
    category: "Optics & Glass",
    title: "G-Master Prime & Telephoto Kit",
    specs: "24-70mm f/2.8 GM II · 70-200mm f/2.8 GM · 85mm f/1.4",
    desc: "From wide auditorium stage coverage to intimate dignitary podium portraits with creamy natural bokeh.",
  },
  {
    category: "Motion & Flight",
    title: "DJI RS 3 Pro & Aerial Fleet",
    specs: "LiDAR Focusing · 3-Axis Stabilization · Dual 4K Aerials",
    desc: "Buttery-smooth tracking shots, sweeping campus fly-throughs, and crane-style cinematic festival moves.",
  },
  {
    category: "Audio & Podcast",
    title: "DJI Mic 2 & Studio Radios",
    specs: "32-Bit Float Recording · Dual Transmitters · Noise Cancelling",
    desc: "Crystal-clear podcast audio, voiceovers, radio broadcasts, and high-fidelity stage sound capture.",
  },
  {
    category: "Lighting & Studio",
    title: "Nanlite Forza 300B & Pavotubes",
    specs: "Bi-Color LED · 300W High Output · RGB Pixel Mapping",
    desc: "Studio portrait setups, dramatic interviewer key lights, and color-tuned music video stages.",
  },
  {
    category: "Post-Production Lab",
    title: "Apple Silicon Workstations",
    specs: "DaVinci Resolve Studio · Premiere Pro · After Effects · Figma",
    desc: "High-throughput color grading pipeline delivering same-night reel exports and high-res photo drops.",
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
            <span>The Branding Hub of JBIET</span>
          </Badge>
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground">
          ABOUT <span className="bg-gold-gradient bg-clip-text text-transparent">JB MEDIA</span>
        </h1>
        <p className="font-barlow text-lg text-foreground/80 max-w-3xl leading-relaxed">
          At JB Media, we are more than just a media club — we are the Branding Hub of JBIET. Our main goal is to create Brand JBIET by showcasing its vibrant culture, achievements, and student talent through the power of media.
        </p>
      </div>

      {/* ---------------- SECTION 1: MISSION & ORIGIN ---------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="jb-eyebrow">Our Foundation</div>
          <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-wide text-foreground leading-tight">
            WHERE STORIES COME ALIVE & IDEAS FIND THEIR STAGE
          </h2>
          <p className="font-barlow text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
            Built on creativity, passion, and collaboration, JB Media is a space where every moment on campus gets captured, celebrated, and shared.
          </p>
          <p className="font-barlow text-base text-foreground/75 leading-relaxed">
            From dynamic videography and photography, to innovative design, podcasts, radio, and promotions, our teams work together to highlight the spirit of JBIET in its truest form. Every frame, every word, and every broadcast reflects the energy, talent, and dedication of our members.
          </p>
          <div className="p-4 rounded-xl border border-gold-500/30 bg-gold-500/5 text-gold-200 font-barlow text-sm italic">
            "More than just a club, we are a Family of creators shaping JBIET’s voice and presence across every platform."
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="jb-eyebrow mb-1">Our Core Mission</div>
          {MISSION_GOALS.map((goal) => (
            <div
              key={goal.number}
              className="p-5 rounded-xl border border-gold-500/25 bg-dark-card/90 flex items-start gap-4 hover:border-gold-400/60 transition-colors"
            >
              <span className="font-anton text-2xl text-gold-400 shrink-0">{goal.number}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-anton text-lg uppercase tracking-wide text-foreground">
                  {goal.title}
                </h3>
                <p className="font-barlow text-xs text-foreground/75 leading-relaxed">
                  {goal.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 2: FLAGSHIP FEST SPOTLIGHT (VAIBHAV 2025) ---------------- */}
      <section className="rounded-3xl border border-gold-500/30 bg-gradient-to-br from-dark-surface via-dark-card to-dark-surface p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <Badge variant="gold" className="w-fit gap-1.5">
              <Flame className="w-3.5 h-3.5 text-dark-base" />
              <span>Flagship Landmark</span>
            </Badge>
            <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-foreground">
              VAIBHAV 2025 · THE FIRST MEDIA FEST
            </h2>
            <p className="font-barlow text-base text-foreground/80 leading-relaxed font-light">
              Vaibhav 2025 was not just another campus gathering — it was a landmark celebration of media, creativity, and culture, proudly becoming the first-ever Media Fest of JBIET, conceived, designed, and executed entirely by JB Media.
            </p>
            <p className="font-barlow text-sm text-foreground/70 leading-relaxed">
              Unlike technical or cultural fests, Vaibhav was dedicated purely to media, storytelling, design, performance, and communication — the pillars of JB Media. It put the spotlight on student voices, visuals, and digital art, setting a new benchmark for student-led fests across Hyderabad.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-dark-base/80 border border-gold-500/20 flex flex-col gap-1">
              <span className="font-anton text-3xl text-gold-300">1st Ever</span>
              <span className="font-barlow-condensed text-xs uppercase tracking-wider text-foreground/70">Media Fest at JBIET</span>
            </div>
            <div className="p-5 rounded-2xl bg-dark-base/80 border border-gold-500/20 flex flex-col gap-1">
              <span className="font-anton text-3xl text-gold-300">100%</span>
              <span className="font-barlow-condensed text-xs uppercase tracking-wider text-foreground/70">Student Conceived & Run</span>
            </div>
            <div className="p-5 rounded-2xl bg-dark-base/80 border border-gold-500/20 flex flex-col gap-1">
              <span className="font-anton text-3xl text-gold-300">6+</span>
              <span className="font-barlow-condensed text-xs uppercase tracking-wider text-foreground/70">Creative Domains</span>
            </div>
            <div className="p-5 rounded-2xl bg-dark-base/80 border border-gold-500/20 flex flex-col gap-1">
              <span className="font-anton text-3xl text-gold-300">3000+</span>
              <span className="font-barlow-condensed text-xs uppercase tracking-wider text-foreground/70">Campus Attendees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: GEAR & EQUIPMENT LOCKER ---------------- */}
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

      {/* ---------------- SECTION 4: FUTURE VISION & AI INTEGRATION ---------------- */}
      <section className="p-8 sm:p-12 rounded-3xl border border-gold-500/20 bg-dark-surface/60 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="jb-eyebrow">Modern Evolution</div>
          <h2 className="jb-h2 text-foreground">Where Traditions Meet Trends</h2>
          <div className="jb-rule mt-2" />
        </div>

        <p className="font-barlow text-base sm:text-lg text-foreground/80 leading-relaxed font-light max-w-4xl">
          JB Media is continuously evolving with dynamic digital media, branding, and communication trends. As technology reshapes how people engage, we integrate AI-driven media creation, interactive storytelling formats, professional-grade event branding, and impactful outreach across social platforms to ensure a modern and professional presence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          {[
            { step: "01", title: "Creative Storytelling", desc: "Crafting narratives that highlight the spirit, ambition, and diversity of JBIET." },
            { step: "02", title: "Live Broadcasts", desc: "4K live streaming, multi-cam switching, and real-time social reels during campus events." },
            { step: "03", title: "AI & Digital Art", desc: "Exploring generative visual workflows, motion typography, and interactive web archives." },
            { step: "04", title: "Student Leadership", desc: "Mentoring engineers to become confident communicators, creators, and visual leaders." },
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
        <h2 className="font-anton text-4xl uppercase text-foreground">READY TO SHAPE BRAND JBIET?</h2>
        <p className="font-barlow text-base text-foreground/75 max-w-lg">
          Join our family of photographers, filmmakers, designers, writers, and tech creators.
        </p>
        <Link to="/join">
          <Button size="lg" variant="default" className="gap-2 px-8">
            <span>Apply for Induction</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
