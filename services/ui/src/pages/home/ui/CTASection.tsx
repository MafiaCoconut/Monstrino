import React from 'react';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { Box, Container, Stack, Typography, Button, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const CTASection = ({ onOpenAuth }) => {
  const C = {
    black: '#0a0a0a',
    white: '#ffffff',
    purple: '#8b5fbf',
    pink: '#ff69b4',
    yellow: '#ffd93d',
    green: '#66cc66',
  };

  const pulse = keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.08); opacity: .9; }
    100% { transform: scale(1); opacity: 1; }
  `;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, lg: 12 },
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(C.purple, 0.2)} 0%, ${C.black} 50%, ${alpha(C.pink, 0.2)} 100%)`,
        color: C.white,
      }}
    >
      {/* Background Effects */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: alpha('#000', 0.5) }} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: 384,
          height: 384,
          bgcolor: alpha(C.pink, 0.2),
          borderRadius: '50%',
          filter: 'blur(48px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          width: 384,
          height: 384,
          bgcolor: alpha(C.purple, 0.2),
          borderRadius: '50%',
          filter: 'blur(48px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Decorative Icons */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={4} sx={{ mb: 4 }}>
          <Box sx={{ animation: `${pulse} 1.8s ease-in-out infinite` }}>
            <Sparkles size={32} color={C.pink} />
          </Box>
          <Crown size={48} color={C.yellow} />
          <Box sx={{ animation: `${pulse} 1.8s ease-in-out infinite .3s` }}>
            <Sparkles size={32} color={C.pink} />
          </Box>
        </Stack>

        {/* Main CTA Headline */}
        <Typography
          sx={{
            fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            mb: 2,
            color: C.pink,
            fontSize: { xs: '2.75rem', md: '3.5rem', lg: '4.5rem' },
          }}
        >
          JOIN THE MONSTER
          <br />
          <Box component="span" sx={{ color: C.white }}>
            REVOLUTION
          </Box>
        </Typography>

        {/* Subheading */}
        <Typography
          sx={{
            maxWidth: 960,
            mx: 'auto',
            opacity: 0.8,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 1.6,
            mb: 6,
          }}
        >
          Don't just watch from the shadows. Be part of the most electrifying monster community
          where every ghoul matters and every monster has a voice.
        </Typography>

        {/* Benefits List */}
        <Grid container spacing={2} sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          {[
            { t: 'FREE', s: 'Forever and always' },
            { t: '50K+', s: 'Active monsters' },
            { t: '24/7', s: 'Monster support' },
          ].map(({ t, s }) => (
            <Grid size={{ xs:12, md: 4 }}>
              <Box
                sx={{
                  bgcolor: alpha(C.white, 0.1),
                  backdropFilter: 'blur(4px)',
                  borderRadius: 2,
                  p: 3,
                  border: `1px solid ${alpha(C.purple, 0.3)}`,
                }}
              >
                <Typography sx={{ color: C.pink, fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>{t}</Typography>
                <Typography sx={{ color: alpha(C.white, 0.8) }}>{s}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Primary CTA Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            onClick={() => onOpenAuth('register')}
            endIcon={<ArrowRight size={20} />}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 999,
              bgcolor: C.pink,
              color: C.black,
              fontFamily: 'Fira Code, monospace',
              fontSize: 12,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              transition: 'all .3s ease',
              '& .MuiButton-endIcon': { transition: 'transform .3s ease' },
              '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
              '&:hover': {
                bgcolor: alpha(C.pink, 0.9),
                boxShadow: `0 20px 40px ${alpha(C.pink, 0.25)}`,
                transform: 'scale(1.03)',
              },
            }}
          >
            Create Monster Profile
          </Button>

          <Button
            onClick={() => onOpenAuth('login')}
            variant="outlined"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 999,
              color: C.white,
              borderColor: C.white,
              fontFamily: 'Fira Code, monospace',
              fontSize: 12,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              transition: 'all .3s ease',
              '&:hover': { bgcolor: alpha(C.white, 0.1), borderColor: C.white, transform: 'scale(1.03)' },
            }}
          >
            I'm Already a Monster
          </Button>
        </Stack>

        {/* Trust Indicators */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          flexWrap="wrap"
          sx={{ color: alpha(C.white, 0.6), fontSize: 14 }}
        >
          {['Safe & Secure', 'No Spam Ever', 'Join in 30 Seconds'].map((label) => (
            <Stack key={label} direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 8, height: 8, bgcolor: C.green, borderRadius: '50%' }} />
              <Box component="span">{label}</Box>
            </Stack>
          ))}
        </Stack>

        {/* Emergency CTA for mobile */}
        <Box sx={{ mt: 6, display: { md: 'none' } }}>
          <Typography sx={{ color: alpha(C.white, 0.8), fontSize: '1.125rem', mb: 2 }}>
            Don't wait another full moon! 🌙
          </Typography>
          <Button
            onClick={() => onOpenAuth('register')}
            fullWidth
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 999,
              fontFamily: 'Fira Code, monospace',
              fontSize: 12,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              background: `linear-gradient(90deg, ${C.pink}, ${C.purple})`,
              color: C.white,
              '&:hover': {
                background: `linear-gradient(90deg, ${alpha(C.pink, 0.9)}, ${alpha(C.purple, 0.9)})`,
              },
            }}
          >
            Join Now - It's Free!
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
