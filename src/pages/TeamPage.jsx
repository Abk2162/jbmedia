import React from "react";
import { Link } from "react-router-dom";
import { Camera, Film, Palette, PenTool, Globe, Sparkles, ArrowUpRight, Mail } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons.jsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ProfileCard from "@/components/ProfileCard.jsx";
import { LEADERSHIP } from "@/data/site.js";

const DOMAINS = [
  {
    icon: Camera,
    title: "Photography & Primes",
    lead: "Siddharth V.",
    leadRole: "Photography Head",
    skills: ["Stage Concerts", "Sports Track", "Portraits", "Color Grading"],
    bio: "Specializing in low-light stage photography, prime focal lengths, and high-speed sports tracking.",
    count: "8 Crew Members",
  },
  {
    icon: Film,
    title: "Cinematography & FPV",
    lead: "Karthik R.",
    leadRole: "Cinematography Lead",
    skills: ["4K 10-Bit", "Gimbal Operative", "FPV Drone", "After Effects"],
    bio: "Crafting aftermovies, cinematic teasers, and rapid social media reels with high dynamic range.",
    count: "6 Crew Members",
  },
  {
    icon: Palette,
    title: "Visual Design & Branding",
    lead: "Ananya K.",
    leadRole: "Design Director",
    skills: ["Typography", "Poster Design", "Brand Identity", "Figma & PS"],
    bio: "Creating the official visual language, commemorative booklets, and fest branding for JBIET.",
    count: "5 Crew Members",
  },
  {
    icon: PenTool,
    title: "Content & Editorial",
    lead: "Rohan M.",
    leadRole: "Editorial Lead",
    skills: ["Scriptwriting", "Voiceovers", "PR Releases", "Interviews"],
    bio: "Writing compelling scripts for aftermovies, student spotlights, and official press announcements.",
    count: "4 Crew Members",
  },
  {
    icon: Globe,
    title: "Web & Creative Tech",
    lead: "Abhinav M.",
    leadRole: "Tech & Systems Lead",
    skills: ["React & Vite", "WebGL & 3D", "Tailwind CSS", "CDN Pipelines"],
    bio: "Building fast, high-fidelity digital experiences and automated media distribution pipelines.",
    count: "3 Crew Members",
  },
];

export function TeamPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-20">
      {/* Header */}
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <Badge variant="default" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>The Minds Behind The Lens</span>
          </Badge>
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground">
          OUR <span className="bg-gold-gradient bg-clip-text text-transparent">CREATIVE CREW</span>
        </h1>
        <p className="font-barlow text-lg text-foreground/80 max-w-3xl leading-relaxed">
          At JB Media, creativity meets purpose. Our team brings stories to life — one frame, one voice, one idea at a time. Discover the passionate individuals who capture moments, craft experiences, and inspire our campus community.
        </p>
      </div>

      {/* ---------------- SECTION 1: INSTITUTIONAL LEADERSHIP ---------------- */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="jb-eyebrow">Institutional Patrons</div>
          <h2 className="jb-h2 text-foreground">Guiding Vision</h2>
          <div className="jb-rule mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader, i) => (
            <ProfileCard key={leader.name} person={leader} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 2: DOMAIN VERTICAL LEADS ---------------- */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="jb-eyebrow">Production Departments</div>
          <h2 className="jb-h2 text-foreground">Domain Verticals</h2>
          <div className="jb-rule mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <Card
                key={domain.title}
                className="group relative overflow-hidden p-6 border-gold-500/25 bg-dark-card/85 hover:border-gold-400/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Ambient glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all pointer-events-none" />

                <div className="flex flex-col gap-4">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 group-hover:bg-gold-gradient group-hover:text-dark-base transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {domain.count}
                    </Badge>
                  </div>

                  <h3 className="font-anton text-2xl uppercase tracking-wide text-foreground group-hover:text-gold-200 transition-colors">
                    {domain.title}
                  </h3>

                  <p className="font-barlow text-sm text-foreground/75 leading-relaxed">
                    {domain.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-barlow-condensed uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-foreground/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lead Footer */}
                <div className="mt-6 pt-4 border-t border-gold-500/20 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-barlow-condensed font-semibold text-sm uppercase tracking-wider text-foreground">
                      {domain.lead}
                    </span>
                    <span className="font-barlow-condensed text-xs uppercase tracking-widest text-gold-400">
                      {domain.leadRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/50">
                    <InstagramIcon className="w-4 h-4 hover:text-gold-300 cursor-pointer transition-colors" />
                    <LinkedinIcon className="w-4 h-4 hover:text-gold-300 cursor-pointer transition-colors" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ---------------- SECTION 3: RECRUITMENT CALLOUT ---------------- */}
      <section className="rounded-3xl border border-gold-500/30 bg-gradient-to-r from-dark-card via-dark-surface to-dark-card p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="flex flex-col gap-3 max-w-xl text-center md:text-left z-10">
          <Badge variant="gold" className="w-fit mx-auto md:mx-0">
            Open Applications
          </Badge>
          <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-foreground">
            WANT TO JOIN OUR CREW?
          </h2>
          <p className="font-barlow text-foreground/80 leading-relaxed">
            We are actively inducting 1st and 2nd year students with a passion for cameras, storytelling, design, and code. No prior professional gear required.
          </p>
        </div>

        <div className="z-10 shrink-0">
          <Link to="/join">
            <Button size="lg" variant="default" className="gap-2 px-8">
              <span>Apply for Induction</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
