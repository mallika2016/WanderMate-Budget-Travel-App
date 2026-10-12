import React from 'react';
import { 
  CreditCard, 
  Coins, 
  Clock, 
  Lightbulb, 
  Tag, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { TOUR_DATA } from '../data/tourData';

export const BudgetBreakdown: React.FC = () => {
  return (
    <div className="rounded-3xl p-6 relative overflow-hidden shadow-lg border transition-colors duration-300 bg-white dark:bg-[#182029] border-slate-200/80 dark:border-white/5">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-[#4edea3]">
            Pocket-Friendly Analysis
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
            Budget Breakdown
          </h2>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full self-start sm:self-auto bg-emerald-500/10 dark:bg-[#232b33] border border-emerald-500/20 dark:border-white/5">
          <Tag className="w-4 h-4 text-emerald-500 dark:text-[#4edea3]" />
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-sm text-emerald-600 dark:text-[#4edea3]">
              {TOUR_DATA.priceRange}
            </span>
            <span className="text-xs text-slate-500 dark:text-[#bbcabf]">
              / item avg
            </span>
          </div>
        </div>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3">
        {/* Recommended Budget */}
        <div className="p-4 rounded-2xl flex flex-col justify-between bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-[#bbcabf]">
              Recommended Budget
            </span>
            <Coins className="w-4 h-4 text-emerald-500 dark:text-[#4edea3]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              ₹{TOUR_DATA.recommendedBudgetINR}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              (${TOUR_DATA.recommendedBudgetUSD.toFixed(2)})
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#bbcabf] mt-1.5">
            Covers 4-5 heritage chaat dishes, hot lassi &amp; jalebi
          </p>
        </div>

        {/* Payment Mode */}
        <div className="p-4 rounded-2xl flex flex-col justify-between bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-[#bbcabf]">
              Payment Mode
            </span>
            <QrCode className="w-4 h-4 text-amber-500 dark:text-[#ffb95f]" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-[#ffb95f]">
            {TOUR_DATA.paymentMode}
          </span>
          <p className="text-xs text-slate-500 dark:text-[#bbcabf] mt-1.5">
            {TOUR_DATA.paymentSubtext}
          </p>
        </div>

        {/* Peak Value Window */}
        <div className="p-4 rounded-2xl flex flex-col justify-between bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-[#bbcabf]">
              Peak Value Window
            </span>
            <Clock className="w-4 h-4 text-orange-500 dark:text-[#ffb690]" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-[#ffb690]">
            {TOUR_DATA.peakHours}
          </span>
          <p className="text-xs text-slate-500 dark:text-[#bbcabf] mt-1.5">
            {TOUR_DATA.peakHoursSubtext}
          </p>
        </div>
      </div>

      {/* Must Try Value Pick Feature */}
      <div className="mt-2 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 bg-emerald-500/5 dark:bg-[#070f17] border border-emerald-500/20 dark:border-white/5">
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-200 dark:border-white/10">
          <div
            className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url('${TOUR_DATA.mustTry.image}')` }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b] text-[10px] font-extrabold uppercase tracking-wider">
              Must Try Heritage Pick
            </span>
            <span className="font-extrabold text-xs text-emerald-600 dark:text-[#4edea3]">
              {TOUR_DATA.mustTry.priceINR} ({TOUR_DATA.mustTry.priceUSD})
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {TOUR_DATA.mustTry.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-[#bbcabf] italic mt-1 line-clamp-2">
            {TOUR_DATA.mustTry.quote}
          </p>
        </div>
      </div>

      {/* Budget Tip Callout Banner */}
      <div className="mt-4 flex items-center gap-2.5 p-3 rounded-full bg-slate-100/80 dark:bg-[#232b33]/60 text-slate-600 dark:text-[#bbcabf] text-xs">
        <Lightbulb className="w-4 h-4 text-emerald-500 dark:text-[#4edea3] ml-1 shrink-0" />
        <span className="truncate">
          Budget tip: Use UPI (GPay/PhonePe/Paytm) at counters; carry ₹50–₹100 notes for handcarts and cycle-rickshaws.
        </span>
      </div>
    </div>
  );
};
