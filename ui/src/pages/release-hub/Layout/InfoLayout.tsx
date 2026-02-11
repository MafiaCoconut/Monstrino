import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import InfoHeader from "./InfoHeader";
import { Footer } from "./Footer";

const InfoLayout = () => {
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
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default InfoLayout;
