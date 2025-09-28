import { Typography } from "@mui/material";

type HeroTitleProps = { text: string };

export const HeroTitle = ({text}: HeroTitleProps) => {
    return(
        <Typography
            variant="h1"
            sx={(t) => ({ 
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: t.palette.primary.main,
              fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem", lg: "8rem" },
            })}
          >
            {text}
          </Typography>
    )
}