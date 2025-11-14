import { Typography } from "@mui/material";
import { alpha, keyframes, useTheme } from '@mui/material/styles';

type FeaturesDescriptionProps = { text: string };

export const FeaturesDescription = ({ text }: FeaturesDescriptionProps) => {
    const theme = useTheme();
    const colors = theme.palette.monstrino;
    return (
        <Typography
            sx={{
              color: alpha(colors.white, 0.8),
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.6,
            }}
          >
            {text}
          </Typography>
    )
}