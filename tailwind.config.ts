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
        background: {
          DEFAULT: "rgb(var(--background) / <alpha-value>)",
          dark: "rgb(var(--background) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--foreground) / <alpha-value>)",
          dark: "rgb(var(--foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
          accent: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#4f46e5", 
          dark: "#4338ca",
        },
        muted: {
          DEFAULT: "#6b7280",
          dark: "#9ca3af",
        },
        gradient: {
          start: "#3b82f6",
          middle: "#8b5cf6",
          end: "#ec4899",
        }
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      backdropBlur: {
        '3xl': '48px',
      },
      backgroundOpacity: {
        15: '0.15',
        40: '0.4',
        70: '0.7',
        80: '0.8',
        90: '0.9',
        95: '0.95',
      },
      borderOpacity: {
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
      },
      animation: {
        "progress-bar": "progress 2s linear infinite",
        "gradient-border": "gradient-border 5s ease infinite",
        "shine": "shine 3s linear infinite",
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "gradient-border": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shine: {
          to: { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "inner-lg": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;