import React from 'react';
import { Compass } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full transition-colors duration-300 bg-slate-100 dark:bg-[#070f17] border-t border-slate-200 dark:border-white/5 py-8 pb-24 lg:pb-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-base text-slate-900 dark:text-white">
            Wander<span className="text-emerald-500 dark:text-[#4edea3]">Mate</span>
          </span>
          <span className="text-xs text-slate-400 dark:text-[#86948a] ml-2">
            © 2025 WanderMate Social Inc.
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-[#bbcabf]">
          <button 
            onClick={() => setActiveTab('explore')}
            className="hover:text-emerald-500 transition-colors"
          >
            Explore Map
          </button>
          <button 
            onClick={() => setActiveTab('quests')}
            className="hover:text-emerald-500 transition-colors"
          >
            Daily Quests
          </button>
          <button 
            onClick={() => setActiveTab('budget')}
            className="hover:text-emerald-500 transition-colors"
          >
            Currency Exchange
          </button>
          <button 
            onClick={() => setActiveTab('community')}
            className="hover:text-emerald-500 transition-colors"
          >
            Squad Hub
          </button>
        </div>
      </div>
    </footer>
  );
};
