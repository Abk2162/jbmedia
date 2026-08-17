import React from "react";
import { Wifi, Signal, Sparkles, ZoomIn } from "lucide-react";

/**
 * PhoneMockup component matching the reference screenshot layout:
 * - Positioned on the right, bleeding into the right margin (half-phone showcase)
 * - Uses the user's uploaded titanium iPhone frame with Dynamic Island
 * - Houses the interactive 3D Fibonacci sphere with zoom and drag controls
 */
export function PhoneMockup({ children, activeTitle = "Abhav 2K26" }) {
  return (
    <div className="relative w-full flex justify-end items-center select-none overflow-visible">
      {/* Phone container positioned on the right, bleeding off-screen like reference */}
      <div className="relative w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] aspect-[9/18.5] translate-x-12 sm:translate-x-20 lg:translate-x-28 xl:translate-x-32 transition-transform duration-300">
        
        {/* Real iPhone Outer Titanium Frame with Sleek Metallic Finish */}
        <div className="relative w-full h-full rounded-[52px] sm:rounded-[64px] p-[6px] sm:p-[8px] bg-gradient-to-tr from-[#DE7E3B] via-[#F4B27C] to-[#9E4F1B] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.25)]">
          
          {/* Inner Black OLED Screen */}
          <div className="relative w-full h-full rounded-[46px] sm:rounded-[56px] overflow-hidden bg-[#0A0908] flex flex-col justify-between shadow-[inset_0_0_25px_rgba(0,0,0,0.9)]">
            
            {/* Top iOS Status Bar & Dynamic Island */}
            <div className="relative z-30 w-full pt-3 px-6 sm:px-8 flex items-center justify-between text-white text-xs font-semibold tracking-tight">
              {/* Time */}
              <span className="w-12 text-left font-sans text-xs sm:text-sm font-medium tracking-normal text-white/90">
                3:35
              </span>

              {/* Dynamic Island Pill (matching reference screenshot) */}
              <div className="relative flex items-center justify-between px-3 w-[112px] sm:w-[124px] h-[28px] sm:h-[32px] bg-black rounded-full border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.8)] -mt-0.5">
                {/* Recording indicator dot */}
                <div className="w-2 h-2 rounded-full bg-red-500/90 animate-pulse" />
                {/* Camera lens optic */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#080B16] border border-[#1A2645] relative flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-500/80" />
                </div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 w-12 justify-end text-white/90">
                <Signal className="w-3 h-3 fill-current" />
                <Wifi className="w-3 h-3" />
                <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-0.5 flex items-center">
                  <div className="h-full w-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Interactive Screen Canvas Area */}
            <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-b from-[#120F0D] via-[#090807] to-[#120F0D]">
              {children}

              {/* Bottom Active Title & Controls Indicator */}
              <div className="absolute left-4 right-4 bottom-5 z-20 flex flex-col items-center gap-1.5 text-center pointer-events-none">
                <div className="w-full max-w-[260px] sm:max-w-[290px] px-3.5 py-2 rounded-2xl bg-black/85 border border-gold-500/30 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-1">
                  <div className="font-anton text-xl sm:text-2xl text-foreground uppercase tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] line-clamp-1">
                    {activeTitle}
                  </div>
                  <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-barlow-condensed font-semibold tracking-[0.22em] uppercase text-gold-300">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span>DRAG TO SPIN</span>
                    <span className="text-gold-500/40">·</span>
                    <ZoomIn className="w-3 h-3 text-gold-400" />
                    <span>SCROLL TO ZOOM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator */}
            <div className="relative z-30 w-full py-2 flex justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
