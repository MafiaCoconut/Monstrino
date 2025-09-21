import React, { useState } from 'react';
import { Zap, Users, Heart, ArrowRight } from 'lucide-react';
import { Box, Container, Stack, Typography, Button, TextField } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FeatureChip, HeroDescription, HeroTagline, HeroTitle } from '@/shared/ui/homepage-hero';

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
        zIndex: 1,
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pt: { xs: 8, lg: 10 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack alignItems="center" textAlign="center" spacing={3}>
          <HeroTitle text="Monstrino"/>
          <HeroTagline text="Where monsters unite"/>
          <HeroDescription 
            text="Join the most fang-tastic social network for Monster High fans! Connect with fellow ghouls, share your monster moments, and embrace your inner monster." 
          />


          {/* Feature highlights */}
          <Stack direction="row" spacing={{ xs: 2, md: 3 }} flexWrap="wrap" justifyContent="center" sx={{ my: 2 }}>
            {[
              { icon: Users, label: "Monster Community" },
              { icon: Heart, label: "Ghoul Friends" },
              { icon: Zap, label: "Spooky Fun" },
            ].map(({ icon: Icon, label }) => (
              <FeatureChip icon={Icon} label={label}/>
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