import React, { useState } from 'react';
import { Zap, Users, Heart, ArrowRight } from 'lucide-react';
import { Box, Container, Stack, Typography, Button, TextField } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FeatureChip, HeroDescription, HeroTagline, HeroTitle } from '@/entities/homepage/homepage-hero';
import { WatchDemoButton } from '@/features/demo/ui/WatchDemoButton';
import { AuthHomepageLoginButton, AuthHomepageRegisterButton } from '@/entities/auth';
import { EmailSubscribeWidget } from '@/widgets/email';

const HeroSection = (props: any) => {
  const { onOpenAuth, isSubscribed } = props
  const [email, setEmail] = React.useState("")

  const C = {
    black: "#0a0a0a",
    white: "#ffffff",
    purple: "#8b5fbf",
    pink: "#ff69b4",
    green: "#66cc66",
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
            <AuthHomepageRegisterButton title="Join the Pack" onClick={() => onOpenAuth("register")} />
            <AuthHomepageLoginButton title="Sign In" onClick={() => onOpenAuth("login")} />
          </Stack>
          <WatchDemoButton />


          {/* Email subscribe */}
          <Box component="form" sx={{ width: "100%", maxWidth: 520 }}>
            <EmailSubscribeWidget />
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