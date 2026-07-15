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
          light: "#1B2F6E",
        },
        gold: {
          DEFAULT: "#F4B41A",
          light: "#FFC93C",
          dark: "#D99A06",
        },
        cream: "#F8F7F3",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        site: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
