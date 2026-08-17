import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-gold-500/40 bg-gold-500/10 text-gold-300",
    gold: "border-transparent bg-gold-gradient text-dark-base font-bold",
    outline: "border-gold-500/50 text-gold-200",
    fest: "border-fest-crimson/50 bg-fest-crimson/20 text-red-200",
    dark: "border-white/10 bg-black/40 text-foreground/70",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-barlow-condensed font-semibold uppercase tracking-widest transition-colors",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
