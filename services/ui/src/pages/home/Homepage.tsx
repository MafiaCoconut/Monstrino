import React, { useState } from 'react';
import HeroSection from './ui/HeroSection';
import FeaturesSection from './ui/FeaturesSection';
import CTASection from './ui/CTASection';
import AuthModal from '../../features/auth-login/AuthModal';
import { mockData } from './mock';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { AuroraBackground } from '@pages/home';
import { StaticBackgroundGradient } from '@/shared/ui/background';

export const Homepage = () => {
    const theme = useTheme();

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const [isSubscribed, setIsSubscribed] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // До 1200px = мобильные/планшеты

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
      <Box data-l="Homepage">
        <Box
          aria-hidden
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
            {isMobile && <StaticBackgroundGradient />}
            {!isMobile && (
                <AuroraBackground
                colorStops={["#FF00C7", "#B19EEF", "#FFFFFF"]}
                blend={1}
                amplitude={0.5}
                speed={0.8}
                />
            )}
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
            <HeroSection
              onOpenAuth={handleOpenAuth}
              onSubscribe={handleSubscribe}
              isSubscribed={isSubscribed}
            />
          </section>

          <section id="features" data-section="Homepage/Features">
            <FeaturesSection features={mockData.features} />
          </section>

          <section id="cta" data-section="Homepage/CTA">
            <CTASection onOpenAuth={handleOpenAuth} />
          </section>

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            mode={authMode}
          />
        </Box>
        
      </Box>
    );
};
