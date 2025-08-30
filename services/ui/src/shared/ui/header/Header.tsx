import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = (props: any) => {
    const { 
        onOpenAuth = ""
    } = props;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
    <header className="fixed top-0 w-full bg-monstrino-black/90 backdrop-blur-md border-b border-monstrino-purple/20 z-50">
        <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
            <div className="text-2xl lg:text-3xl font-display font-bold text-monstrino-pink">
                MONSTRINO
            </div>
            <div className="hidden sm:block text-sm text-monstrino-purple font-mono tracking-wide">
                MONSTER HIGH SOCIAL
            </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
                Features
            </a>
            <a href="#community" className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
                Community
            </a>
            <a href="#about" className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
                About
            </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
            <button
                onClick={() => onOpenAuth('login')}
                className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150"
            >
                Login
            </button>
            <button
                onClick={() => onOpenAuth('register')}
                className="cta-button bg-monstrino-purple hover:bg-monstrino-purple/90 text-monstrino-white border-monstrino-purple px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wide transition-all duration-300"
            >
                Join Now
            </button>
            </div>

            {/* Mobile Menu Button */}
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-monstrino-pink hover:text-monstrino-white transition-colors duration-150"
            >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden border-t border-monstrino-purple/20 py-4">
            <nav className="flex flex-col space-y-4">
                <a href="#features" className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
                Features
                </a>
                <a href="#community" className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
                Community
                </a>
                <a href="#about" className="nav-link text-monstrino-pink hover:text-monstrino-white transition-colors duration-150">
                About
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-monstrino-purple/20">
                <button
                    onClick={() => onOpenAuth('login')}
                    className="nav-link text-monstrino-pink hover:text-monstrino-white text-left transition-colors duration-150"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="cta-button bg-monstrino-purple hover:bg-monstrino-purple/90 text-monstrino-white border-monstrino-purple px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wide transition-all duration-300 self-start"
                >
                  Join Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;