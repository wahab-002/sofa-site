import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1B1A",
        linen: "#FAF7F2",
        sand: "#F2ECE3",
        stone: "#E7E0D5",
        forest: {
          DEFAULT: "#2F3E33",
          dark: "#223027",
          light: "#43574A",
        },
        clay: "#8C5A3C",
        gold: "#C9A66B",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28,27,26,0.04), 0 8px 24px -12px rgba(28,27,26,0.14)",
        lift: "0 2px 4px rgba(28,27,26,0.04), 0 24px 48px -20px rgba(28,27,26,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.3s ease-out both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
