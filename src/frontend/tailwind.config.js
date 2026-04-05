import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        /* Legacy brand aliases mapped to electric blue neural theme */
        brand: {
          teal: "oklch(60% 0.25 230)",
          "teal-light": "oklch(60% 0.25 230 / 0.2)",
          "teal-dark": "oklch(50% 0.28 230)",
          orange: "oklch(60% 0.25 230)",
          "orange-dark": "oklch(50% 0.28 230)",
          wash: "oklch(60% 0.25 230 / 0.05)",
          heading: "oklch(97% 0.005 250)",
          body: "oklch(60% 0.01 250)",
        },
        neon: {
          cyan: "#00AAFF",
          blue: "#0066FF",
          purple: "#7B2FBE",
        },
        /* Legacy color tokens */
        gold: {
          DEFAULT: "oklch(60% 0.25 230)",
          400: "oklch(65% 0.25 230)",
          800: "oklch(25% 0.05 250)",
        },
        crimson: {
          DEFAULT: "oklch(45% 0.22 290)",
          300: "oklch(70% 0.18 290)",
          600: "oklch(30% 0.15 290)",
          800: "oklch(18% 0.05 250)",
        },
        cream: {
          DEFAULT: "oklch(97% 0.005 250)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.5)",
        blue: "0 0 20px oklch(60% 0.25 230 / 0.3), 0 0 40px oklch(60% 0.25 230 / 0.12)",
        "blue-lg": "0 0 40px oklch(60% 0.25 230 / 0.4), 0 0 80px oklch(60% 0.25 230 / 0.2)",
        /* Legacy shadow names mapped to blue */
        gold: "0 0 20px oklch(60% 0.25 230 / 0.3), 0 0 40px oklch(60% 0.25 230 / 0.12)",
        "gold-lg": "0 0 40px oklch(60% 0.25 230 / 0.4), 0 0 80px oklch(60% 0.25 230 / 0.2)",
        teal: "0 4px 20px oklch(60% 0.25 230 / 0.25)",
        orange: "0 4px 20px oklch(60% 0.25 230 / 0.25)",
        neon: "0 0 20px oklch(60% 0.25 230 / 0.4), 0 0 40px oklch(60% 0.25 230 / 0.15)",
        "neon-green": "0 0 20px oklch(60% 0.25 230 / 0.35), 0 0 40px oklch(60% 0.25 230 / 0.12)",
        crimson: "0 0 20px oklch(45% 0.22 290 / 0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "blue-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 12px oklch(60% 0.25 230 / 0.4), 0 0 24px oklch(60% 0.25 230 / 0.15)",
          },
          "50%": {
            boxShadow: "0 0 20px oklch(60% 0.25 230 / 0.65), 0 0 40px oklch(60% 0.25 230 / 0.3)",
          },
        },
        /* Legacy keyframe names */
        "gold-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 12px oklch(60% 0.25 230 / 0.4), 0 0 24px oklch(60% 0.25 230 / 0.15)",
          },
          "50%": {
            boxShadow: "0 0 20px oklch(60% 0.25 230 / 0.65), 0 0 40px oklch(60% 0.25 230 / 0.3)",
          },
        },
        "neon-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 12px oklch(60% 0.25 230 / 0.4), 0 0 24px oklch(60% 0.25 230 / 0.15)",
          },
          "50%": {
            boxShadow: "0 0 20px oklch(60% 0.25 230 / 0.65), 0 0 40px oklch(60% 0.25 230 / 0.3)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.4s ease-out",
        "blue-pulse": "blue-pulse 2.5s ease-in-out infinite",
        "gold-pulse": "blue-pulse 2.5s ease-in-out infinite",
        "neon-pulse": "blue-pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
