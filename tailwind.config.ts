import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jjibbabba: ["var(--font-uhbee-jjibbabba)", "sans-serif"],
        jjibbabbaBold: ["var(--font-uhbee-jjibbabba-bold)", "sans-serif"],
      },
      colors: {
        background: "#ffdfeb",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
