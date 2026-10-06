import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand tokens lifted from The Learning Tribe's Instagram design system
        navy: {
          DEFAULT: "#0F1E4B",
          dark: "#0A1435",
          deeper: "#070F28",
          ink: "#040919",
          light: "#1B2F6E",
          soft: "#2A4290",
        },
        gold: {
          DEFAULT: "#F4B41A",
          light: "#FFC93C",
          dark: "#D99A06",
          deep: "#A87500",
          pale: "#FFF6DC",
        },
        cream: {
          DEFAULT: "#F8F7F3",
          warm: "#F3EFE4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
      },
      maxWidth: {
        site: "76rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(244,180,26,0.35), 0 18px 50px -12px rgba(244,180,26,0.45)",
        card: "0 1px 2px rgba(10,20,53,0.06), 0 12px 32px -12px rgba(10,20,53,0.18)",
        lift: "0 2px 4px rgba(10,20,53,0.06), 0 28px 60px -20px rgba(10,20,53,0.35)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%,-6%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%,4%,0) scale(0.96)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rise: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateY(-110vh)", opacity: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin 60s linear infinite",
        "spin-slower": "spin 90s linear infinite reverse",
        ping: "ping 2.4s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
