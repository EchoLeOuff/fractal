import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds (fractal.css)
        base: "#0a0a0a",
        surface: "#111111",
        elevated: "#171717",
        // Text
        primary: "#fafafa",
        secondary: "#a1a1a1",
        tertiary: "#737373",
        muted: "#525252",
        // Brand
        accent: { DEFAULT: "#10b981", hover: "#059669" },
        // Semantic
        positive: "#10b981",
        negative: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
        // Borders (rgba sur blanc)
        "border-subtle": "rgba(255,255,255,0.06)",
        "border-default": "rgba(255,255,255,0.10)",
        "border-strong": "rgba(255,255,255,0.16)",
      },
      borderColor: {
        subtle: "rgba(255,255,255,0.06)",
        DEFAULT: "rgba(255,255,255,0.10)",
        strong: "rgba(255,255,255,0.16)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "0.25rem", sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem",
      },
      maxWidth: { content: "80rem" },
      transitionTimingFunction: {
        "ease-out-fractal": "cubic-bezier(0.16,1,0.3,1)",
        smooth: "cubic-bezier(0.4,0,0.2,1)",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        livePulse: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        scaleIn: { from: { opacity: "0", transform: "scale(0.97)" }, to: { opacity: "1", transform: "scale(1)" } },
        fadeInUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "live-pulse": "livePulse 1.8s ease-in-out infinite",
        "fade-in": "fadeIn 200ms cubic-bezier(0.4,0,0.2,1)",
        "scale-in": "scaleIn 250ms cubic-bezier(0.16,1,0.3,1)",
        "fade-in-up": "fadeInUp 500ms cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};
export default config;
