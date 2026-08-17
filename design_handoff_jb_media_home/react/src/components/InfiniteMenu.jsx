import React, { useEffect, useRef, useState } from "react";

/**
 * InfiniteMenu — interactive 3D Fibonacci sphere with drag, inertial spin, and zoom in/out.
 */
export default function InfiniteMenu({ items = [], paused = false, onActiveChange }) {
  const wrapRef = useRef(null);
  const tileRefs = useRef([]);
  const stateRef = useRef({
    rx: -0.12,
    ry: 0,
    vx: 0,
    vy: 0.0016,
    dragging: false,
    r: 170,
    zoom: 1.0,
    targetZoom: 1.0,
    active: -1,
  });
  const [, force] = useState(0);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const activeCb = useRef(onActiveChange);
  activeCb.current = onActiveChange;

  // Measure radius on mount and resize
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w) stateRef.current.r = Math.min(w * 0.48, h * 0.36);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 60fps Animation Loop with smooth inertial drag & smooth zoom easing
  useEffect(() => {
    let raf = 0;
    const step = () => {
      raf = requestAnimationFrame(step);
      if (document.hidden || pausedRef.current) return;
      const s = stateRef.current;
      const n = items.length;
      if (!n) return;

      // Smooth zoom easing
      s.zoom += (s.targetZoom - s.zoom) * 0.1;

      if (!s.dragging) {
        s.ry += s.vy;
        s.rx += s.vx;
        s.vy += (0.0016 - s.vy) * 0.02; // ease back to idle spin
        s.vx *= 0.94;
        s.rx += (-0.12 - s.rx) * 0.01;
      }

      const cx = Math.cos(s.rx), sx = Math.sin(s.rx);
      const cy = Math.cos(s.ry), sy = Math.sin(s.ry);
      const R = s.r * s.zoom;
      const fov = 640;
      let best = -1;
      let bestZ = -Infinity;

      for (let i = 0; i < n; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;

        // Fibonacci sphere distribution algorithm
        const y0 = 1 - (2 * i + 1) / n;
        const rad = Math.sqrt(Math.max(0, 1 - y0 * y0));
        const th = i * 2.399963;
        const x = Math.cos(th) * rad;
        const z = Math.sin(th) * rad;

        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y1 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;

        const sc = fov / (fov - z2 * R);
        const scaleFactor = (sc * (R / 150) * 0.65).toFixed(3);
        const opacity = Math.max(0.12, Math.min(1, 0.4 + (z2 + 1) * 0.45)).toFixed(2);

        el.style.transform = `translate3d(${(x1 * R * sc).toFixed(1)}px, ${(y1 * R * sc).toFixed(1)}px, 0) scale(${scaleFactor})`;
        el.style.opacity = opacity;
        el.style.zIndex = String(Math.round(z2 * 100) + 200);

        if (z2 > bestZ) {
          bestZ = z2;
          best = i;
        }
      }

      if (best !== s.active) {
        s.active = best;
        if (activeCb.current) activeCb.current(items[best], best);
        force((v) => v + 1);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  // Pointer drag handling
  const onPointerDown = (e) => {
    const s = stateRef.current;
    s.dragging = true;
    s.vx = 0;
    s.vy = 0;
    let last = { x: e.clientX, y: e.clientY };
    const el = e.currentTarget;
    el.style.cursor = "grabbing";

    const move = (ev) => {
      const dx = ev.clientX - last.x;
      const dy = ev.clientY - last.y;
      last = { x: ev.clientX, y: ev.clientY };
      s.ry += dx * 0.0055;
      s.rx = Math.max(-1.1, Math.min(1.1, s.rx - dy * 0.0055));
      s.vy = dx * 0.0006;
      s.vx = -dy * 0.0006;
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

  // Wheel event for zoom in and out
  const onWheel = (e) => {
    e.preventDefault();
    const s = stateRef.current;
    const zoomDelta = -e.deltaY * 0.0015;
    s.targetZoom = Math.max(0.55, Math.min(2.2, s.targetZoom + zoomDelta));
  };

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onWheel={onWheel}
      className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing select-none touch-none overflow-hidden"
    >
      {items.map((item, i) => (
        <div
          key={item.title || i}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 w-[110px] h-[110px] -ml-[55px] -mt-[55px] rounded-full overflow-hidden border-2 border-white/40 shadow-[0_8px_25px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.2)] will-change-transform bg-gradient-to-tr from-dark-card to-dark-surface"
        >
          {item.src && (
            <img
              src={item.src}
              alt={item.title || "Gallery thumbnail"}
              draggable={false}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          )}
        </div>
      ))}
    </div>
  );
}
