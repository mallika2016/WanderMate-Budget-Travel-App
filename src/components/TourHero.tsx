import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Star, 
  PiggyBank, 
  CheckCircle2, 
  Camera, 
  Check
} from 'lucide-react';
import { TOUR_DATA } from '../data/tourData';

interface TourHeroProps {
  onOpenPhotos: () => void;
  onSelectThumbnail?: (title: string) => void;
}

export const TourHero: React.FC<TourHeroProps> = ({ 
  onOpenPhotos,
  onSelectThumbnail 
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nishiki Market Street Food Tour',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb & Quick Actions Bar */}
      <div className="w-full py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 transition-all shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 truncate text-xs sm:text-sm font-medium text-slate-500 dark:text-[#bbcabf]">
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">Explore</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors hidden xs:inline">Delhi, India</span>
            <span className="text-slate-400 dark:text-slate-600 hidden xs:inline">/</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors hidden sm:inline">Street Food</span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">/</span>
            <span className="text-slate-900 dark:text-white font-bold truncate">Chandni Chowk</span>
          </nav>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-bold ${
              isSaved
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-400'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] dark:border-white/5 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-emerald-500' : 'text-emerald-500'}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved Tour' : 'Save Tour'}</span>
          </button>

          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-200 transition-all relative"
            aria-label="Share"
            title="Share tour"
          >
            {copiedShare ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {copiedShare && (
              <span className="absolute -bottom-7 right-0 text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Hero Visual Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Main Hero Banner */}
        <div className="lg:col-span-8 relative h-[360px] md:h-[460px] rounded-3xl overflow-hidden group shadow-xl border border-slate-200/50 dark:border-white/5">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${TOUR_DATA.heroImage}')` }}
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent dark:from-[#0c141c] dark:via-[#0c141c]/30" />

          {/* Badges in top-left */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 font-extrabold text-xs shadow-md border border-white/10">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>4.9</span>
              <span className="text-slate-300 font-normal">({TOUR_DATA.reviewsCount.toLocaleString()} Reviews)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-400 font-bold text-[11px] uppercase tracking-wider border border-emerald-500/30">
              <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
              <span>Top Budget Pick</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/20 backdrop-blur-md text-orange-300 font-bold text-[11px] uppercase tracking-wider border border-orange-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
              <span>Verified Heritage Gem</span>
            </div>
          </div>

          {/* Bottom Title & Community Photo Trigger */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  {TOUR_DATA.openHours}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                {TOUR_DATA.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-200/90 mt-1">
                {TOUR_DATA.subtitle}
              </p>
            </div>

            <button
              onClick={onOpenPhotos}
              className="flex items-center gap-2 self-start md:self-auto bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md px-3.5 py-2 rounded-full text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-all shadow-md group/btn"
            >
              <Camera className="w-4 h-4 text-amber-400 group-hover/btn:scale-110 transition-transform" />
              <span>48 Community Photos</span>
            </button>
          </div>
        </div>

        {/* 3 Right Side Featured Food Previews */}
        <div className="lg:col-span-4 flex flex-col gap-3 h-[360px] md:h-[460px]">
          {TOUR_DATA.heroThumbnails.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectThumbnail?.(item.title)}
              className="flex-1 relative rounded-2xl overflow-hidden group shadow-md border border-slate-200/60 dark:border-white/5 cursor-pointer"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-sm border border-emerald-500/30">
                    <span className="font-black text-emerald-400 text-xs sm:text-sm">
                      {item.priceINR}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      ({item.priceUSD})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
