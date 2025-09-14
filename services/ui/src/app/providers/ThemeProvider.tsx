// src/app/providers/ThemeProvider.tsx
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { makeTheme } from "@/shared/theme/theme";
import { GlobalStyles } from "@/shared/theme/GlobalStyles";

export const AppThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<"light" | "dark">(
    (localStorage.getItem("themeMode") as "light" | "dark") || "dark"
  );

  const theme = React.useMemo(() => makeTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
