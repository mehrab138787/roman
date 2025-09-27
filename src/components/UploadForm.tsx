import React, { useState, useRef } from 'react';
import { Upload, X, Image, FileText, Tag, Heart, Sparkles, Check } from 'lucide-react';
import { Novel } from '../types/Novel';

interface UploadFormProps {
  onSubmit: (novel: Omit<Novel, 'id' | 'uploadDate' | 'views' | 'likes'>) => void;
  onClose: () => void;
}

const genres = [
  'رمانتیک', 'معمایی', 'علمی تخیلی', 'تاریخی', 'فانتزی', 
  'درام', 'کمدی', 'ماجراجویی', 'ترسناک', 'اجتماعی'
];

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    coverUrl: '',
    pdfUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<'cover' | 'pdf' | null>(null);
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File, type: 'cover' | 'pdf') => {
    if (type === 'cover') {
      if (file.type.startsWith('image/')) {
        setCoverFile(file);
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, coverUrl: url }));
      }
    } else if (type === 'pdf') {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, pdfUrl: url }));
      }
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'cover' | 'pdf') => {
    e.preventDefault();
    setDragOver(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.genre) return;

    setIsSubmitting(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl w-full max-w-2xl border border-white/20 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">آپلود رمان جدید</h2>
                <p className="text-white/60 text-sm">رمان خود را با دنیا به اشتراک بگذارید</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-pink-400" />
                نام رمان
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="نام رمان را وارد کنید"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-violet-400" />
                نویسنده
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="نام نویسنده را وارد کنید"
                required
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-400" />
                ژانر
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                required
              >
                <option value="" className="bg-gray-800">ژانر را انتخاب کنید</option>
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800">{genre}</option>
                ))}
              </select>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium flex items-center gap-2">
                <Image className="w-4 h-4 text-pink-400" />
                تصویر جلد
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                  dragOver === 'cover' 
                    ? 'border-pink-400 bg-pink-400/10' 
                    : coverFile 
                      ? 'border-green-400 bg-green-400/10' 
                      : 'border-white/30 hover:border-pink-400 hover:bg-white/5'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver('cover');
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, 'cover')}
                onClick={() => coverInputRef.current?.click()}
              >
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'cover');
                  }}
                  className="hidden"
                />
                {coverFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <Check className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-green-400 font-medium">{coverFile.name}</p>
                      <p className="text-white/60 text-sm">تصویر جلد آپلود شد</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Image className="w-12 h-12 text-white/40 mx-auto mb-3" />
                    <p className="text-white/70 font-medium mb-1">تصویر جلد را اینجا رها کنید</p>
                    <p className="text-white/50 text-sm">یا کلیک کنید تا انتخاب کنید</p>
                    <p className="text-white/40 text-xs mt-2">JPG, PNG, GIF تا 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* PDF Upload */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" />
                فایل PDF رمان
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                  dragOver === 'pdf' 
                    ? 'border-violet-400 bg-violet-400/10' 
                    : pdfFile 
                      ? 'border-green-400 bg-green-400/10' 
                      : 'border-white/30 hover:border-violet-400 hover:bg-white/5'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver('pdf');
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, 'pdf')}
                onClick={() => pdfInputRef.current?.click()}
              >
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'pdf');
                  }}
                  className="hidden"
                />
                {pdfFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <Check className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-green-400 font-medium">{pdfFile.name}</p>
                      <p className="text-white/60 text-sm">فایل PDF آپلود شد</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileText className="w-12 h-12 text-white/40 mx-auto mb-3" />
                    <p className="text-white/70 font-medium mb-1">فایل PDF را اینجا رها کنید</p>
                    <p className="text-white/50 text-sm">یا کلیک کنید تا انتخاب کنید</p>
                    <p className="text-white/40 text-xs mt-2">فقط فایل‌های PDF تا 50MB</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.author || !formData.genre}
              className="w-full bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500 hover:from-pink-600 hover:via-violet-600 hover:to-indigo-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 rounded-xl transition-all duration-500 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-2xl hover:shadow-pink-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>در حال آپلود...</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span className="relative z-10">آپلود رمان</span>
                  <Heart className="w-5 h-5 animate-heartbeat" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};