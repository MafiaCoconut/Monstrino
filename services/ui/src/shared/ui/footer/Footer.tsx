import React from 'react';
import { Heart, Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-monstrino-black border-t border-monstrino-purple/20 py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl lg:text-3xl font-display font-bold text-monstrino-pink">
                MONSTRINO
              </div>
            </div>
            <p className="text-monstrino-white/70 mb-6 max-w-md leading-relaxed">
              The ultimate social network for Monster High fans. Connect with ghouls worldwide, 
              share your monster moments, and embrace your freaky-fab side.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-monstrino-white/10 p-3 rounded-full text-monstrino-pink hover:bg-monstrino-pink hover:text-monstrino-black transition-all duration-300 hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-monstrino-white/10 p-3 rounded-full text-monstrino-pink hover:bg-monstrino-pink hover:text-monstrino-black transition-all duration-300 hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-monstrino-white/10 p-3 rounded-full text-monstrino-pink hover:bg-monstrino-pink hover:text-monstrino-black transition-all duration-300 hover:scale-110"
                aria-label="Check our GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-monstrino-white/10 p-3 rounded-full text-monstrino-pink hover:bg-monstrino-pink hover:text-monstrino-black transition-all duration-300 hover:scale-110"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-monstrino-white mb-4 font-mono uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Features
                </a>
              </li>
              <li>
                <a href="#community" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Community
                </a>
              </li>
              <li>
                <a href="#about" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-monstrino-white mb-4 font-mono uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#safety" className="text-monstrino-white/70 hover:text-monstrino-pink transition-colors duration-150">
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-monstrino-purple/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-monstrino-white/60 text-sm mb-4 md:mb-0">
              © {currentYear} Monstrino. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline text-monstrino-pink mx-1" />
              for monster fans everywhere.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#monster-code" className="text-monstrino-white/60 hover:text-monstrino-pink transition-colors duration-150">
                Monster Code of Conduct
              </a>
              <a href="#accessibility" className="text-monstrino-white/60 hover:text-monstrino-pink transition-colors duration-150">
                Accessibility
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6 text-monstrino-white/40 text-xs font-mono">
            EMBRACE YOUR INNER MONSTER • BE FREAKY, BE FABULOUS, BE YOU
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;