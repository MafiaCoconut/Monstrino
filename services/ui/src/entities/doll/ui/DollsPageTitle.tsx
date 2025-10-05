import { Typography } from "@mui/material"

type DollsPageTitleProps = {
    text: string
}

export const DollsPageTitle = ({ text }: DollsPageTitleProps) => {
    return (
        <Typography
            variant="h4"
            sx={{
                color: 'primary.main',
                fontWeight: 800,
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '1.8rem', md: '2.125rem' },
                textAlign: { xs: 'center', sm: 'left' }
            }}
        >
            {text}
        </Typography>
    )
}
