import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication logic
    console.log(`${mode} attempt:`, formData);
    
    // Simulate successful auth
    setTimeout(() => {
      alert(`${mode === 'login' ? 'Login' : 'Registration'} successful! Welcome to Monstrino!`);
      onClose();
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        agreeToTerms: false
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-monstrino-black border border-monstrino-purple/30 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-monstrino-purple/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-monstrino-purple/20">
          <h2 className="text-2xl font-display font-bold text-monstrino-pink">
            {mode === 'login' ? 'Welcome Back, Ghoul!' : 'Join the Pack!'}
          </h2>
          <button
            onClick={onClose}
            className="text-monstrino-white/60 hover:text-monstrino-white transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
                Monster Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose your monster name"
                  className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-12 pr-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-12 pr-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-12 pr-12 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple hover:text-monstrino-pink transition-colors duration-150"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-12 pr-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 rounded border-monstrino-purple/30 text-monstrino-pink focus:ring-monstrino-pink focus:ring-2"
                required
              />
              <label className="text-monstrino-white/80 text-sm leading-relaxed">
                I agree to the{' '}
                <a href="#terms" className="text-monstrino-pink hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-monstrino-pink hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full cta-button bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105"
          >
            {mode === 'login' ? 'Sign In' : 'Create Monster Profile'}
          </button>

          <div className="text-center text-monstrino-white/60 text-sm">
            {mode === 'login' ? "Don't have an account?" : "Already a monster?"}
            <button
              type="button"
              onClick={() => {/* Switch mode logic would go here */}}
              className="text-monstrino-pink hover:underline ml-1"
            >
              {mode === 'login' ? 'Join now' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;