import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable dark mode using 'class' strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom light and dark mode colors
        background: {
          light: "#f9fafb", // Light mode background
          dark: "#1f2937", // Dark mode background
        },
        foreground: {
          light: "#1f2937", // Light mode text
          dark: "#f9fafb", // Dark mode text
        },
        primary: {
          light: "#3b82f6", // Light mode primary color
          dark: "#2563eb", // Dark mode primary color
        },
      },
      borderRadius: {
        lg: "12px", // Larger border radius for smooth edges
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"), // Line clamping for text
    require("@tailwindcss/forms"), // Clean form styling
    require("@tailwindcss/aspect-ratio"), // Maintain image aspect ratios
  ],
} satisfies Config;
