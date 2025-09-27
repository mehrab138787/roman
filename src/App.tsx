import React, { useState, useEffect } from 'react';
import { Book, Upload, Heart, Star, Calendar, Eye, Download, X, Plus, Sparkles } from 'lucide-react';
import { NovelCard } from './components/NovelCard';
import { UploadForm } from './components/UploadForm';
import { NovelModal } from './components/NovelModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Novel } from './types/Novel';

function App() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 2500);
  }, []);

  const handleUploadNovel = (novelData: Omit<Novel, 'id' | 'uploadDate' | 'views' | 'likes'>) => {
    const newNovel: Novel = {
      ...novelData,
      id: Date.now().toString(),
      uploadDate: new Date(),
      views: 0,
      likes: 0
    };
    setNovels(prev => [newNovel, ...prev]);
    setIsUploadFormOpen(false);
  };

  const handleLikeNovel = (novelId: string) => {
    setNovels(prev => prev.map(novel => 
      novel.id === novelId 
        ? { ...novel, likes: novel.likes + 1 }
        : novel
    ));
  };

  const handleViewNovel = (novelId: string) => {
    setNovels(prev => prev.map(novel => 
      novel.id === novelId 
        ? { ...novel, views: novel.views + 1 }
        : novel
    ));
  };

  const sortedNovels = [...novels].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.uploadDate.getTime() - a.uploadDate.getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden">
        <div className="text-center relative">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="animate-pulse-slow mb-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-pink-400 mr-4 animate-heartbeat" />
                <Sparkles className="w-10 h-10 text-violet-400 animate-sparkle" />
                <Book className="w-12 h-12 text-indigo-400 ml-4 animate-bounce-slow" />
              </div>
              <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 mb-6 animate-gradient-text">
                Amora
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-xl text-white/80 font-light animate-fade-in-delayed">
                دنیای جادویی رمان‌ها در حال بارگذاری...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex items-center gap-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/20"
              >
                <option value="newest" className="bg-gray-800">جدیدترین</option>
                <option value="popular" className="bg-gray-800">محبوب‌ترین</option>
              </select>
              <div className="flex items-center gap-2 text-white/70 text-sm bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
                <Book className="w-4 h-4" />
                <span>{novels.length} رمان</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsUploadFormOpen(true)}
              className="group bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 hover:from-pink-600 hover:via-violet-600 hover:to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-pink-500/25 flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              <span className="relative z-10">آپلود رمان جدید</span>
              <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-500" />
            </button>
          </div>

          {/* Books Grid */}
          {novels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {sortedNovels.map((novel, index) => (
                <NovelCard
                  key={novel.id}
                  novel={novel}
                  onClick={(novel) => {
                    handleViewNovel(novel.id);
                    setSelectedNovel(novel);
                  }}
                  onLike={() => handleLikeNovel(novel.id)}
                  animationDelay={index * 150}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                </div>
                <Book className="w-24 h-24 text-white/40 mx-auto relative z-10 animate-float" />
              </div>
              <h3 className="text-3xl font-bold text-white/80 mb-4 animate-fade-in-up">
                هنوز رمانی آپلود نشده
              </h3>
              <p className="text-white/60 mb-8 text-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                اولین رمان خود را آپلود کنید و دنیای Amora را آغاز کنید
              </p>
              <button
                onClick={() => setIsUploadFormOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-fade-in-up flex items-center gap-3 mx-auto"
                style={{ animationDelay: '400ms' }}
              >
                <Upload className="w-6 h-6" />
                آپلود اولین رمان
                <Heart className="w-5 h-5 animate-heartbeat" />
              </button>
            </div>
          )}
        </main>

        {/* Modals */}
        {isUploadFormOpen && (
          <UploadForm
            onSubmit={handleUploadNovel}
            onClose={() => setIsUploadFormOpen(false)}
          />
        )}

        {selectedNovel && (
          <NovelModal
            novel={selectedNovel}
            onClose={() => setSelectedNovel(null)}
            onLike={() => handleLikeNovel(selectedNovel.id)}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;