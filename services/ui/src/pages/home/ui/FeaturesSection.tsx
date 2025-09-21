import React from 'react';
import {
  Users,
  Heart,
  Zap,
  Calendar,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const iconMap = {
  Users,
  Heart,
  Zap,
  Calendar,
  ShoppingBag,
  MessageCircle,
};

type FeatureData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: keyof typeof iconMap | string;
  bgColor: string;
};

type FeaturePalette = {
  bg: string;
  fg: string;
  chipBg: string;
};

const FeatureCard = ({ feature, palette }: { feature: FeatureData; palette: FeaturePalette }) => {
  const Icon = iconMap[feature.icon as keyof typeof iconMap];

  return (
    <Box
      sx={{
        bgcolor: palette.bg,
        color: palette.fg,
        borderRadius: 2,
        p: 3,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform .2s ease, box-shadow .2s ease',
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 12px 32px rgba(0,0,0,.35)',
        },
      }}
    >
      <Box>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          {Icon && <Icon size={32} />}
          <Typography
            sx={{
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: 1.375,
            }}
          >
            {feature.title}
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
          {feature.description}
        </Typography>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {feature.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            sx={{
              bgcolor: palette.chipBg,
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
};

const slideInUp = keyframes`
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const FeaturesSection = ({ features }: { features: FeatureData[] }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = theme.palette.monstrino;

  const defaultPalette: FeaturePalette = {
    bg: colors.pink,
    fg: colors.black,
    chipBg: alpha(theme.palette.common.black, 0.2),
  };

  const paletteMap: Record<string, FeaturePalette> = {
    default: defaultPalette,
    'mid-purple': { bg: colors.purple, fg: colors.white, chipBg: alpha(colors.white, 0.15) },
    'light-pink': { bg: colors.pink, fg: colors.black, chipBg: alpha(theme.palette.common.black, 0.2) },
    'light-yellow': { bg: colors.yellow, fg: colors.black, chipBg: alpha(theme.palette.common.black, 0.2) },
    'mid-blue': { bg: colors.blue, fg: colors.white, chipBg: alpha(colors.white, 0.15) },
    'mid-green': { bg: colors.green, fg: colors.white, chipBg: alpha(colors.white, 0.15) },
    'mid-orange': { bg: colors.orange, fg: colors.white, chipBg: alpha(colors.white, 0.15) },
  };

  return (
    <Box
      component="section"
      id="features"
      sx={{
        position: 'relative',
        py: { xs: 8, lg: 12 },
        overflow: 'hidden',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '-10%', md: '-6%' },
          right: { xs: '-10%', md: '-6%' },
          width: { xs: 280, md: 360 },
          height: { xs: 280, md: 360 },
          borderRadius: '50%',
          filter: 'blur(64px)',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: colors.pink,
              fontSize: { xs: '2.25rem', md: '3rem', lg: '3.75rem' },
              mb: 1.5,
            }}
          >
            Freaky Features
          </Typography>

          <Typography
            sx={{
              color: alpha(colors.white, 0.8),
              maxWidth: 720,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.6,
            }}
          >
            Discover all the clawsome ways to connect, share, and embrace your monster side
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {features.map((feature, index) => (
            <Grid
              key={feature.id ?? feature.title}
              size={{ xs: 6, md: 6, lg: 4}}
              sx={{
                animation: `${slideInUp} .5s ease-out forwards`,
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <FeatureCard
                feature={feature}
                palette={paletteMap[feature.bgColor] ?? defaultPalette}
              />
            </Grid>
          ))}
        </Grid>

        {/* Additional CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography sx={{ color: alpha(colors.white, 0.6), mb: 2 }}>
            Ready to unleash your inner monster?
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              onClick={ () => {navigate("/users/-1")}}
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 999,
                bgcolor: colors.pink,
                color: colors.black,
                fontFamily: 'Fira Code, monospace',
                fontSize: 12,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                transition: 'all .3s ease',
                '&:hover': {
                  bgcolor: alpha(colors.pink, 0.9),
                  transform: 'scale(1.03)',
                  boxShadow: `0 16px 32px ${alpha(colors.pink, 0.25)}`,
                },
              }}
            >
              Watch Demo
            </Button>

            {/* <Button
              variant="outlined"
              onClick={ () => {navigate("/users/-1")}}
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 999,
                color: colors.white,
                borderColor: colors.white,
                fontFamily: 'Fira Code, monospace',
                fontSize: 12,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                transition: 'all .3s ease',
                '&:hover': { bgcolor: alpha(colors.white, 0.1), borderColor: colors.white },
              }}
            >
              Watch Demo
            </Button> */}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
