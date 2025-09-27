import React, { useState } from 'react';
import { X, Download, Heart, Eye, Calendar, User, Tag, Star, Share2, Bookmark } from 'lucide-react';
import { Novel } from '../types/Novel';

interface NovelModalProps {
  novel: Novel;
  onClose: () => void;
  onLike: () => void;
}

export const NovelModal: React.FC<NovelModalProps> = ({ novel, onClose, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = () => {
    if (novel.pdfUrl && novel.pdfUrl !== '#') {
      const link = document.createElement('a');
      link.href = novel.pdfUrl;
      link.download = `${novel.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: novel.title,
        text: `رمان "${novel.title}" نوشته ${novel.author}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden border border-white/20 shadow-2xl animate-slide-up">
        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Image Section */}
          <div className="lg:w-2/5 relative">
            <img
              src={novel.coverUrl}
              alt={novel.title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Genre badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-gradient-to-r from-pink-500/90 to-violet-500/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full border border-white/20">
                {novel.genre}
              </span>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-3">
              <button
                onClick={handleLike}
                className={`flex-1 ${isLiked ? 'bg-red-500' : 'bg-white/20'} backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                پسندیدن
              </button>
              <button
                onClick={handleBookmark}
                className={`${isBookmarked ? 'bg-yellow-500' : 'bg-white/20'} backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-3/5 p-8 overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 mb-4">
                {novel.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-pink-400" />
                  <span className="font-medium">{novel.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-violet-400" />
                  <span>{novel.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span>{formatDate(novel.uploadDate)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-400/30">
                  <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-bold text-xl">{novel.views.toLocaleString()}</div>
                  <div className="text-white/60 text-sm">بازدید</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl border border-red-400/30">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <div className="text-white font-bold text-xl">{novel.likes}</div>
                  <div className="text-white/60 text-sm">پسندیده</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl border border-yellow-400/30">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-bold text-xl">4.8</div>
                  <div className="text-white/60 text-sm">امتیاز</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl border border-green-400/30">
                  <Download className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-bold text-xl">0</div>
                  <div className="text-white/60 text-sm">دانلود</div>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 mb-8 border border-white/10">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  پیش‌نمایش رمان
                </h3>
                
                {novel.pdfUrl && novel.pdfUrl !== '#' ? (
                  <div className="bg-white/5 rounded-xl p-6 border-2 border-dashed border-white/20">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">PDF</span>
                      </div>
                      <p className="text-white/80 mb-4">فایل PDF آماده مشاهده است</p>
                      <button
                        onClick={handleDownload}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        مشاهده و دانلود PDF
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-8 text-center border-2 border-dashed border-white/20">
                    <div className="w-16 h-16 bg-white/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white/60 text-sm">PDF</span>
                    </div>
                    <p className="text-white/70 mb-4">فایل PDF هنوز آپلود نشده است</p>
                    <div className="space-y-3 text-right max-w-md mx-auto">
                      <div className="h-3 bg-white/10 rounded-full w-full animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded-full w-4/5 animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded-full w-full animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded-full w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!novel.pdfUrl || novel.pdfUrl === '#'}
                className="w-full bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 hover:from-pink-600 hover:via-violet-600 hover:to-indigo-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-2xl hover:shadow-pink-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Download className="w-6 h-6 relative z-10" />
                <span className="relative z-10 text-lg">
                  {novel.pdfUrl && novel.pdfUrl !== '#' ? 'دانلود رمان' : 'فایل در دسترس نیست'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};