import { Typography } from "@mui/material";

type FeaturesTitleProps = { text: string };

export const FeaturesTitle = ({ text }: FeaturesTitleProps) => {
    return (
        <Typography
            sx={(t) => ({
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: t.palette.primary.main,
              fontSize: { xs: '2.25rem', md: '3rem', lg: '3.75rem' },
              mb: 1.5,
            })}
          >
            {text}
          </Typography>
    )
}