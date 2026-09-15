import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  LayoutGrid,
  Eye,
  SlidersHorizontal,
  Users,
  Award,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ProfileCard from "@/components/ProfileCard.jsx";
import { LEADERSHIP } from "@/data/site.js";
import { TEAM_CATEGORIES, TEAM_MEMBERS } from "@/data/team.js";
import TeamGridCard from "@/components/team/TeamGridCard.jsx";
import TeamGalleryView from "@/components/team/TeamGalleryView.jsx";
import TeamMemberModal from "@/components/team/TeamMemberModal.jsx";
import "./TeamPage.css";

gsap.registerPlugin(ScrollTrigger);

export function TeamPage() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "gallery"
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalMember, setModalMember] = useState(null);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const heroRef = useRef(null);
  const titleRef = useRef(null);

  // Filtered members based on category selection
  const filteredMembers = useMemo(() => {
    if (activeCategory === "all") return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  // Handle member click in Grid View -> Opens detail modal
  const handleSelectMember = (person) => {
    setModalMember(person);
  };

  // Modal navigation
  const currentModalIndex = useMemo(() => {
    if (!modalMember) return 0;
    const idx = filteredMembers.findIndex((m) => m.id === modalMember.id);
    return idx >= 0 ? idx : 0;
  }, [modalMember, filteredMembers]);

  const handleModalPrev = () => {
    const nextIdx = currentModalIndex > 0 ? currentModalIndex - 1 : filteredMembers.length - 1;
    setModalMember(filteredMembers[nextIdx]);
  };

  const handleModalNext = () => {
    const nextIdx = currentModalIndex < filteredMembers.length - 1 ? currentModalIndex + 1 : 0;
    setModalMember(filteredMembers[nextIdx]);
  };

  // GSAP entrance and title parallax (Grid view only)
  useEffect(() => {
    if (viewMode !== "grid") return;

    const ctx = gsap.context(() => {
      // Gentle parallax fade on title as user scrolls
      if (titleRef.current && heroRef.current) {
        gsap.to(titleRef.current, {
          yPercent: 15,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Entrance staggered reveal of team cards
      gsap.fromTo(
        ".team-card-anim",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".team-grid-container",
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [viewMode, activeCategory]);

  // If user switches to Gallery View, render full-screen immersive gallery
  if (viewMode === "gallery") {
    return (
      <div className="min-h-screen bg-[#0a0806] text-foreground">
        <TeamGalleryView
          members={filteredMembers}
          initialIndex={galleryStartIndex}
          onToggleView={() => setViewMode("grid")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24">
      {/* ---------------- SECTION 1: DRIVE CAPITAL STYLE EDITORIAL HERO ---------------- */}
      <header ref={heroRef} className="team-editorial-header pt-6 sm:pt-10 flex flex-col gap-8">
        {/* Top Hairline Divider */}
        <div className="team-hairline" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: View Switcher & Narrative Description */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setGalleryStartIndex(0);
                  setViewMode("gallery");
                }}
                className="group gap-2 px-5 py-2.5 rounded-full border-gold-500/30 bg-dark-card/80 backdrop-blur-md text-xs font-barlow-condensed font-bold tracking-[0.2em] uppercase text-gold-300 hover:text-dark-base hover:bg-gold-400 hover:border-gold-400 transition-all duration-300 shadow-md cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-gold-400 group-hover:text-dark-base transition-colors" />
                <span>GALLERY VIEW</span>
              </Button>

              <Badge variant="outline" className="text-xs font-mono border-gold-500/30 text-foreground/60">
                COMPOSITION 2026-27
              </Badge>
            </div>

            <p className="font-barlow text-base sm:text-lg text-foreground/80 leading-relaxed font-light max-w-md">
              We&apos;re a team driven by conviction. These are the photographers, cinematographers, editors, and leaders shaping the visual pulse of JBIET.
            </p>

            <div className="team-hairline max-w-sm" />

            {/* Department Filter Pills */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="text-[11px] font-barlow-condensed font-bold uppercase tracking-[0.2em] text-foreground/50">
                Filter by Division
              </span>
              <div className="flex flex-wrap gap-2">
                {TEAM_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`team-filter-btn ${isActive ? "active" : ""}`}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="team-hairline max-w-sm" />
          </div>

          {/* Right Column: Giant Condensed "OUR TEAM" Headline */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end justify-start order-1 lg:order-2 overflow-hidden">
            <h1 ref={titleRef} className="team-big-title">
              <span>OUR TEAM</span>
              <sup className="team-superscript">22</sup>
            </h1>
          </div>
        </div>

        {/* Bottom Hairline Divider */}
        <div className="team-hairline" />
      </header>

      {/* ---------------- SECTION 2: THE 3-COLUMN EDITORIAL GRID ---------------- */}
      <section className="team-grid-container flex flex-col gap-8">
        <div className="team-grid">
          {filteredMembers.map((person, index) => (
            <div key={person.id} className="team-card-anim">
              <TeamGridCard
                person={person}
                index={index}
                onSelect={handleSelectMember}
              />
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="py-16 text-center text-foreground/50 font-barlow">
            No members found in this division.
          </div>
        )}
      </section>

      {/* ---------------- SECTION 3: INSTITUTIONAL PATRONS ---------------- */}
      <section className="flex flex-col gap-10 pt-10 border-t border-gold-500/20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="jb-eyebrow">Institutional Leadership</div>
            <h2 className="jb-h2 text-foreground">Guiding Patrons</h2>
            <p className="font-barlow text-sm sm:text-base text-foreground/70 max-w-xl">
              Honoring the visionary patrons of J.B. Institute of Engineering & Technology who champion creative student excellence.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-xs font-barlow-condensed tracking-wider">
            Patrons-in-Chief
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 w-full justify-items-center">
          {LEADERSHIP.map((leader, i) => (
            <ProfileCard key={leader.name} person={leader} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 4: CALL TO ACTION ---------------- */}
      <section className="rounded-3xl border border-gold-500/25 bg-gradient-to-br from-dark-surface via-dark-card to-dark-surface p-10 sm:p-14 text-center flex flex-col items-center gap-6 shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
        <Badge variant="gold" className="gap-1.5 text-xs font-barlow-condensed tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-dark-base" />
          <span>JOIN THE SQUAD</span>
        </Badge>

        <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-foreground max-w-xl">
          WANT TO WORK WITH OUR <span className="bg-gold-gradient bg-clip-text text-transparent">CREATIVE CREW?</span>
        </h2>

        <p className="font-barlow text-sm sm:text-base text-foreground/80 max-w-lg leading-relaxed font-light">
          We induct photographers, cinematographers, drone operators, writers, designers, and web creators every academic year.
        </p>

        <Link to="/join">
          <Button size="lg" variant="default" className="gap-2 px-8 py-5 font-anton uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(230,184,0,0.3)] hover:shadow-[0_0_35px_rgba(230,184,0,0.5)]">
            <span>Apply for Induction</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* ---------------- DETAIL INSPECTION MODAL ---------------- */}
      {modalMember && (
        <TeamMemberModal
          person={modalMember}
          onClose={() => setModalMember(null)}
          onPrev={handleModalPrev}
          onNext={handleModalNext}
          totalCount={filteredMembers.length}
          currentIndex={currentModalIndex}
        />
      )}
    </div>
  );
}

export default TeamPage;
