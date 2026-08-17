import React from "react";
import { Wifi, Signal, Sparkles } from "lucide-react";

/**
 * PhoneMockup component:
 * - 75% visible half-bleed showcase on the right side of the screen
 * - Larger responsive presence (`h-[80vh] sm:h-[86vh] lg:h-[92vh] max-h-[860px]`)
 * - translate-x-[28%] so that exactly 75% of the phone is visible on screen
 * - Dark OLED theme with titanium frame, Dynamic Island, and HUD glass card
 */
export function PhoneMockup({ children, activeTitle = "Abhav 2K26" }) {
  return (
    <div className="relative w-full flex justify-end items-center select-none overflow-visible">
      {/* 
        - Bigger phone frame: h-[80vh] sm:h-[86vh] lg:h-[92vh] max-h-[860px] aspect-[9/18.8]
        - translate-x-[20%] sm:translate-x-[25%] lg:translate-x-[28%] ensures only ~75% is visible, bleeding off the right edge
      */}
      <div className="relative h-[78vh] sm:h-[85vh] lg:h-[92vh] max-h-[860px] aspect-[9/18.8] translate-x-[18%] sm:translate-x-[24%] lg:translate-x-[28%] z-10 flex items-center justify-center transition-all duration-300">
        
        {/* Real Metallic Titanium Hardware Bezel with glowing edge */}
        <div className="relative w-full h-full rounded-[46px] sm:rounded-[56px] lg:rounded-[64px] p-[6px] sm:p-[7px] lg:p-[8px] bg-gradient-to-tr from-[#8E4316] via-[#F4B27C] to-[#5C2B0B] shadow-[0_30px_100px_rgba(0,0,0,0.98),0_0_0_1px_rgba(255,255,255,0.22)]">
          
          {/* Inner OLED Screen (Dark Theme) */}
          <div className="relative w-full h-full rounded-[40px] sm:rounded-[50px] lg:rounded-[58px] overflow-hidden bg-[#0A0908] flex flex-col justify-between shadow-[inset_0_0_25px_rgba(0,0,0,0.95)]">
            
            {/* Top iOS Status Bar & Dynamic Island */}
            <div className="relative z-30 w-full pt-3.5 px-6 sm:px-7 flex items-center justify-between text-white text-xs font-semibold tracking-tight">
              {/* Clock */}
              <span className="w-12 text-left font-sans text-xs sm:text-sm font-medium tracking-normal text-white/90">
                3:35
              </span>

              {/* Dynamic Island Pill */}
              <div className="relative flex items-center justify-between px-3 w-[105px] sm:w-[120px] h-[26px] sm:h-[30px] bg-black rounded-full border border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.85)] -mt-0.5">
                {/* Recording indicator dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/90 animate-pulse" />
                {/* Camera lens optic */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#080B16] border border-[#1A2645] relative flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-500/80" />
                </div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 w-12 justify-end text-white/90">
                <Signal className="w-3 h-3 fill-current" />
                <Wifi className="w-3 h-3" />
                <div className="w-4.5 h-2.5 rounded-[2px] border border-white/80 p-[1px] flex items-center">
                  <div className="h-full w-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* 3D Canvas Area */}
            <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#120F0D] via-[#090807] to-[#120F0D]">
              {children}

              {/* DARK THEME HUD GLASS CARD */}
              <div className="absolute left-4 right-4 bottom-6 z-20 flex flex-col items-center gap-1 text-center pointer-events-none">
                <div className="w-full max-w-[260px] sm:max-w-[290px] px-4 py-2.5 rounded-2xl bg-black/80 border border-gold-500/35 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-1">
                  <div className="font-anton text-lg sm:text-xl text-foreground uppercase tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-1">
                    {activeTitle || "Archive Item"}
                  </div>
                  <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-barlow-condensed font-semibold tracking-[0.22em] uppercase text-gold-300">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span>DRAG TO SPIN · SCROLL TO ZOOM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom iOS Home Indicator */}
            <div className="relative z-30 w-full py-2 flex justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-28 sm:w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneMockup;
