import React, { useState } from 'react';
import HeroSection from './ui/HeroSection';
import FeaturesSection from './ui/FeaturesSection';
import CTASection from './ui/CTASection';
import AuthModal from '../../features/auth-login/AuthModal';
import { mockData } from './mock';
import { Box } from '@mui/material';
import { PublicHeader } from '@/widgets/headers';
import { AppFooter } from '@/widgets/footers';

const LandingPage = () => {
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
    <div className="min-h-screen bg-monstrino-black text-monstrino-white">
      <Box sx={{
        minHeight: "100vh",
        bgcolor: "monstrino.black",
        color: "monstrino.white"
       }}>
        <PublicHeader onOpenAuth={handleOpenAuth} />
        <HeroSection
          onOpenAuth={handleOpenAuth}
          onSubscribe={handleSubscribe}
          isSubscribed={isSubscribed}
        />
        <FeaturesSection features={mockData.features} />
        {/* <CTASection onOpenAuth={handleOpenAuth} /> */}
        <AppFooter />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
        />
      </Box>
    </div>
  );
};

export default LandingPage;