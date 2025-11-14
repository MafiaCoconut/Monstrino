import { Typography } from "@mui/material";

type HeroTaglineProps = { text: string };

export const HeroTagline = ({text}: HeroTaglineProps) => {
    return(
        <Typography
            sx={(t) => ({ 
                color: t.palette.secondary.main,         // вместо C.purple
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                // fontFamily: t.typography.fontFamilyMono, // задаёшь в теме
            })}
        >
            {text}
        </Typography>
    )
}