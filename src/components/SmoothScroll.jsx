import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll component
 * Induces a slow, weighted, cinematic momentum scroll using Lenis and GSAP.
 * Gives the website a mystical, majestic, and grounded feel by increasing scroll inertia.
 */
export function SmoothScroll({
  duration = 1.2,
  wheelMultiplier = 0.95,
  touchMultiplier = 1.4,
  children
}) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis with weighted cinematic physics
    const lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier,
      touchMultiplier,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis through GSAP ticker for frame-perfect sync
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, wheelMultiplier, touchMultiplier]);

  // Reset scroll smoothly on route transitions
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return children || null;
}

export default SmoothScroll;
