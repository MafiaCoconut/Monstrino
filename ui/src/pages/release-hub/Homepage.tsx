import { ThemeProvider, alpha, createTheme } from "@mui/material";

import {
  HeroSection,
  HomepageContent,
  StatsSection,
} from "./Homepage.widgets";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#070812",
      paper: "#0b0d19",
    },
    primary: {
      main: "#ff2bb6",
    },
    secondary: {
      main: "#31d3ff",
    },
    text: {
      primary: "#E9E9F2",
      secondary: alpha("#E9E9F2", 0.72),
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 800, letterSpacing: -1.2 },
    h2: { fontWeight: 800, letterSpacing: -0.8 },
    h3: { fontWeight: 800, letterSpacing: -0.6 },
    h4: { fontWeight: 800, letterSpacing: -0.4 },
    button: { textTransform: "none", fontWeight: 700 },
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HeroSection />
      <StatsSection />
      <HomepageContent />
    </ThemeProvider>
  );
}
