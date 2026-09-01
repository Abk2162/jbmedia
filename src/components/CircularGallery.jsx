import { useEffect, useRef } from "react";

/**
 * CircularGallery — drag/scroll carousel of reel covers
 * (reactbits.dev "Circular Gallery" with bend 0, borderRadius .13).
 * Wraps infinitely; each tile is a real link to its Instagram reel.
 *
 * items: [{ title, meta, cover, href }]
 */
export default function CircularGallery({ items = [], paused = false, gap = 268 }) {
  const itemRefs = useRef([]);
  const stateRef = useRef({ off: 0, vel: 0.35, dragging: false });
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    let raf = 0;
    const step = () => {
      raf = requestAnimationFrame(step);
      if (document.hidden || pausedRef.current) return;
      const s = stateRef.current;
      const n = items.length;
      if (!n) return;
      if (!s.dragging) {
        s.off += s.vel;
        s.vel *= 0.93;
        if (Math.abs(s.vel) < 0.02) s.vel = 0.35; // idle drift
      }
      const span = n * gap;
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        let x = i * gap - s.off;
        x = ((x % span) + span) % span;
        if (x > span / 2) x -= span;
        const d = Math.abs(x) / (span / 2);
        el.style.transform =
          "translate3d(" + x.toFixed(1) + "px,0,0) rotateY(" + (-x * 0.028).toFixed(2) + "deg) scale(" + (1 - d * 0.34).toFixed(3) + ")";
        el.style.opacity = (1 - d * 0.72).toFixed(2);
        el.style.zIndex = String(200 - Math.round(d * 100));
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [items, gap]);

  const onPointerDown = (e) => {
    const s = stateRef.current;
    s.dragging = true;
    let lastX = e.clientX;
    const el = e.currentTarget;
    el.style.cursor = "grabbing";
    const move = (ev) => {
      const dx = ev.clientX - lastX;
      lastX = ev.clientX;
      s.off -= dx;
      s.vel = -dx * 0.6;
    };
    const up = () => {
      s.dragging = false;
      el.style.cursor = "grab";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onWheel = (e) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.5;
    stateRef.current.vel += d * 0.35;
  };

  return (
    <div className="jb-gallery" onPointerDown={onPointerDown} onWheel={onWheel}>
      {items.map((item, i) => (
        <a
          key={item.title || i}
          className="jb-gallery__item"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{ background: item.cover ? "#14100C" : "linear-gradient(150deg,#3A2A16,#14100C)" }}
        >
          {item.cover ? (
            <img src={item.cover} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : null}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="jb-gallery__play">▶</span>
          </div>
          <div className="jb-gallery__caption">
            <span style={{ fontFamily: "var(--jb-font-condensed)", fontWeight: 600, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--jb-cream)" }}>{item.title}</span>
            <span style={{ fontFamily: "var(--jb-font-condensed)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--jb-text-muted)" }}>{item.meta}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
