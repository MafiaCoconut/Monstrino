import React, { useState } from 'react';
import HeroSection from './ui/HeroSection';
import FeaturesSection from './ui/FeaturesSection';
import CTASection from './ui/CTASection';
// import AuthModal from '../../features/auth-login/AuthModal';
import { mockData } from './mock';
import { Box, Container, Stack, useMediaQuery, useTheme } from '@mui/material';
import { AuroraBackground } from '@pages/home';
import { StaticBackgroundGradient } from '@/shared/ui/background';
import { AuthLoginModal, AuthRegisterModal } from '@/widgets/auth';

export const Homepage = () => {
    const theme = useTheme();

    const [isAuthRegisterModalOpen, setIsAuthRegisterModalOpen] = useState(false);
    const [isAuthLoginModalOpen,    setIsAuthLoginModalOpen]    = useState(false);

    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const [isSubscribed, setIsSubscribed] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // До 1200px = мобильные/планшеты

    const handleOpenAuth = (mode: any) => {
    setAuthMode(mode);
    if (mode === 'register')
        setIsAuthRegisterModalOpen(true);
    else 
        setIsAuthLoginModalOpen(true);
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
                isSubscribed={isSubscribed}
                />
            </section>

            <section id="features" data-section="Homepage/Features">
                <FeaturesSection features={mockData.features} />
            </section>

            <section id="cta" data-section="Homepage/CTA">
                <CTASection onOpenAuth={handleOpenAuth} />
            </section>
        </Box>
        <AuthRegisterModal isOpen={isAuthRegisterModalOpen} onClose={() => setIsAuthRegisterModalOpen(false)} />
        <AuthLoginModal isOpen={isAuthLoginModalOpen} onClose={() => setIsAuthLoginModalOpen(false)} />        
        {/* <AuthModal isOpen={true} onClose={() => setIsAuthModalOpen(false)} mode={"register"}/> */}
    </Box>
    );
};
