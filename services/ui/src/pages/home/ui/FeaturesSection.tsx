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
import { alpha, keyframes } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const iconMap = {
  Users,
  Heart,
  Zap,
  Calendar,
  ShoppingBag,
  MessageCircle,
};

const C = {
  black: '#0a0a0a',
  white: '#ffffff',
  purple: '#8b5fbf',
  pink: '#ff69b4',
  blue: '#4a90e2',
  green: '#66cc66',
  yellow: '#ffd93d',
  orange: '#ff8c42',
};

const FeatureCard = ({ feature }) => {
  const Icon = iconMap[feature.icon];

  const bgStyleMap = {
    'mid-purple': { bg: C.purple, fg: C.white, chipBg: alpha(C.white, 0.15) },
    'light-pink': { bg: C.pink, fg: '#0a0a0a', chipBg: alpha('#000', 0.2) },
    'light-yellow': { bg: C.yellow, fg: '#0a0a0a', chipBg: alpha('#000', 0.2) },
    'mid-blue': { bg: C.blue, fg: C.white, chipBg: alpha(C.white, 0.15) },
    'mid-green': { bg: C.green, fg: C.white, chipBg: alpha(C.white, 0.15) },
    'mid-orange': { bg: C.orange, fg: C.white, chipBg: alpha(C.white, 0.15) },
  };

  const palette =
    bgStyleMap[feature.bgColor] || { bg: C.pink, fg: '#0a0a0a', chipBg: alpha('#000', 0.2) };

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

const FeaturesSection = ({ features }) => {
  const navigate = useNavigate()
  return (
    <Box component="section" id="features" sx={{ py: { xs: 8, lg: 12 }, bgcolor: C.black }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: C.pink,
              fontSize: { xs: '2.25rem', md: '3rem', lg: '3.75rem' },
              mb: 1.5,
            }}
          >
            Freaky Features
          </Typography>

          <Typography
            sx={{
              color: alpha(C.white, 0.8),
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
              size={{ xs: 12, md: 6, lg: 4}}
              sx={{
                animation: `${slideInUp} .5s ease-out forwards`,
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <FeatureCard feature={feature} />
            </Grid>
          ))}
        </Grid>

        {/* Additional CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography sx={{ color: alpha(C.white, 0.6), mb: 2 }}>
            Ready to unleash your inner monster?
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 999,
                bgcolor: C.pink,
                color: C.black,
                fontFamily: 'Fira Code, monospace',
                fontSize: 12,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                transition: 'all .3s ease',
                '&:hover': {
                  bgcolor: alpha(C.pink, 0.9),
                  transform: 'scale(1.03)',
                  boxShadow: `0 16px 32px ${alpha(C.pink, 0.25)}`,
                },
              }}
            >
              Explore Features
            </Button>

            <Button
              variant="outlined"
              onClick={ () => {navigate("/users/-1")}}
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 999,
                color: C.white,
                borderColor: C.white,
                fontFamily: 'Fira Code, monospace',
                fontSize: 12,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                transition: 'all .3s ease',
                '&:hover': { bgcolor: alpha(C.white, 0.1), borderColor: C.white },
              }}
            >
              Watch Demo
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
