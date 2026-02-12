export const releaseHubTokens = {
  colors: {
    bg: "#0B0D11",
    bgDeep: "#0A0A0A",
    bgLight: "#111111",
    bgAlt: "#121622",

    surface: "hsl(240, 5%, 8%)",
    surfaceAlt: "hsl(240, 4%, 14%)",
    surfaceMuted: "rgba(255,255,255,0.03)",

    borderSoft: "rgba(255,255,255,0.08)",
    border: "hsl(240, 4%, 18%)",
    borderDark: "#2a2a2a",

    textPrimary: "#FFFFFF",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
    textMutedAlt: "hsl(240, 5%, 58%)",

    accentPink: "#EC4899",
    accentPinkDark: "#BE185D",
    accentMagenta: "#FF1493",
    accentPurple: "#8B5CF6",
    accentViolet: "#A855F7",
    accentLavender: "#A78BFA",
    accentCyan: "#22D3EE",
    accentCyanDeep: "#06B6D4",
    accentBlue: "#3B82F6",
    accentOrange: "#F97316",
    accentGreen: "#22C55E",
  },

  gradients: {
    pageBg:
      "radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)",
    cardGlowPink: "0 8px 24px rgba(236, 72, 153, 0.15)",
    cardGlowPurple: "0 12px 40px rgba(139, 92, 246, 0.15)",
    headerWordmark: "linear-gradient(90deg, #ff7edb 0%, #9d4edd 100%)",
    footerLogo: "linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)",
  },

  typography: {
    fontFamily: {
      primary:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      system:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      accentSerif: '"Crimson Text", Georgia, serif',
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
  },

  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    pill: "9999px",
  },

  shadows: {
    card: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    hoverPink: "0 8px 24px rgba(236, 72, 153, 0.15)",
    hoverPurple: "0 12px 40px rgba(139, 92, 246, 0.15)",
  },

  transparency: {
    white03: "rgba(255,255,255,0.03)",
    white06: "rgba(255,255,255,0.06)",
    white08: "rgba(255,255,255,0.08)",
    pink20: "rgba(236, 72, 153, 0.2)",
    purple20: "rgba(139, 92, 246, 0.15)",
    cyan20: "rgba(0, 212, 255, 0.2)",
  },
} as const;

export type ReleaseHubTokens = typeof releaseHubTokens;
