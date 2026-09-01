import React, { useState, useEffect } from "react";
import "./PhoneMockup.css";

/**
 * PhoneMockup component:
 * - Photorealistic iPhone 16 Pro mockup frame with transparent cutout overlay
 * - Strict OLED screen clipping for WebGL 2 Infinite Menu
 * - Dynamic Island live HUD showing active archive item
 * - Interactive ambient glow responding to user movement
 */
export function PhoneMockup({
  children,
  activeTitle = "Abhav 2K26",
  isMoving = false
}) {
  const [currentTime, setCurrentTime] = useState("9:41");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="phone-mockup-wrapper">
      {/* Dynamic ambient backlight */}
      <div className={`phone-ambient-glow ${isMoving ? "active-pulse" : ""}`} />

      {/* Main iPhone Mockup Device Container */}
      <div className="real-iphone-container">
        {/* Inner Screen Area: Sub-pixel alignment inside the iPhone cutout */}
        <div className="real-iphone-screen-viewport">
          {/* OLED Black Background */}
          <div className="screen-oled-bg" />

          {/* WebGL Canvas with Rotating 3D Spheres */}
          <div className="screen-canvas-holder">{children}</div>

          {/* Home swipe indicator at bottom of screen */}
          <div className="iphone-home-bar" aria-hidden="true" />
        </div>

        {/* The Exact iPhone Frame (Transparent Cutout Overlay) */}
        <picture>
          <source srcSet="/iphone-screen-cutout.webp" type="image/webp" />
          <img
            src="/iphone-screen-cutout.png"
            alt="iPhone 16 Pro Titanium"
            className="real-iphone-bezel-img"
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Live Dynamic Island Text Badge when item changes */}
        {activeTitle && (
          <div key={activeTitle} className="dynamic-island-live-hud">
            <span className="island-hud-dot" />
            <span className="island-hud-text">{activeTitle}</span>
          </div>
        )}
      </div>

      {/* Interaction Hint */}
      <div className="phone-interaction-hint">
        <span className="hint-pulse-circle" />
        <span className="hint-text">Drag sphere to rotate inside iPhone • Tap to view item</span>
      </div>
    </div>
  );
}

export default PhoneMockup;
