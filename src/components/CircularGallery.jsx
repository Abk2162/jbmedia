import { useEffect, useRef, useMemo } from "react";

/**
 * CircularGallery — drag/scroll carousel of reel covers
 * Wraps infinitely with smooth, constant-speed drift and 3D curvature.
 *
 * items: [{ title, meta, cover, href }]
 */
export default function CircularGallery({ items = [], paused = false, gap = 268, speed = 38 }) {
  const itemRefs = useRef([]);
  const stateRef = useRef({ off: 0, vel: speed, dragging: false });
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const isDraggingRef = useRef(false);
  const dragDistRef = useRef(0);

  // Duplicate items if needed to ensure seamless continuous wrapping far off-screen
  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    let list = [...items];
    while (list.length < 12 && list.length > 0) {
      list = list.concat(items);
    }
    return list;
  }, [items]);

  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();

    const step = (now) => {
      raf = requestAnimationFrame(step);
      if (document.hidden || pausedRef.current) {
        lastTime = now;
        return;
      }

      // Delta time normalized to seconds, clamped to avoid tab switch jumps
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.1);
      lastTime = now;

      const s = stateRef.current;
      const n = displayItems.length;
      if (!n) return;

      if (!s.dragging) {
        // Smoothly return to the constant target speed if user flicked or dragged
        if (Math.abs(s.vel - speed) > 0.1) {
          s.vel += (speed - s.vel) * Math.min(1, 5 * dt);
        } else {
          s.vel = speed;
        }
        // Advance offset constantly
        s.off += s.vel * dt;
      }

      const effectiveGap =
        typeof window !== "undefined" && window.innerWidth < 640
          ? Math.round(gap * 0.75)
          : gap;
      const span = n * effectiveGap;

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        let x = i * effectiveGap - s.off;
        x = ((x % span) + span) % span;
        if (x > span / 2) x -= span;

        const absX = Math.abs(x);
        const maxVisibleDist = 980;

        if (absX > maxVisibleDist + 150) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }

        const normDist = Math.min(1, absX / maxVisibleDist);
        const scale = (1 - normDist * 0.34).toFixed(3);
        const rotY = (-x * 0.026).toFixed(2);
        const opacity = Math.max(0, 1 - Math.pow(normDist, 1.8) * 0.95).toFixed(2);

        el.style.transform = `translate3d(${x.toFixed(1)}px,0,0) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = String(200 - Math.round(normDist * 100));
        el.style.pointerEvents = absX > 620 ? "none" : "auto";
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [displayItems, gap, speed]);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const s = stateRef.current;
    s.dragging = true;
    isDraggingRef.current = true;
    dragDistRef.current = 0;

    let lastX = e.clientX;
    let lastT = performance.now();
    const el = e.currentTarget;
    el.style.cursor = "grabbing";

    const move = (ev) => {
      const now = performance.now();
      const dt = Math.max(0.001, (now - lastT) / 1000);
      const dx = ev.clientX - lastX;
      lastX = ev.clientX;
      lastT = now;

      dragDistRef.current += Math.abs(dx);
      s.off -= dx;
      s.vel = -dx / dt;
    };

    const up = () => {
      s.dragging = false;
      isDraggingRef.current = false;
      el.style.cursor = "grab";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      setTimeout(() => {
        dragDistRef.current = 0;
      }, 60);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const onWheel = (e) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    stateRef.current.vel += d * 1.6;
  };

  return (
    <div
      className="jb-gallery"
      onPointerDown={onPointerDown}
      onWheel={onWheel}
    >
      {displayItems.map((item, i) => (
        <a
          key={`${item.title || "reel"}-${i}`}
          className="jb-gallery__item"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          onClick={(e) => {
            if (dragDistRef.current > 6) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          style={{ background: "#000000" }}
        >
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              referrerPolicy="no-referrer"
              draggable={false}
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                width: "100%",
                height: "auto",
                maxHeight: "100%",
                transform: "translateY(-50%)",
                objectFit: "contain",
                display: "block",
                userSelect: "none",
                pointerEvents: "none"
              }}
            />
          ) : null}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none"
            }}
          >
            <span className="jb-gallery__play">▶</span>
          </div>
          <div className="jb-gallery__caption">
            <span
              style={{
                fontFamily: "var(--jb-font-condensed)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--jb-cream)"
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                fontFamily: "var(--jb-font-condensed)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--jb-text-muted)"
              }}
            >
              {item.meta}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
