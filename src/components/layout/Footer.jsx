import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Camera } from "lucide-react";
import { InstagramIcon } from "@/components/icons/SocialIcons.jsx";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [mapMode, setMapMode] = useState("dark");
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
            <div className="relative aspect-[16/10] w-full rounded-xl border border-gold-500/35 overflow-hidden bg-black group shadow-lg">
              <iframe
                key={mapMode}
                src={
                  mapMode === "3d"
                    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.6981670739865!2d78.2956247741398!3d17.330106304454794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95515c784b7d%3A0x73a884f17edcfeca!2sJ%20B%20Institute%20of%20Engineering%20and%20Technology%20(JBIET)!5e1!3m2!1sen!2sin!4v1789334386851!5m2!1sen!2sin"
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.6981670739865!2d78.2956247741398!3d17.330106304454794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95515c784b7d%3A0x73a884f17edcfeca!2sJ%20B%20Institute%20of%20Engineering%20and%20Technology%20(JBIET)!5e0!3m2!1sen!2sin!4v1789334386851!5m2!1sen!2sin"
                }
                title="JBIET Campus Google Maps"
                className="w-full border-0 transition-all duration-300"
                style={{
                  height: "calc(100% + 50px)",
                  marginTop: "-48px",
                  filter:
                    mapMode === "dark"
                      ? "invert(92%) hue-rotate(180deg) brightness(88%) contrast(95%)"
                      : "contrast(105%) brightness(95%)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />

              {/* Mode Switcher Pill: 3D vs Dark */}
              <div className="absolute top-2 right-2 z-30 pointer-events-auto flex items-center p-0.5 rounded bg-black/90 backdrop-blur-md border border-gold-500/40 shadow-md">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMapMode("3d");
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-barlow-condensed font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    mapMode === "3d"
                      ? "bg-gold-500 text-dark-base font-black shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                  title="3D Satellite Mode"
                >
                  3D
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMapMode("dark");
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-barlow-condensed font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    mapMode === "dark"
                      ? "bg-gold-500 text-dark-base font-black shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                  title="Black / Dark Mode"
                >
                  Dark
                </button>
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
