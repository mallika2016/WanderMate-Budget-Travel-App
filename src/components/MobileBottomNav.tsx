import React from 'react';
import { Compass, Target, Users, Wallet } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  remainingBudget: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  remainingBudget
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#070f17]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/10 px-2 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('explore')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'explore'
            ? 'text-emerald-500 font-bold scale-105'
            : 'text-slate-500 dark:text-[#bbcabf] font-medium'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px]">Explore</span>
      </button>

      <button
        onClick={() => setActiveTab('quests')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'quests'
            ? 'text-emerald-500 font-bold scale-105'
            : 'text-slate-500 dark:text-[#bbcabf] font-medium'
        }`}
      >
        <Target className="w-5 h-5" />
        <span className="text-[10px]">Quests</span>
      </button>

      <button
        onClick={() => setActiveTab('community')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
          activeTab === 'community'
            ? 'text-emerald-500 font-bold scale-105'
            : 'text-slate-500 dark:text-[#bbcabf] font-medium'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px]">Squad</span>
      </button>

      <button
        onClick={() => setActiveTab('budget')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all relative ${
          activeTab === 'budget'
            ? 'text-emerald-500 font-bold scale-105'
            : 'text-slate-500 dark:text-[#bbcabf] font-medium'
        }`}
      >
        <div className="relative">
          <Wallet className="w-5 h-5" />
          <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-emerald-500 text-[8px] font-bold text-white">
            ₹{remainingBudget.toFixed(0)}
          </span>
        </div>
        <span className="text-[10px]">Budget</span>
      </button>
    </nav>
  );
};
