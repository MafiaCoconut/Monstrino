import { releaseHubTokens } from "../designTokens";

const t = releaseHubTokens;

export const infoPageSx = {
  minHeight: "100vh",
  backgroundColor: t.colors.bg,
  backgroundImage: t.gradients.pageBg,
  color: t.colors.textPrimary,
  fontFamily: t.typography.fontFamily.primary,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  "& .text-foreground": { color: t.colors.textPrimary },
  "& .text-muted-foreground": { color: t.colors.textSecondary },
  "& .text-primary": { color: t.colors.accentPink },
  "& .text-secondary": { color: t.colors.accentPurple },
  "& .text-primary-foreground": { color: t.colors.textPrimary },
  "& .text-border": { color: t.colors.textMuted },
  "& .bg-card": { backgroundColor: t.colors.surface },
  "& .bg-muted": { backgroundColor: t.colors.surfaceAlt },
  "& .bg-muted\/30": { backgroundColor: t.transparency.white06 },
  "& .border-border": { borderColor: t.colors.borderSoft },
  "& .border-border\/50": { borderColor: t.colors.borderSoft },
  "& .bg-primary": { backgroundColor: t.colors.accentPink },
  "& .bg-primary\/10": { backgroundColor: "rgba(236, 72, 153, 0.1)" },
  "& .bg-secondary\/10": { backgroundColor: "rgba(139, 92, 246, 0.1)" },
  "& .hover\:bg-muted:hover": { backgroundColor: t.colors.surfaceAlt },
  "& .hover\:bg-primary\/90:hover": { backgroundColor: t.colors.accentPinkDark },
  "& .hover\:underline:hover": { textDecoration: "underline" },
} as const;

export const infoSurfaceSx = {
  backgroundColor: t.colors.surface,
  border: `1px solid ${t.colors.borderSoft}`,
  borderRadius: t.radius.md,
} as const;

export { t as releaseHubInfoTokens };
