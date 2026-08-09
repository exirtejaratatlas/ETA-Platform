/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Vazirmatn", "system-ui", "sans-serif"],
        display: ["Inter", "Vazirmatn", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      // Type scale — ETA-Blueprint 20-BRANDING/04-Visual-Identity/Typography.md (ETA-VISUAL-002, Approved).
      // Sizes/line-heights/letter-spacing copied verbatim; not yet applied to any component (token definition only).
      // Display's approved range is 48-64px; 48px (the lower bound) is used as the token value.
      fontSize: {
        // Display scale — ETA-Blueprint 13-DECISIONS/ETA-Website-Typography-Decision-Resolution-
        // T12-T13.md (T13, Approved) and .../ETA-Website-Typography-Decision-Resolution-T14.md
        // (T14, naming). Three-step responsive scale for Home's hero only: `display-sm` (mobile/
        // base) → `display` (tablet/sm:, unchanged from its pre-existing 48px value) →
        // `display-lg` (desktop/lg:). Pair as `text-display-sm sm:text-display lg:text-display-lg`.
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 36px, hero mobile
        display: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 48px, hero tablet (sm:+)
        "display-lg": ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 56px, hero desktop (lg:+)
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 40px, major page titles
        h2: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 32px, section titles
        h3: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 24px, subsections
        // 20px, "Heading 4" per Typography.md. Also reused below as the desktop (sm:+) step
        // of `component-title` — see that entry for why there isn't a second 20px token.
        h4: ["1.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Component Title — ETA-Blueprint 13-DECISIONS/ETA-Website-Typography-Execution-
        // Decision-Resolution.md (T6, Approved). Mobile/base value only (18px); the desktop
        // (20px) step is the existing `h4` token above, reused as-is rather than duplicated,
        // since both need identical heading-style line-height/letter-spacing. Pair as
        // `text-component-title sm:text-h4` at call sites. Weight (600 / font-semibold) is
        // applied via a separate `font-semibold` utility at each usage site, same as every
        // other heading token here — Tailwind's fontSize scale doesn't carry font-weight.
        // Purpose per T6: card titles, capability titles, industry titles, component headers.
        // Explicitly not `body-lg` — see T6 for why (body-lg carries body-style 150%/0%
        // line-height/letter-spacing, not this role's heading-style treatment).
        "component-title": ["1.125rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5", letterSpacing: "0" }], // 18px, highlighted paragraphs
        body: ["1rem", { lineHeight: "1.5", letterSpacing: "0" }], // 16px, default content
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }], // 14px, secondary information
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.01em" }], // 12px, metadata/timestamps/helper text
      },
      colors: {
        // ETA Copper — primary accent color, ETA-Blueprint 20-BRANDING/04-Visual-Identity/Colors.md (ETA-VISUAL-001)
        // Note: surface-900 (#0f172a) already matches "ETA Navy" from the same spec — reused as-is, not duplicated here.
        copper: {
          50: "#fdf6ef",
          100: "#faebd9",
          200: "#f3d3ae",
          300: "#e9b378",
          400: "#dc9855",
          500: "#c57b39",
          600: "#a8632c",
          700: "#874f25",
          800: "#6d4122",
          900: "#5a371f",
          950: "#301b0f",
        },
        // Semantic tokens
        success: {
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#15803d",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        error: {
          DEFAULT: "#dc2626",
          light: "#ef4444",
          dark: "#b91c1c",
        },
        info: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1d4ed8",
        },
        // Neutral surfaces
        surface: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "38": "9.5rem",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        card: "0 2px 8px -2px rgb(0 0 0 / 0.06), 0 4px 16px -4px rgb(0 0 0 / 0.08)",
        elevated: "0 4px 16px -2px rgb(0 0 0 / 0.08), 0 8px 32px -4px rgb(0 0 0 / 0.12)",
        "glow-copper": "0 0 0 1px rgb(197 123 57 / 0.1), 0 4px 24px -4px rgb(197 123 57 / 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-in-up": "fadeInUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
