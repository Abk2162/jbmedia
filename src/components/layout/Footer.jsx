import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Camera } from "lucide-react";
import { InstagramIcon } from "@/components/icons/SocialIcons.jsx";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-dark-base relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Col 1: Brand & CTA */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gold-500/40 p-1 bg-black/60">
                <img
                  src="/jb-media-logo.webp"
                  alt="JB Media"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <span className="font-anton text-2xl tracking-wider text-foreground">
                JB MEDIA
              </span>
            </div>
            <p className="text-xs font-barlow text-foreground/75 leading-relaxed">
              The Branding Hub of JBIET. Showcasing vibrant campus culture, achievements, and student talent through the power of media.
            </p>
            <div className="pt-2">
              <Link to="/join">
                <Button size="sm" variant="outline" className="w-full justify-between text-xs">
                  <span>Recruitments</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3 font-barlow-condensed">
            <div className="text-xs uppercase tracking-[0.24em] text-gold-400 font-semibold mb-1">
              Explore
            </div>
            <Link to="/" className="text-sm uppercase tracking-wider text-foreground/70 hover:text-gold-300 transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="text-sm uppercase tracking-wider text-foreground/70 hover:text-gold-300 transition-colors">
              Media Archive
            </Link>
            <Link to="/team" className="text-sm uppercase tracking-wider text-foreground/70 hover:text-gold-300 transition-colors">
              Leadership & Team
            </Link>
            <Link to="/about" className="text-sm uppercase tracking-wider text-foreground/70 hover:text-gold-300 transition-colors">
              About & Gear Locker
            </Link>
            <Link to="/join" className="text-sm uppercase tracking-wider text-foreground/70 hover:text-gold-300 transition-colors">
              Join The Crew
            </Link>
          </div>

          {/* Col 3: Verticals */}
          <div className="flex flex-col gap-3 font-barlow-condensed">
            <div className="text-xs uppercase tracking-[0.24em] text-gold-400 font-semibold mb-1">
              Verticals
            </div>
            <span className="text-sm uppercase tracking-wider text-foreground/70">
              Photography & Primes
            </span>
            <span className="text-sm uppercase tracking-wider text-foreground/70">
              Cinematography & FPV
            </span>
            <span className="text-sm uppercase tracking-wider text-foreground/70">
              Visual Design & Posters
            </span>
            <span className="text-sm uppercase tracking-wider text-foreground/70">
              Podcasts & Live Media
            </span>
            <span className="text-sm uppercase tracking-wider text-foreground/70">
              Web & Creative Tech
            </span>
          </div>

          {/* Col 4: Contact */}
          <div className="flex flex-col gap-3 font-barlow-condensed">
            <div className="text-xs uppercase tracking-[0.24em] text-gold-400 font-semibold mb-1">
              Connect
            </div>
            <a
              href="mailto:mediajbiet@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-gold-300 transition-colors"
            >
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <span>mediajbiet@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/media_jbiet/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-gold-300 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-gold-400 shrink-0" />
              <span>@media_jbiet</span>
            </a>
            <div className="flex flex-col gap-0.5 text-sm text-foreground/70">
              <div className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 95503 51643</span>
              </div>
              <div className="inline-flex items-center gap-2 pl-6 text-xs text-foreground/60">
                <span>+91 95022 97525</span>
              </div>
            </div>
            <div className="inline-flex items-start gap-2 text-sm text-foreground/70">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>JBIET, Moinabad, Hyderabad</span>
            </div>
          </div>

          {/* Col 5: Location / Maps */}
          <div className="flex flex-col gap-3 font-barlow-condensed">
            <div className="text-xs uppercase tracking-[0.24em] text-gold-400 font-semibold mb-1">
              Campus
            </div>
            <div className="relative aspect-[16/10] w-full rounded-lg border border-gold-500/30 overflow-hidden bg-dark-card group">
              <img
                src="/campus-map.png"
                alt="JBIET Campus Location"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <a
                  href="https://maps.google.com/?q=JB+Institute+of+Engineering+and+Technology+Moinabad"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-barlow-condensed font-semibold text-gold-300 hover:text-gold-100 uppercase tracking-widest inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="border-t border-gold-500/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-barlow-condensed text-xs tracking-wider uppercase text-foreground/50">
          <div>
            © {new Date().getFullYear()} JB MEDIA · JB INSTITUTE OF ENGINEERING & TECHNOLOGY.
          </div>
          <div className="flex items-center gap-6">
            <span>CONNECT</span>
            <span>·</span>
            <span>COMMUNICATE</span>
            <span>·</span>
            <span>COLLABORATE</span>
          </div>
        </div>
      </div>

      {/* Mozilla-Style Oversized Wordmark */}
      <div className="jb-wordmark-wrap select-none border-t border-gold-500/10 bg-gradient-to-b from-transparent to-black/40">
        <div className="jb-wordmark text-center text-foreground/90 tracking-tighter">
          JB MEDIA
        </div>
      </div>
    </footer>
  );
}
