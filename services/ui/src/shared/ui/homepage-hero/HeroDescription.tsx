import { Typography } from "@mui/material";

type HeroDescriptionProps = { text: string };

export const HeroDescription = ({text}: HeroDescriptionProps) => {
    return(
        <Typography
            sx={{
              maxWidth: 640,
              opacity: 0.8,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
        >
            {text}
        </Typography>
    )
}