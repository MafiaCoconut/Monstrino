import { Typography } from "@mui/material"

type CollectionsPageTitleProps = {
    text: string
}

export const CollectionsPageTitle = ({ text }: CollectionsPageTitleProps) => {
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
