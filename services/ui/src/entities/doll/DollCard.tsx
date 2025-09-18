import { Card, CardContent, CardMedia, Typography } from "@mui/material"

import { useNavigate, useParams } from 'react-router-dom';

type DollCardProps = {
    dollId: number,
    image: string,
    name: string,
    character: string,
    onClick?: () => void; 
    isMobile?: boolean;
}

export const DollCard = ({dollId, image, name, character, onClick, isMobile=false}: DollCardProps) => {
    const { username } = useParams();
    const navigate = useNavigate();
    return (
        <Card
            key={dollId}
            sx={{
            minWidth: { xs: 100, sm: 120, md: 140, lg: 160 },
            maxWidth: { xs: 100, sm: 120, md: 140, lg: 160 },
            bgcolor: 'rgba(255, 105, 180, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.05)' }
            }}
            onClick={() => navigate(`/users/${username}/dolls/${dollId}`)}
        >
            <CardMedia
            component="img"
            height={isMobile ? 80 : 180}
            image={image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=160&h=120&fit=crop'}
            alt={name}
            />
            <CardContent sx={{ p: { xs: 0.5, md: 1 }, '&:last-child': { pb: { xs: 0.5, md: 1 } } }}>
            <Typography
                variant="caption"
                sx={{
                color: 'white',
                fontWeight: 600,
                display: 'block',
                fontSize: { xs: '0.6rem', md: '0.75rem' },
                textTransform: 'uppercase'
                }}
            >
                {name}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                color: 'primary.main',
                fontSize: { xs: '0.55rem', md: '0.65rem' },
                textTransform: 'uppercase'
                }}
            >
                {character}
            </Typography>
            </CardContent>
        </Card>
    )
}
