import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variants = {
      default:
        "bg-gold-gradient text-dark-base font-barlow-condensed font-semibold tracking-widest uppercase hover:shadow-[0_10px_30px_rgba(212,162,46,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border-none",
      outline:
        "border border-gold-500/60 bg-transparent text-gold-300 font-barlow-condensed font-semibold tracking-widest uppercase hover:border-gold-300 hover:text-gold-100 hover:bg-gold-500/10 hover:-translate-y-0.5 transition-all duration-200",
      ghost:
        "text-foreground hover:text-gold-300 hover:bg-white/5 transition-colors duration-150 font-barlow-condensed tracking-wider",
      fest:
        "bg-fest-crimson text-white font-barlow-condensed font-semibold tracking-widest uppercase hover:bg-red-700 hover:shadow-[0_8px_25px_rgba(179,18,28,0.4)] transition-all duration-200",
      glass:
        "glass-panel text-gold-100 hover:text-white hover:border-gold-400/50 hover:bg-black/80 font-barlow-condensed tracking-widest uppercase transition-all duration-200",
    };

    const sizes = {
      default: "h-12 px-6 py-2 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant] || variants.default,
          sizes[size] || sizes.default,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
