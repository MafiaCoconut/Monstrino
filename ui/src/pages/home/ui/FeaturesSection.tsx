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
import { FeatureCard, FeaturesDescription, FeaturesTitle, MagicBento } from '@/entities/homepage/homepage-features';
import { WatchDemoButton } from '@/features/demo/ui/WatchDemoButton';

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
        py: { xs: 0, lg: 2 },
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
          <FeaturesTitle text="Freaky Features" />
          <FeaturesDescription text="Discover all the clawsome ways to connect, share, and embrace your monster side" />
        </Box>

        {/* Features Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid
              key={feature.id ?? feature.title}
              size={{ xs: 12, sm: 6, md: 4, lg: 4}}
              sx={{
                animation: `${slideInUp} .5s ease-out forwards`,
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <FeatureCard
                icon={iconMap[feature.icon as keyof typeof iconMap]}
                id={feature.id}
                title={feature.title}
                description={feature.description}
                tags={feature.tags}
                bgColor={paletteMap[feature.bgColor] ?? defaultPalette}
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
            <WatchDemoButton />

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
