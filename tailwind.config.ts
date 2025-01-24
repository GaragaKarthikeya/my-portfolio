import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base color definitions
        background: {
          DEFAULT: "#f9fafb", // Light mode default
          dark: "#1f2937",    // Dark mode default
        },
        foreground: {
          DEFAULT: "#1f2937", // Light mode text
          dark: "#f9fafb",    // Dark mode text
        },
        primary: {
          DEFAULT: "#3b82f6", // Light primary
          dark: "#2563eb",    // Dark primary
          accent: "#60a5fa",  // Primary accent
        },
        // Additional theme colors
        secondary: {
          DEFAULT: "#4f46e5", 
          dark: "#4338ca",
        },
        muted: {
          DEFAULT: "#6b7280",
          dark: "#9ca3af",
        },
        // Gradient colors
        gradient: {
          start: "#3b82f6",   // Primary
          middle: "#8b5cf6",  // Purple
          end: "#ec4899",     // Pink
        }
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      // Animation extensions
      animation: {
        "progress-bar": "progress 2s linear infinite",
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;