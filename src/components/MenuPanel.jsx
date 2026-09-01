import { useState } from "react";

/** Sliding nav panel: gold fill on hover, staggered line reveal. */
export default function MenuPanel({ open, onClose, items }) {
  const [hover, setHover] = useState(-1);

  return (
    <>
      <div
        className="jb-shade"
        onClick={onClose}
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />
      <nav className="jb-panel" style={{ transform: open ? "translateX(0%)" : "translateX(101%)" }}>
        {items.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className="jb-panel__link"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover((h) => (h === i ? -1 : h))}
            onClick={onClose}
          >
            <span className="jb-panel__fill" style={{ transform: hover === i ? "scaleX(1)" : "scaleX(0)" }} />
            <span style={{ position: "relative", display: "block", overflow: "hidden" }}>
              <span
                className="jb-panel__row"
                style={{
                  transform: open ? "translateY(0%)" : "translateY(115%)",
                  transitionDelay: (open ? 0.16 + i * 0.07 : 0).toFixed(2) + "s"
                }}
              >
                <span className="jb-panel__num" style={{ color: hover === i ? "#0A0908" : "var(--jb-cream)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="jb-panel__label" style={{ color: hover === i ? "#0A0908" : "var(--jb-cream)" }}>
                  {item.label}
                </span>
              </span>
            </span>
          </a>
        ))}
        <div style={{ padding: "32px 48px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="jb-pill">Instagram</span>
          <span className="jb-pill">YouTube</span>
          <span className="jb-pill">LinkedIn</span>
        </div>
      </nav>
    </>
  );
}
