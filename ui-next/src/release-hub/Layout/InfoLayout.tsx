'use client';

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import InfoHeader from "./InfoHeader";
import { Footer } from "./Footer";

const InfoLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <InfoHeader />

      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default InfoLayout;
