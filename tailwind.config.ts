import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables dark mode via a CSS class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Include app directory
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", // Include custom libraries
  ],
  theme: {
    extend: {
      // Font Family
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      // Custom Colors - Warm Sunset Theme
      colors: {
        background: {
          DEFAULT: "rgb(var(--background) / <alpha-value>)",
          dark: "rgb(var(--background-dark) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--foreground) / <alpha-value>)",
          dark: "rgb(var(--foreground-dark) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "#ea580c", // Orange 600
          dark: "#c2410c", // Orange 700
          accent: "#f97316", // Orange 500
        },
        secondary: {
          DEFAULT: "#e11d48", // Rose 600
          dark: "#be123c", // Rose 700
        },
        accent: {
          DEFAULT: "#f59e0b", // Amber 500
          dark: "#d97706", // Amber 600
        },
        success: {
          DEFAULT: "#059669", // Emerald 600
          dark: "#047857", // Emerald 700
        },
        warning: {
          DEFAULT: "#f59e0b", // Amber 500
          dark: "#d97706", // Amber 600
        },
        error: {
          DEFAULT: "#ef4444", // Red 500
          dark: "#dc2626", // Red 600
        },
        muted: {
          DEFAULT: "#78716c", // Stone 500
          dark: "#a8a29e", // Stone 400
        },
        gradient: {
          start: "#f97316", // Orange 500
          middle: "#f59e0b", // Amber 500
          end: "#e11d48", // Rose 600
        },
      },

      // Border Radius
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },

      // Border Colors
      borderColor: {
        DEFAULT: "rgb(var(--border-light) / <alpha-value>)",
        dark: "rgb(var(--border-dark) / <alpha-value>)",
      },

      // Backdrop Blur
      backdropBlur: {
        "3xl": "48px",
        "4xl": "64px",
      },

      // Box Shadows
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        neumorphic:
          "8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.5)",
        depth: "0 24px 48px -12px rgba(0,0,0,0.18)",
        "inner-lg": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },

      // Animations
      animation: {
        "gradient-border": "gradient-border 8s ease infinite",
        shine: "shine 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        skeleton: "skeleton 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      // Background Images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Keyframes
      keyframes: {
        "gradient-border": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shine: {
          to: { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        skeleton: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.2" },
        },
      },

      // Transition Timing Functions
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      // Transition Properties
      transitionProperty: {
        height: "height",
        width: "width",
        size: "width, height",
        glass: "background, backdrop-filter, box-shadow",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Adds form plugin
    require("@tailwindcss/aspect-ratio"), // Adds aspect ratio plugin
    require("tailwindcss-animate"), // Adds animation utilities
    require("@tailwindcss/container-queries") // Adds container queries
  ],
};

export default config;
