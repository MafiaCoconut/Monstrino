import { Typography, TypographyProps, useTheme } from "@mui/material"

type AuthTitleTextFieldProps = TypographyProps & {
    text: string;
    required?: boolean;
}

export const AuthTitleTextField = ({text, required, sx}: AuthTitleTextFieldProps) => {
    const theme = useTheme();
    return (
        <Typography
            sx={{
                fontFamily: 'Fira Code, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: 12,
                // mb: 1,
                color: theme.palette.monstrino.white,
                ...sx,
            }}

        >
            {text}{required ? '*' : ''}
        </Typography>
    )
}