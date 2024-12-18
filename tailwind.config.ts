import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable dark mode using 'class' strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom background color
        foreground: "var(--foreground)", // Custom foreground color
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"), // Add line-clamp plugin
  ],
} satisfies Config;
