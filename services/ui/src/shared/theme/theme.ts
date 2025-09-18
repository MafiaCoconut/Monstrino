// src/shared/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

export const makeTheme = (mode: "light" | "dark" = "dark") =>
  createTheme({
    // Включаем генерацию CSS-переменных: --mui-palette-*, --mui-typography-*, и т.д.
    // Рекомендовано в v6+; работает через обычный ThemeProvider. 
    // https://mui.com/material-ui/customization/css-theme-variables/overview/
    cssVariables: true,

    palette: {
      mode,
      primary: { main: tokens.colors.monstrino.pink },
      secondary: { main: tokens.colors.monstrino.purple },
      text: {
        primary:
          mode === "dark" ? tokens.colors.monstrino.white : tokens.colors.base.black,
        secondary: tokens.colors.base.midGrey,
      },
      background: {
        default: tokens.colors.monstrino.black,
        paper: mode === "dark" ? "#121212" : "#f7f7f7",
      },
      monstrino: { ...tokens.colors.monstrino },
    },

    shape: { borderRadius: tokens.radius.md },
    spacing: tokens.spacing,

    typography: {
      fontFamily: tokens.font.sans,
      h1: { fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1 },
      h2: { fontWeight: 700, lineHeight: 1.125 },
      h5: { fontWeight: 600, lineHeight: 1.375 },
      body1: { lineHeight: 1.5 },
      body2: { lineHeight: 1.45 },
      button: {
        textTransform: "uppercase",
        letterSpacing: "0.0875em",
        fontFamily: tokens.font.mono,
        lineHeight: 1,
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: tokens.radius.full, transition: "all .3s ease", minHeight: 44 },
          containedPrimary: {
            background: tokens.colors.monstrino.pink,
            color: tokens.colors.monstrino.black,
            border: `1px solid ${tokens.colors.monstrino.pink}`,
            "&:hover": { opacity: 0.9, transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(255,105,180,.3)" },
            "&:focus-visible": { outline: `2px solid ${tokens.colors.monstrino.pink}`, outlineOffset: 2 },
          },
          outlinedSecondary: {
            background: tokens.colors.monstrino.purple,
            color: tokens.colors.monstrino.white,
            border: `1px solid ${tokens.colors.monstrino.purple}`,
            "&:hover": { opacity: 0.9, transform: "scale(1.05)" },
            "&:focus-visible": { outline: `2px solid ${tokens.colors.monstrino.pink}`, outlineOffset: 2 },
          },
        },
        variants: [
          { props: { size: "large", variant: "contained", color: "primary" }, style: { padding: "1rem 2rem", fontSize: ".875rem" } },
        ],
      },

      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.monstrino.pink,
            fontSize: "1rem",
            textDecoration: "none",
            transition: "all .15s ease",
            position: "relative",
            "&:hover": { textDecoration: "underline", color: theme.palette.monstrino.white },
            "&:focus-visible": { outline: `2px solid ${tokens.colors.monstrino.pink}`, outlineOffset: 2 },
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.lg,
            // legacy layout overrides:
            // padding: tokens.spacing(3),
            // minHeight: 300,
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-between",
            // transition: "all .2s ease",
            // "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,.3)" },
            // ...((theme) => theme.applyStyles?.("dark", { "&:hover": { transform: "translateY(-4px)" } })),
            backgroundImage: "none",
            transition: "box-shadow 0.2s ease",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
            "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,.3)" },
          },
        },
      },
    },
  });
