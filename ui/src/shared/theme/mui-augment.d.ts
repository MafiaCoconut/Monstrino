// src/shared/theme/mui-augment.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    monstrino: {
      black: string; white: string;
      purple: string; pink: string; blue: string;
      green: string; yellow: string; orange: string;
    };
  }
  interface PaletteOptions {
    monstrino?: Partial<Palette["monstrino"]>;
  }
}
