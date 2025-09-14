// src/shared/theme/GlobalStyles.tsx
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

export function GlobalStyles() {
  return (
    <MUIGlobalStyles
      styles={(theme) => ({
        html: { scrollBehavior: "smooth" },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          fontFamily: theme.typography.fontFamily,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        ".App": { textAlign: "left" },

        // Контейнеры/сетки (из твоего CSS):
        ".container": { maxWidth: 1920, margin: "0 auto", width: "100%" },
        ".portfolio-grid": {
          display: "grid",
          gap: "1.25rem 1.5rem",
          padding: "1.5rem",
          maxWidth: 1920,
          margin: "0 auto",
          "@media (min-width:1024px)": { gap: "2rem 2rem", padding: "2rem" },
        },

        ".backdrop-blur-sm": { backdropFilter: "blur(4px)" },
        ".backdrop-blur-md": { backdropFilter: "blur(12px)" },

        // Анимации
        "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
        "@keyframes slideInUp": { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        ".fade-in": { opacity: 0, animation: "fadeIn .7s ease-out forwards" },
        ".stagger-item": { opacity: 0, transform: "translateY(20px)", animation: "slideInUp .5s ease-out forwards" },

        // Маппинг твоих утилитарных классов на палитру темы:
        ".bg-monstrino-black": { backgroundColor: theme.palette.monstrino.black },
        ".bg-monstrino-white": { backgroundColor: theme.palette.monstrino.white },
        ".bg-monstrino-purple": { backgroundColor: theme.palette.monstrino.purple },
        ".bg-monstrino-pink": { backgroundColor: theme.palette.monstrino.pink },
        ".bg-monstrino-blue": { backgroundColor: theme.palette.monstrino.blue },
        ".bg-monstrino-green": { backgroundColor: theme.palette.monstrino.green },
        ".bg-monstrino-yellow": { backgroundColor: theme.palette.monstrino.yellow },
        ".bg-monstrino-orange": { backgroundColor: theme.palette.monstrino.orange },

        ".text-monstrino-black": { color: theme.palette.monstrino.black },
        ".text-monstrino-white": { color: theme.palette.monstrino.white },
        ".text-monstrino-purple": { color: theme.palette.monstrino.purple },
        ".text-monstrino-pink": { color: theme.palette.monstrino.pink },
        ".text-monstrino-blue": { color: theme.palette.monstrino.blue },
        ".text-monstrino-green": { color: theme.palette.monstrino.green },
        ".text-monstrino-yellow": { color: theme.palette.monstrino.yellow },
        ".text-monstrino-orange": { color: theme.palette.monstrino.orange },

        ".border-monstrino-purple": { borderColor: theme.palette.monstrino.purple },
        ".border-monstrino-pink": { borderColor: theme.palette.monstrino.pink },
        ".border-monstrino-white": { borderColor: theme.palette.monstrino.white },
      })}
    />
  );
}
