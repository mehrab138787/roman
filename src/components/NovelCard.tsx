import React from 'react';
import { Heart, Eye, Calendar, Star, Sparkles } from 'lucide-react';
import { Novel } from '../types/Novel';

interface NovelCardProps {
  novel: Novel;
  onClick: (novel: Novel) => void;
  onLike: () => void;
  animationDelay: number;
}

export const NovelCard: React.FC<NovelCardProps> = ({ novel, onClick, onLike, animationDelay }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike();
  };

  return (
    <div
      className="group cursor-pointer animate-fade-in-up hover:z-10 relative"
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={() => onClick(novel)}
    >
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-700 transform hover:scale-110 hover:rotate-2 border border-white/20 hover:border-pink-400/50 relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-violet-500/0 to-indigo-500/0 group-hover:from-pink-500/20 group-hover:via-violet-500/20 group-hover:to-indigo-500/20 rounded-3xl transition-all duration-700"></div>
        
        <div className="relative overflow-hidden">
          <img
            src={novel.coverUrl}
            alt={novel.title}
            className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          
          {/* Genre badge */}
          <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
            <span className="bg-gradient-to-r from-pink-500/90 to-violet-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-full border border-white/20 shadow-lg">
              {novel.genre}
            </span>
          </div>

          {/* Floating sparkles */}
          <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">{novel.views}</span>
                </div>
                <button
                  onClick={handleLikeClick}
                  className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 hover:bg-red-500/30 transition-colors duration-300"
                >
                  <Heart className="w-4 h-4 text-red-400 hover:fill-current transition-all duration-300" />
                  <span className="font-medium">{novel.likes}</span>
                </button>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400/50" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 relative">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-violet-400 transition-all duration-500">
            {novel.title}
          </h3>
          <p className="text-white/70 text-sm mb-3 group-hover:text-white/90 transition-colors duration-300">
            نویسنده: {novel.author}
          </p>
          <div className="flex items-center justify-between text-white/60 text-xs">
            <div className="flex items-center gap-1 group-hover:text-white/80 transition-colors duration-300">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(novel.uploadDate)}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-pink-400 font-medium">کلیک برای مشاهده</span>
            </div>
          </div>
          
          {/* Animated border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl"></div>
        </div>
      </div>
    </div>
  );
};