import React, { useState } from 'react';
import Header from '../../shared/ui/header/Header';
import HeroSection from './ui/HeroSection';
import FeaturesSection from './ui/FeaturesSection';
import CTASection from './ui/CTASection';
import Footer from '../../shared/ui/footer/Footer';
import AuthModal from '../../features/auth-login/AuthModal';
import { mockData } from './mock';

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
      <Header onOpenAuth={handleOpenAuth} />
      <HeroSection
        onOpenAuth={handleOpenAuth}
        onSubscribe={handleSubscribe}
        isSubscribed={isSubscribed}
      />
      <FeaturesSection features={mockData.features} />
      <CTASection onOpenAuth={handleOpenAuth} />
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
  );
};

export default LandingPage;