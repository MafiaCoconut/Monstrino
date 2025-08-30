import React, { useState } from 'react';
import { Zap, Users, Heart, ArrowRight } from 'lucide-react';
import { Box, Container, Stack, Typography, Button, TextField } from "@mui/material";
import { alpha } from "@mui/material/styles";

const HeroSection = (props: any) => {
  const { onOpenAuth, onSubscribe, isSubscribed } = props
  const [email, setEmail] = React.useState("")

  const C = {
    black: "#0a0a0a",
    white: "#ffffff",
    purple: "#8b5fbf",
    pink: "#ff69b4",
    green: "#66cc66",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email.trim());
      setEmail("");
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pt: { xs: 8, lg: 10 },
        bgcolor: C.black,
        color: C.white,
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${C.black} 0%, ${alpha(C.purple, 0.2)} 50%, ${C.black} 100%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: { xs: 200, sm: 256 },
          height: { xs: 200, sm: 256 },
          bgcolor: alpha(C.pink, 0.1),
          borderRadius: "50%",
          filter: "blur(48px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          right: "25%",
          width: { xs: 280, sm: 384 },
          height: { xs: 280, sm: 384 },
          bgcolor: alpha(C.purple, 0.1),
          borderRadius: "50%",
          filter: "blur(48px)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack alignItems="center" textAlign="center" spacing={3}>
          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: C.pink,
              fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem", lg: "8rem" },
            }}
          >
            MONSTRINO
          </Typography>

          <Typography
            sx={{
              fontFamily: "Fira Code, Menlo, Monaco, Consolas, monospace",
              color: C.purple,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Where Monsters Unite
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              maxWidth: 640,
              opacity: 0.8,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
          >
            Join the most fang-tastic social network for Monster High fans! Connect with fellow ghouls,
            share your monster moments, and embrace your inner monster.
          </Typography>

          {/* Feature highlights */}
          <Stack direction="row" spacing={{ xs: 2, md: 3 }} flexWrap="wrap" justifyContent="center" sx={{ my: 2 }}>
            {[
              { icon: Users, label: "Monster Community" },
              { icon: Heart, label: "Ghoul Friends" },
              { icon: Zap, label: "Spooky Fun" },
            ].map(({ icon: Icon, label }) => (
              <Stack key={label} direction="row" alignItems="center" spacing={1} sx={{ color: C.pink }}>
                <Icon size={20} />
                <Typography
                  sx={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* CTAs */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ my: 2 }}>
            <Button
              size="large"
              onClick={() => onOpenAuth("register")}
              endIcon={<ArrowRight size={16} />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                bgcolor: C.pink,
                color: C.black,
                border: `1px solid ${C.pink}`,
                fontFamily: "Fira Code, monospace",
                fontSize: 12,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                transition: "all .3s ease",
                "&:hover": {
                  bgcolor: alpha(C.pink, 0.9),
                  boxShadow: `0 8px 24px ${alpha(C.pink, 0.25)}`,
                  transform: "scale(1.03)",
                },
              }}
            >
              Join the Pack
            </Button>

            <Button
              size="large"
              variant="outlined"
              onClick={() => onOpenAuth("login")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                color: C.white,
                borderColor: C.white,
                fontFamily: "Fira Code, monospace",
                fontSize: 12,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                bgcolor: "transparent",
                transition: "all .3s ease",
                "&:hover": { bgcolor: alpha(C.white, 0.1), borderColor: C.white, transform: "scale(1.03)" },
              }}
            >
              Sign In
            </Button>
          </Stack>

          {/* Email subscribe */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 520 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                fullWidth
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for monster updates"
                variant="outlined"
                InputProps={{
                  sx: {
                    bgcolor: alpha(C.white, 0.1),
                    borderRadius: 999,
                    color: C.white,
                    backdropFilter: "blur(4px)",
                    "& fieldset": { borderColor: alpha(C.purple, 0.3) },
                    "&:hover fieldset": { borderColor: alpha(C.purple, 0.5) },
                    "&.Mui-focused fieldset": { borderColor: C.pink },
                    "::placeholder": { color: alpha(C.white, 0.6) },
                  },
                }}
              />
              <Button
                type="submit"
                disabled={isSubscribed}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 999,
                  fontFamily: "Fira Code, monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  whiteSpace: "nowrap",
                  bgcolor: isSubscribed ? C.green : C.purple,
                  color: C.white,
                  "&:hover": { bgcolor: isSubscribed ? C.green : alpha(C.purple, 0.9) },
                }}
              >
                {isSubscribed ? "Subscribed!" : "Get Updates"}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ color: alpha(C.white, 0.6), mt: 1 }}>
            Be the first to hear about new monster features and community events
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;