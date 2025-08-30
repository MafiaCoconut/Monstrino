import React from 'react';
import { 
  Users, 
  Heart, 
  Zap, 
  Calendar, 
  ShoppingBag, 
  MessageCircle 
} from 'lucide-react';

const iconMap = {
  Users,
  Heart,
  Zap,
  Calendar,
  ShoppingBag,
  MessageCircle
};

const FeatureCard = ({ feature }) => {
  const Icon = iconMap[feature.icon];
  
  const bgColorClasses = {
    'mid-purple': 'bg-monstrino-purple text-monstrino-white',
    'light-pink': 'bg-monstrino-pink text-monstrino-black',
    'light-yellow': 'bg-monstrino-yellow text-monstrino-black',
    'mid-blue': 'bg-monstrino-blue text-monstrino-white',
    'mid-green': 'bg-monstrino-green text-monstrino-white',
    'mid-orange': 'bg-monstrino-orange text-monstrino-white'
  };

  return (
    <div className={`project-card ${bgColorClasses[feature.bgColor] || 'bg-monstrino-pink text-monstrino-black'} rounded-lg p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-8 h-8 mr-3" />}
        <h3 className="card-heading text-xl font-semibold">{feature.title}</h3>
      </div>
      
      <p className="body-medium mb-6 opacity-80 leading-relaxed">
        {feature.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {feature.tags.map((tag, index) => (
          <span 
            key={index}
            className="service-button bg-black/20 text-current px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const FeaturesSection = ({ features }) => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-monstrino-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-4xl md:text-5xl lg:text-6xl font-display font-bold text-monstrino-pink mb-6">
            Freaky Features
          </h2>
          <p className="body-large text-xl text-monstrino-white/80 max-w-2xl mx-auto">
            Discover all the clawsome ways to connect, share, and embrace your monster side
          </p>
        </div>

        {/* Features Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="stagger-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <p className="text-monstrino-white/60 mb-6">
            Ready to unleash your inner monster?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cta-button bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-8 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105">
              Explore Features
            </button>
            <button className="cta-button bg-transparent hover:bg-monstrino-white/10 text-monstrino-white border border-monstrino-white px-8 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;