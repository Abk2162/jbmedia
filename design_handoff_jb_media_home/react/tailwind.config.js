/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(212, 162, 46, 0.22)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "rgba(212, 162, 46, 0.5)",
        background: "#0A0908",
        foreground: "#F7F1E4",
        gold: {
          50: "#FFF9EB",
          100: "#FBEBC0",
          200: "#F8DF8F",
          300: "#F5C542",
          400: "#E3B336",
          500: "#D4A22E",
          600: "#B88620",
          700: "#A97418",
          800: "#8B5B13",
          900: "#6B4610",
        },
        dark: {
          base: "#0A0908",
          card: "#100E0C",
          surface: "#161311",
          elevated: "#1F1A16",
          border: "#282019",
          highlight: "#3A2A16",
        },
        ember: {
          dark: "#0B0908",
          DEFAULT: "#70330D",
          light: "#DB8524",
        },
        fest: {
          crimson: "#B3121C",
        },
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        "barlow-condensed": ["Barlow Condensed", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 35s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(160deg, #FBEBC0, #F5C542 22%, #D4A22E 48%, #A97418 74%, #F5C542)",
        "ember-gradient": "linear-gradient(135deg, #0B0908 0%, #70330D 50%, #DB8524 100%)",
        "card-gradient": "linear-gradient(150deg, #241D17, #100E0C 55%, #191410)",
        "scrim-gradient": "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.85) 70%, #0A0908 100%)",
      },
    },
  },
  plugins: [],
};
