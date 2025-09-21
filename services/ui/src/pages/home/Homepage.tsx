import React, { useState } from 'react';
import HeroSection from './ui/HeroSection';
import FeaturesSection from './ui/FeaturesSection';
import CTASection from './ui/CTASection';
import AuthModal from '../../features/auth-login/AuthModal';
import { mockData } from './mock';
import { Box, Container } from '@mui/material';
import { AuroraBackground } from '@pages/home';

export const Homepage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleOpenAuth = (mode: any) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSubscribe = (email: any) => {
    // Mock subscription logic
    console.log('Subscribed:', email);
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000); // Reset after 3 seconds
  };

  return (
    <Box 
      data-l="Homepage"
      sx={{
        minHeight: "100vh",
      // bgcolor: "monstrino.black",
      // color: "monstrino.white"
      }}>
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <AuroraBackground
          // подстрой цвета под Monstrino
          colorStops={["#FF00C7", "#B19EEF", "#FFFFFF"]}
          blend={1}
          amplitude={0.5}
          speed={0.8}
        />
      </Box>
      <Box 
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <section id="hero" data-section="Homepage/Hero">
        <Container></Container>
          <HeroSection
            onOpenAuth={handleOpenAuth}
            onSubscribe={handleSubscribe}
            isSubscribed={isSubscribed}
          />
        </section>

        <FeaturesSection features={mockData.features} />
        <CTASection onOpenAuth={handleOpenAuth} />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
        />
      </Box>
      
    </Box>
  );
};
