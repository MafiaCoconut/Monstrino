import React from 'react';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';

const CTASection = ({ onOpenAuth }) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-monstrino-purple/20 via-monstrino-black to-monstrino-pink/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-monstrino-pink/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-monstrino-purple/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        {/* Decorative Icons */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <Sparkles className="w-8 h-8 text-monstrino-pink animate-pulse" />
          <Crown className="w-12 h-12 text-monstrino-yellow" />
          <Sparkles className="w-8 h-8 text-monstrino-pink animate-pulse" />
        </div>

        {/* Main CTA Headline */}
        <h2 className="brand-display text-5xl md:text-6xl lg:text-7xl font-display font-bold text-monstrino-pink mb-6 leading-tight">
          JOIN THE MONSTER
          <br />
          <span className="text-monstrino-white">REVOLUTION</span>
        </h2>

        {/* Subheading */}
        <p className="body-large text-xl md:text-2xl text-monstrino-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          Don't just watch from the shadows. Be part of the most electrifying monster community 
          where every ghoul matters and every monster has a voice.
        </p>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-monstrino-white/10 backdrop-blur-sm rounded-lg p-6 border border-monstrino-purple/30">
            <div className="text-monstrino-pink text-2xl font-bold mb-2">FREE</div>
            <div className="text-monstrino-white/80">Forever and always</div>
          </div>
          <div className="bg-monstrino-white/10 backdrop-blur-sm rounded-lg p-6 border border-monstrino-purple/30">
            <div className="text-monstrino-pink text-2xl font-bold mb-2">50K+</div>
            <div className="text-monstrino-white/80">Active monsters</div>
          </div>
          <div className="bg-monstrino-white/10 backdrop-blur-sm rounded-lg p-6 border border-monstrino-purple/30">
            <div className="text-monstrino-pink text-2xl font-bold mb-2">24/7</div>
            <div className="text-monstrino-white/80">Monster support</div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <button
            onClick={() => onOpenAuth('register')}
            className="cta-button large bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-12 py-4 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-monstrino-pink/25 group"
          >
            Create Monster Profile
            <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => onOpenAuth('login')}
            className="cta-button large bg-transparent hover:bg-monstrino-white/10 text-monstrino-white border-2 border-monstrino-white px-12 py-4 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            I'm Already a Monster
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-monstrino-white/60 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-monstrino-green rounded-full"></div>
            <span>Safe & Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-monstrino-green rounded-full"></div>
            <span>No Spam Ever</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-monstrino-green rounded-full"></div>
            <span>Join in 30 Seconds</span>
          </div>
        </div>

        {/* Emergency CTA for mobile */}
        <div className="mt-12 md:hidden">
          <p className="text-monstrino-white/80 text-lg mb-4">
            Don't wait another full moon! 🌙
          </p>
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full cta-button large bg-gradient-to-r from-monstrino-pink to-monstrino-purple hover:from-monstrino-pink/90 hover:to-monstrino-purple/90 text-monstrino-white px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300"
          >
            Join Now - It's Free!
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;