import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Mail, Users, Award, Sparkles, ExternalLink } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons.jsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TeamMemberModal({ person, onClose, onPrev, onNext, totalCount = 22, currentIndex = 0 }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-dark-card border border-gold-500/30 shadow-[0_20px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col md:flex-row text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-dark-base/80 border border-gold-500/30 text-foreground/80 hover:text-gold-300 hover:border-gold-400 flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Big Portrait */}
        <div className="md:w-5/12 relative aspect-[4/5] md:aspect-auto min-h-[320px] bg-dark-surface overflow-hidden border-b md:border-b-0 md:border-r border-gold-500/20">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent md:hidden" />

          <div className="absolute bottom-4 left-4 z-10">
            <span className="font-barlow-condensed font-bold text-xs tracking-widest uppercase px-3 py-1 rounded-full bg-dark-base/80 border border-gold-500/40 text-gold-300 backdrop-blur-md shadow-md">
              {person.branch} • {person.year}
            </span>
          </div>
        </div>

        {/* Right: Info & Bio */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="outline" className="text-xs font-barlow-condensed tracking-wider uppercase border-gold-500/40 text-gold-300">
                {person.categoryLabel}
              </Badge>
              <span className="font-mono text-xs text-foreground/50">
                ROLL: {person.rollNo}
              </span>
            </div>

            <div>
              <h2 id="member-modal-title" className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-foreground leading-tight">
                {person.name}
              </h2>
              <div className="font-barlow-condensed font-bold text-base sm:text-lg tracking-wider text-gold-400 uppercase mt-1">
                {person.position}
              </div>
            </div>

            <div className="jb-rule" />

            {/* Squad / Domain Box */}
            <div className="p-4 rounded-xl bg-dark-surface/60 border border-gold-500/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-barlow-condensed font-bold text-gold-300 tracking-wider uppercase">
                <Users className="w-3.5 h-3.5" />
                <span>Squad & Domain Responsibility</span>
              </div>
              <p className="font-barlow text-xs sm:text-sm text-foreground/90 font-medium">
                {person.squad}
              </p>
              <span className="text-[11px] font-barlow text-foreground/60 italic">
                {person.squadCount}
              </span>
            </div>

            {/* Bio */}
            <p className="font-barlow text-sm text-foreground/80 leading-relaxed">
              {person.bio}
            </p>
          </div>

          {/* Bottom Bar: Prev/Next & Direct Contact */}
          <div className="pt-4 border-t border-gold-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${person.email}`}
                className="p-2.5 rounded-full bg-dark-surface border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-colors shadow-sm"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={person.socials?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-dark-surface border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-colors shadow-sm"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={person.socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-dark-surface border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-colors shadow-sm"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Prev / Next switchers */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-foreground/50 mr-2">
                {currentIndex + 1} / {totalCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={onPrev}
                className="w-9 h-9 rounded-full border-gold-500/30 hover:border-gold-400"
                aria-label="Previous member"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                className="w-9 h-9 rounded-full border-gold-500/30 hover:border-gold-400"
                aria-label="Next member"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberModal;
