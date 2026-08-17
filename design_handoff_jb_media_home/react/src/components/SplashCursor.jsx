import { useEffect, useRef } from "react";

/**
 * SplashCursor — gold ink-splash trail on the pointer.
 * A cheap additive-blob canvas rather than reactbits.dev's full fluid sim:
 * same read at a fraction of the cost, and it disables itself on touch
 * devices and under prefers-reduced-motion.
 */
export default function SplashCursor({ maxBlobs = 34 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduced) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    const blobs = [];
    const fit = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    fit();
    window.addEventListener("resize", fit);

    let lx = 0;
    let ly = 0;
    const onMove = (e) => {
      const speed = Math.min(Math.hypot(e.clientX - lx, e.clientY - ly), 60);
      lx = e.clientX;
      ly = e.clientY;
      if (blobs.length > maxBlobs) return;
      blobs.push({ x: e.clientX, y: e.clientY, r: 6 + speed * 0.4, max: 34 + speed * 1.5, a: 0.55 });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || !blobs.length) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i];
        b.r += (b.max - b.r) * 0.12;
        b.a *= 0.93;
        if (b.a < 0.012) { blobs.splice(i, 1); continue; }
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, "rgba(251,235,192," + (b.a * 0.55).toFixed(3) + ")");
        g.addColorStop(0.45, "rgba(212,162,46," + (b.a * 0.3).toFixed(3) + ")");
        g.addColorStop(1, "rgba(212,162,46,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", onMove);
    };
  }, [maxBlobs]);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 90, pointerEvents: "none", opacity: 0.85 }} />;
}
