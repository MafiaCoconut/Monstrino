import { Box, Typography } from '@mui/material';

/**
 * Server-side detail page header component.
 * Renders H1 and description in server HTML for SEO.
 * Provides visible, indexable content before client hydration.
 */
export function DetailHeader({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) {
  if (!description) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        maxWidth: 1400,
        mx: 'auto',
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 700,
          color: 'white',
          mb: 2,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.95rem', md: '1rem' },
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.6,
          maxWidth: 800,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
