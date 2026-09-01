import React, { useRef } from "react";

/**
 * ProfileCard — pointer-tilt card with a gold holographic sheen
 * (reactbits.dev "Profile Card", restyled to the JB Media gold system).
 */
export default function ProfileCard({ name, role, portrait, person }) {
  const finalName = name || person?.name || "Leader Name";
  const finalRole = role || person?.role || "Club Role";
  const finalPortrait = portrait || person?.portrait || null;

  const cardRef = useRef(null);
  const sheenRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transition = "transform 90ms linear, border-color 280ms";
    el.style.transform =
      "rotateY(" + ((px - 0.5) * 16).toFixed(2) + "deg) rotateX(" + ((0.5 - py) * 16).toFixed(2) + "deg) translateZ(14px)";
    el.style.borderColor = "rgba(212,162,46,.72)";
    if (sheenRef.current) {
      sheenRef.current.style.opacity = "1";
      sheenRef.current.style.transform =
        "translate(" + ((px - 0.5) * 44).toFixed(1) + "%," + ((py - 0.5) * 44).toFixed(1) + "%)";
    }
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.style.transition = "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), border-color 280ms";
      el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
      el.style.borderColor = "rgba(212,162,46,.35)";
    }
    if (sheenRef.current) sheenRef.current.style.opacity = "0";
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className="perspective-[900px] w-full">
      <div
        ref={cardRef}
        className="jb-card relative rounded-2xl border border-gold-500/35 bg-card-gradient p-5 flex flex-col gap-4 overflow-hidden transform-style-3d shadow-xl"
      >
        <div ref={sheenRef} className="jb-card__sheen" />
        <div className="jb-card__frame relative h-80 rounded-xl border border-dashed border-gold-500/35 bg-radial-gold flex items-end justify-center pb-4 overflow-hidden">
          {finalPortrait ? (
            <img
              src={finalPortrait}
              alt={finalName}
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 font-anton text-2xl">
                {finalName.charAt(0)}
              </div>
              <span className="font-barlow-condensed font-semibold text-xs tracking-[0.2em] uppercase text-gold-400/80">
                Institutional Leadership
              </span>
            </div>
          )}
        </div>
        <div className="relative flex flex-col gap-1.5">
          <div className="font-anton text-2xl uppercase tracking-wide text-foreground">
            {finalName}
          </div>
          <div className="font-barlow-condensed font-semibold text-xs tracking-[0.22em] uppercase text-gold-300">
            {finalRole}
          </div>
          {person?.quote && (
            <p className="font-barlow text-xs text-foreground/75 italic leading-relaxed pt-2 border-t border-gold-500/15">
              "{person.quote}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
