import { Stack, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";

type FeatureChipProps = { 
    icon: LucideIcon,
    label: string
};
  const C = {
    black: "#0a0a0a",
    white: "#ffffff",
    purple: "#8b5fbf",
    pink: "#ff69b4",
    green: "#66cc66",
  };
export const FeatureChip = ({icon: Icon, label}: FeatureChipProps) => {

    return(
        <Stack 
            key={label} 
            direction="row" 
            alignItems="center" 
            spacing={1} 
            sx={{ 
                color: C.pink
                // color: "var(--monstrino-pink)" 
            }}>
            <Icon  size={20} />
            
            <Typography
                sx={{
                fontFamily: "Fira Code, monospace",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                }}
            >
                {label}
            </Typography>
        </Stack>
    )
}