// src/shared/theme/tokens.ts
export const tokens = {
  colors: {
    base: {
      black: "#151515",
      white: "#ffffff",
      darkGrey: "#717171",
      midGrey: "#aaaaaa",
      grey: "#b6cbcb",
    },
    monstrino: {
      black: "#0a0a0a",
      white: "#ffffff",
      purple: "#8b5fbf",
      pink: "#ff69b4",
      blue: "#4a90e2",
      green: "#66cc66",
      yellow: "#ffd93d",
      orange: "#ff8c42",
    },
  },
  radius: { sm: 6, md: 12, lg: 16, xl: 24, full: 9999 },
  spacing: (n: number) => `${n * 8}px`,
  font: {
    sans: `'Inter', 'Helvetica Neue', Arial, sans-serif`,
    mono: `'Fira Code', Menlo, Monaco, Consolas, monospace`,
  },
};
