import React from 'react';
import { X, Camera, Heart, Share2 } from 'lucide-react';
import { TOUR_DATA, INITIAL_DISHES } from '../data/tourData';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const photos = [
    {
      title: 'Old Delhi Chandni Chowk Bazaar Night Corridor',
      author: 'Vikram M.',
      likes: 248,
      url: TOUR_DATA.heroImage,
    },
    {
      title: 'Desi Ghee Golden Kesar Jalebi with Saffron Drops',
      author: 'Priya S.',
      likes: 195,
      url: TOUR_DATA.heroThumbnails[0].image,
    },
    {
      title: 'Crisp Golgappe Pani Puri with Mint Jaljeera Water',
      author: 'Rohan V.',
      likes: 312,
      url: TOUR_DATA.heroThumbnails[1].image,
    },
    {
      title: 'Crushed Khasta Kachori with Spicy Hing Aloo Sabzi',
      author: 'Aman G.',
      likes: 184,
      url: TOUR_DATA.heroThumbnails[2].image,
    },
    {
      title: 'Legendary Natraj Dahi Bhalla with Churned Curd',
      author: 'Ananya K.',
      likes: 420,
      url: TOUR_DATA.mustTry.image,
    },
    {
      title: 'Heritage Street Food Map & Shahjahanabad Landmarks',
      author: 'Delhi Heritage Walk',
      likes: 167,
      url: TOUR_DATA.mapImage,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#182029] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-white/10 shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-500" />
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Chandni Chowk Community Photos
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#bbcabf]">
                48 photos captured by WanderMate travelers this week
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:scale-105 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photos Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden group bg-slate-100 dark:bg-[#141c25] border border-slate-200 dark:border-white/5 flex flex-col shadow-sm"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] text-white">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span>{item.likes}</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-[#bbcabf] mt-0.5">
                  by {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-[#141c25]">
          <span className="text-xs text-slate-500 dark:text-[#bbcabf]">
            Snap photos at verified heritage stalls to earn +15 WanderPoints per upload.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-emerald-500 text-white font-bold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
