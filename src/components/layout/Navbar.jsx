import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "About Us", href: "/about" },
  { label: "Join Us", href: "/join" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-4",
          scrolled
            ? "bg-dark-base/80 backdrop-blur-lg border-b border-gold-500/20 shadow-2xl py-3"
            : "bg-gradient-to-b from-dark-base/90 via-dark-base/40 to-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          >
            <div className="relative w-10 h-10 rounded-full border border-gold-500/40 p-1 bg-black/50 overflow-hidden group-hover:border-gold-300 transition-colors shadow-[0_0_15px_rgba(212,162,46,0.2)]">
              <img
                src="/jb-media-logo.png"
                alt="JB Media Club Medallion"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-anton text-xl tracking-wider uppercase text-foreground group-hover:text-gold-300 transition-colors">
                JB MEDIA
              </span>
              <span className="font-barlow-condensed text-[10px] uppercase tracking-[0.25em] text-gold-400/80 -mt-1 font-semibold">
                JBIET HYDERABAD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-dark-surface/70 border border-gold-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-barlow-condensed font-semibold uppercase tracking-widest transition-all duration-200",
                    isActive
                      ? "bg-gold-gradient text-dark-base shadow-sm font-bold"
                      : "text-foreground/75 hover:text-gold-300 hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/join">
              <Button size="sm" variant="default" className="gap-1.5 text-xs">
                <span>Apply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-gold-500/30 text-gold-300 hover:text-gold-100 hover:border-gold-300 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-sm bg-dark-card border-l border-gold-500/30 p-6 flex flex-col justify-between shadow-2xl pt-24">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-barlow-condensed uppercase tracking-[0.25em] text-gold-400/70 mb-3 px-3">
                Navigation
              </div>
              {NAV_LINKS.map((link, idx) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg font-anton text-2xl uppercase tracking-wider transition-all",
                      isActive
                        ? "bg-gold-gradient text-dark-base shadow-lg"
                        : "text-foreground hover:text-gold-300 hover:bg-white/5"
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="font-barlow-condensed text-xs tracking-widest opacity-60">
                      0{idx + 1}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-gold-500/20">
              <Link to="/join" className="w-full">
                <Button className="w-full justify-between" variant="default">
                  <span>Join JB Media</span>
                  <Sparkles className="w-4 h-4 text-dark-base" />
                </Button>
              </Link>
              <div className="text-center text-xs font-barlow text-foreground/50">
                JBIET Moinabad, Hyderabad
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
