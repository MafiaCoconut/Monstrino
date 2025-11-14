import { Box, Chip, Icon, Stack, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
    icon: LucideIcon,
    id: number | 0,
    title: string,
    description: string,
    tags: string[],
    bgColor: { bg: string; fg: string; chipBg: string },

};

export const FeatureCard = ({ icon: Icon, id, title, description, tags, bgColor }: FeatureCardProps) => {
    return (
        <Box
            data-l={'feature-card-' + id}
            sx={{
                bgcolor: bgColor.bg, color: bgColor.fg,
                borderRadius: 2, p: 3, 
                // height: {sx: 300, md: 300, lg: 250},
                // height: 350,
                minHeight: { 
                    xs: 200, // Мобильные устройства
                    sm: 300, // Планшеты
                    md: 320, // Средние экраны
                    lg: 250, // Большие экраны
                },
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform .2s ease, box-shadow .2s ease',
                cursor: 'pointer', overflow: 'hidden',
                '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 12px 32px rgba(0,0,0,.35)',
                },
            }}
        >
            <Box>
                <Stack data-l="feature-card-title" direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                    {Icon && <Icon size={32} />}
                    <Typography
                        sx={{
                            fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                            fontWeight: 600,
                            fontSize: '1.25rem',
                            lineHeight: 1.375,
                        }}
                    >
                        {title}
                    </Typography>
                </Stack>

                <Typography
                    sx={{
                        opacity: 0.85,
                        lineHeight: 1.6,
                        mb: 2.5,
                        fontSize: '1rem',
                    }}
                >
                    {description}
                </Typography>
            </Box>

            <Stack direction="row" flexWrap="wrap" gap={1}>
                {tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    sx={{
                    bgcolor: bgColor.chipBg,
                    color: 'inherit',
                    borderRadius: 999,
                    fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace',
                    fontSize: 11,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    px: 1.5,
                    }}
                />
                ))}
            </Stack>
        </Box>
    );
}
