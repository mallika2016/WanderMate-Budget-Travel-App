import React, { useState } from 'react';
import { 
  PlusCircle, 
  UserPlus, 
  Navigation, 
  Footprints, 
  Milestone, 
  ExternalLink, 
  Award, 
  ChevronRight, 
  Check, 
  Store,
  Sparkles,
  Zap,
  Copy
} from 'lucide-react';
import { TOUR_DATA } from '../data/tourData';

interface TripEstimateSidebarProps {
  onViewQuest: () => void;
  onAddedToPlan?: () => void;
}

export const TripEstimateSidebar: React.FC<TripEstimateSidebarProps> = ({
  onViewQuest,
  onAddedToPlan,
}) => {
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);
  const [splitCalculatorOpen, setSplitCalculatorOpen] = useState(false);
  const [squadMembers, setSquadMembers] = useState(3);
  const [copiedSplit, setCopiedSplit] = useState(false);

  const basePriceINR = TOUR_DATA.recommendedBudgetINR; // ₹350
  const basePriceUSD = TOUR_DATA.recommendedBudgetUSD; // $4.20
  const perPersonCostINR = Math.round(basePriceINR / squadMembers);
  const perPersonCostUSD = (basePriceUSD / squadMembers).toFixed(2);

  const handleAddToPlan = () => {
    setIsAddedToPlan(true);
    onAddedToPlan?.();
  };

  const handleCopySplit = () => {
    const text = `Hey squad! For the Chandni Chowk Heritage Food Tour, total estimate is ₹${basePriceINR} ($${basePriceUSD.toFixed(2)}). With ${squadMembers} people, each person pays ₹${perPersonCostINR} (~$${perPersonCostUSD}). UPI accepted at all stops. Ready to feast?`;
    navigator.clipboard?.writeText(text);
    setCopiedSplit(true);
    setTimeout(() => setCopiedSplit(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      {/* 1. Trip Quick Estimate Card */}
      <div className="rounded-3xl p-6 shadow-xl relative overflow-hidden border transition-colors duration-300 bg-white dark:bg-[#182029] border-slate-200/80 dark:border-white/5">
        <div className="flex items-center justify-between pb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-[#4edea3]">
            Trip Quick Estimate
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-[#4edea3]">
            Value Verified
          </span>
        </div>

        <div className="flex items-baseline gap-2 my-2">
          <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-[#4edea3]">
            ₹{basePriceINR}
          </span>
          <span className="text-sm font-semibold text-slate-500 dark:text-[#bbcabf]">
            (${basePriceUSD.toFixed(2)} / person total)
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-[#bbcabf] mb-5 leading-relaxed">
          Includes Natraj dahi bhalla, piping hot kesar jalebi, kachori aloo, and kulhad chai.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleAddToPlan}
            className={`w-full py-3.5 px-4 rounded-full font-bold text-sm transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 ${
              isAddedToPlan
                ? 'bg-emerald-600 dark:bg-[#10b981] text-white shadow-emerald-500/30'
                : 'bg-emerald-500 hover:bg-emerald-600 dark:bg-[#4edea3] dark:hover:bg-[#3ec48e] text-white dark:text-[#003824] shadow-emerald-500/30'
            }`}
          >
            {isAddedToPlan ? (
              <>
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Added to Squad Itinerary!</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                <span>Add to Group Plan</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSplitCalculatorOpen(!splitCalculatorOpen)}
            className="w-full py-3.5 px-4 rounded-full font-bold text-sm transition-all active:scale-[0.98] bg-orange-500 hover:bg-orange-600 dark:bg-[#ec6a06] dark:hover:bg-[#d65f04] text-white dark:text-white shadow-md shadow-orange-500/25 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>{splitCalculatorOpen ? 'Hide Split Calculator' : 'Split with Travel Buddies'}</span>
          </button>
        </div>

        {/* Collapsible Squad Split Calculator */}
        {splitCalculatorOpen && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#141c25] p-4 rounded-2xl flex flex-col gap-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#bbcabf]">
              <span>Squad Members:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSquadMembers(Math.max(1, squadMembers - 1))}
                  className="w-7 h-7 rounded-full bg-slate-200 dark:bg-[#232b33] flex items-center justify-center text-slate-800 dark:text-white font-bold hover:scale-105 transition-transform"
                >
                  -
                </button>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white px-2">
                  {squadMembers}
                </span>
                <button
                  onClick={() => setSquadMembers(Math.min(12, squadMembers + 1))}
                  className="w-7 h-7 rounded-full bg-slate-200 dark:bg-[#232b33] flex items-center justify-center text-slate-800 dark:text-white font-bold hover:scale-105 transition-transform"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/5">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Each pays:
              </span>
              <span className="font-black text-base text-emerald-600 dark:text-[#4edea3]">
                ₹{perPersonCostINR} <span className="text-xs font-normal text-slate-400">(~${perPersonCostUSD}) / person</span>
              </span>
            </div>

            <button
              onClick={handleCopySplit}
              className="mt-2 text-xs py-2 px-3 rounded-full bg-slate-200/80 dark:bg-[#232b33] text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-[#2e353e] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedSplit ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSplit ? 'Split Request Copied!' : 'Copy Share Breakdown'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Transit & Location Card */}
      <div className="rounded-3xl p-5 shadow-md border transition-colors duration-300 bg-white dark:bg-[#182029] border-slate-200/80 dark:border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-500 dark:text-[#4edea3]" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Transit &amp; Location
            </h3>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#4edea3]">
            Easy Metro Access
          </span>
        </div>

        {/* Map Snapshot with interactive badge */}
        <div 
          className="w-full h-44 bg-cover bg-center rounded-2xl relative overflow-hidden mb-3 border border-slate-200 dark:border-white/10"
          style={{ backgroundImage: `url('${TOUR_DATA.mapImage}')` }}
        >
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center animate-bounce">
              <div className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 border border-white/20">
                <Store className="w-3.5 h-3.5" />
                <span>Chandni Chowk Food Corridor</span>
              </div>
              <div className="w-2.5 h-2.5 bg-emerald-500 rotate-45 -mt-1" />
            </div>
          </div>
        </div>

        {/* Directions specifics */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
            <Footprints className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                3 min walk (250m) from Chandni Chowk Metro
              </span>
              <span className="text-slate-500 dark:text-[#bbcabf]">
                Exit 1 or 2 via Delhi Metro Yellow Line
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
            <Milestone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Entrance Tip
              </span>
              <span className="text-slate-500 dark:text-[#bbcabf]">
                Enter via Town Hall / Sis Ganj Sahib Gurudwara side to avoid vehicle jams
              </span>
            </div>
          </div>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Chandni+Chowk+Old+Delhi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#232b33] dark:hover:bg-[#2e353e] text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Open Live Directions</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3. Active Squad Quest Card */}
      <div className="rounded-3xl p-5 shadow-md border relative overflow-hidden transition-colors duration-300 bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-amber-500/20 dark:via-[#182029] dark:to-[#182029] border-amber-500/20 dark:border-amber-500/20">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-[#ffb95f]">
                Active Squad Quest
              </span>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Old Delhi Heritage Spice Trail
              </h4>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-[#bbcabf] mt-2.5 mb-4 leading-relaxed">
          Scan UPI QR codes at 2 participating stalls to log your snacks and claim your points.
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-amber-500/20">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-[#ffb95f] font-extrabold text-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>+40 WanderPoints</span>
          </div>

          <button
            onClick={onViewQuest}
            className="text-xs font-bold text-amber-600 dark:text-[#ffb95f] hover:underline flex items-center gap-0.5"
          >
            <span>View Quest</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
