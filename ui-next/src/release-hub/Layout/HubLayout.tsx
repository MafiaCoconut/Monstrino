'use client';

import { Box } from "@mui/material";
import type { ReactNode } from "react";

import Header from "./Header";
import { Footer } from "./Footer";

export type HubLayoutProps = {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

const HubLayout = ({ children, header, footer }: HubLayoutProps) => {
  const content = children;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      {header ?? <Header />}
      <Box 
        component="main" 
        sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {content}
      </Box>
      {footer ?? <Footer />}
    </Box>
  );
};

export default HubLayout;
