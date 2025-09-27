import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="relative container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-white/40 text-sm font-light">
            ساخته شده توسط <span className="text-white/60 font-medium">NOCTOVEX</span>
          </p>
        </div>
      </div>
    </footer>
  );
};