import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        beige: "#F7F2EA",
        blush: "#F4C6C9",
        "blush-soft": "#FAE1E2",
        gold: "#C9A66B",
        charcoal: "#2B2B2B",
        "charcoal-soft": "#5C5652",
        line: "#EAE0D5",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
