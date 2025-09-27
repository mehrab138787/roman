import React from 'react';
import { Heart, Book, Sparkles, Star } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden py-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-violet-500/10 rounded-full blur-xl animate-float-reverse"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative container mx-auto px-4 text-center">
        {/* Logo and icons */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="relative">
            <Heart className="w-12 h-12 text-pink-400 mr-6 animate-heartbeat" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
          </div>
          <div className="relative">
            <Book className="w-12 h-12 text-violet-400 animate-bounce-slow" />
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-sparkle" />
          </div>
          <div className="relative">
            <Star className="w-12 h-12 text-indigo-400 ml-6 animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Main title */}
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 mb-6 animate-gradient-text relative">
          Amora
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-pink-400/20 blur-2xl animate-pulse-slow">
            Amora
          </div>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-white/90 font-light mb-4 animate-fade-in-delayed">
          دنیای جادویی رمان‌های عاشقانه
        </p>
        
        <p className="text-lg text-white/70 font-light animate-fade-in-delayed-2">
          جایی که قلب‌ها با کلمات می‌رقصند
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center mt-8 animate-fade-in-delayed-3">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent to-pink-400 rounded-full"></div>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full mx-4 flex items-center justify-center">
            <Heart className="w-4 h-4 text-white animate-heartbeat" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-transparent rounded-full"></div>
        </div>

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-4 h-4 text-pink-400/30 animate-float-heart"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </header>
  );
};