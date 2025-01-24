import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables dark mode using class strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Include app directory
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", // Include custom libraries
  ],
  theme: {
    extend: {
      // Custom Colors
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
          DEFAULT: "#4f46e5", // Indigo 600
          dark: "#4338ca", // Indigo 700
          accent: "#6366f1", // Indigo 500
        },
        secondary: {
          DEFAULT: "#db2777", // Pink 600
          dark: "#be185d", // Pink 700
        },
        accent: {
          DEFAULT: "#0d9488", // Teal 600
          dark: "#0f766e", // Teal 700
        },
        success: {
          DEFAULT: "#059669", // Emerald 600
          dark: "#047857", // Emerald 700
        },
        warning: {
          DEFAULT: "#eab308", // Yellow 500
          dark: "#ca8a04", // Yellow 600
        },
        error: {
          DEFAULT: "#ef4444", // Red 500
          dark: "#dc2626", // Red 600
        },
        muted: {
          DEFAULT: "#64748b", // Slate 500
          dark: "#94a3b8", // Slate 400
        },
        gradient: {
          start: "#6366f1", // Indigo 500
          middle: "#8b5cf6", // Purple 500
          end: "#ec4899", // Pink 500
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
        neumorphic: "8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.5)",
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

      // Transition Timing Function
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
    require("@tailwindcss/aspect-ratio"), // Adds aspect-ratio plugin
    require("tailwindcss-animate"), // Adds animation plugin
    require("@tailwindcss/container-queries"), // Adds container queries plugin
  ],
};

export default config;