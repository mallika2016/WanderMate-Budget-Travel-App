import React, { useState } from 'react';
import { 
  Award, 
  Zap, 
  QrCode, 
  CheckCircle2, 
  ArrowLeft, 
  Trophy, 
  Flame, 
  Sparkles,
  Check
} from 'lucide-react';
import { QuestItem } from '../types';

interface QuestsViewProps {
  quests: QuestItem[];
  onCompleteStep: (questId: string) => void;
  onBackToExplore: () => void;
  wanderPoints: number;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  quests,
  onCompleteStep,
  onBackToExplore,
  wanderPoints
}) => {
  const [scanningQuestId, setScanningQuestId] = useState<string | null>(null);

  const handleSimulateScan = (questId: string) => {
    setScanningQuestId(questId);
    setTimeout(() => {
      onCompleteStep(questId);
      setScanningQuestId(null);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Top Banner & Stats */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToExplore}
          className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tour</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
            <Flame className="w-4 h-4 fill-current text-orange-500" />
            <span>4-Day Streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#4edea3] font-black text-xs">
            <Zap className="w-4 h-4 fill-current" />
            <span>{wanderPoints} WanderPoints</span>
          </div>
        </div>
      </div>

      {/* Gamification Level Card */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-200">
              Season 4 • Old Delhi Heritage Guild
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Level 3: Chaat &amp; Gali Scout
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md">
              Complete Chandni Chowk street food challenges to unlock the exclusive "Shahjahanabad Explorer" badge and street crawl perks.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-white/20 min-w-[150px]">
            <Trophy className="w-8 h-8 text-amber-300 mb-1" />
            <span className="text-xs font-semibold text-emerald-100">Next Tier Reward</span>
            <span className="text-sm font-bold text-white">₹150 Kulfi Voucher</span>
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Active Squad &amp; Solo Quests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quests.map((quest) => {
            const isFinished = quest.completed;
            const progressPercent = Math.min(100, Math.round((quest.progress / quest.total) * 100));

            return (
              <div
                key={quest.id}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isFinished
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white dark:bg-[#182029] border-slate-200 dark:border-white/5 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 dark:text-[#ffb95f]">
                      {quest.category}
                    </span>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
                      <Zap className="w-3 h-3 fill-current" />
                      +{quest.points} pts
                    </div>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-[#bbcabf] mt-1 mb-4">
                    {quest.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      <span>Progress</span>
                      <span>{quest.progress} / {quest.total} Stalls</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#141c25] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {isFinished ? (
                    <div className="py-2.5 px-3 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Quest Completed • Unlocked "{quest.badgeName}"</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSimulateScan(quest.id)}
                      disabled={scanningQuestId === quest.id}
                      className="w-full py-2.5 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>{scanningQuestId === quest.id ? 'Scanning Stall UPI QR...' : 'Simulate Stall UPI / QR Check-in'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
