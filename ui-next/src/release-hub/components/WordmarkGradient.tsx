import { Box, Typography } from "@mui/material";

type WordmarkGradientProps = {
  onClick?: () => void;
};

const WordmarkGradient = ({ onClick }: WordmarkGradientProps) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      cursor: onClick ? "pointer" : "default",
      flexShrink: 0,
    }}
  >
    <Box
      component="span"
      sx={{
        width: "100%",
        height: "1px",
        backgroundColor: "rgba(157, 78, 221, 0.5)",
      }}
    />
    <Typography
      component="span"
      sx={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        padding: "0 8px",
        background: "linear-gradient(90deg, #ff7edb 0%, #9d4edd 100%)",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      MONSTRINO
    </Typography>
    <Box
      component="span"
      sx={{
        width: "100%",
        height: "1px",
        backgroundColor: "rgba(157, 78, 221, 0.5)",
      }}
    />
  </Box>
);

export default WordmarkGradient;
