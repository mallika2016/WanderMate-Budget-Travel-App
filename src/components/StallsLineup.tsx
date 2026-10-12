import React, { useState } from 'react';
import { Star, Check, Info, Plus } from 'lucide-react';
import { DishItem } from '../types';

interface StallsLineupProps {
  dishes: DishItem[];
  onToggleVisited: (id: string) => void;
  onAddDishToBudget?: (dish: DishItem) => void;
}

export const StallsLineup: React.FC<StallsLineupProps> = ({
  dishes,
  onToggleVisited,
  onAddDishToBudget
}) => {
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-500 dark:text-[#ffb690]">
            Curated Lineup
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Top Budget Stalls &amp; Dishes
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-[#bbcabf]">
          {dishes.length} of 130+ Selected
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {dishes.map((dish) => {
          const isVisited = dish.visited;

          return (
            <div
              key={dish.id}
              className={`p-4 rounded-3xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group border ${
                isVisited
                  ? 'bg-emerald-500/5 dark:bg-[#10b981]/10 border-emerald-500/40'
                  : 'bg-white hover:bg-slate-50 dark:bg-[#182029] dark:hover:bg-[#232b33] border-slate-200/80 dark:border-white/5 shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Number or Checkmark Indicator */}
                <button
                  onClick={() => onToggleVisited(dish.id)}
                  title={isVisited ? "Mark as unvisited" : "Mark as visited"}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-transform group-hover:scale-105 ${
                    isVisited
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-[#141c25] text-emerald-600 dark:text-[#4edea3]'
                  }`}
                >
                  {isVisited ? <Check className="w-5 h-5 stroke-[3]" /> : dish.number}
                </button>

                {/* Dish image thumbnail */}
                <div 
                  onClick={() => setSelectedDish(dish)}
                  className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 cursor-pointer relative shadow-sm border border-slate-200 dark:border-white/10"
                >
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${dish.image}')` }}
                  />
                </div>

                {/* Title & Metadata */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 
                      onClick={() => setSelectedDish(dish)}
                      className="font-bold text-base text-slate-900 dark:text-white truncate cursor-pointer hover:text-emerald-500 transition-colors"
                    >
                      {dish.name}
                    </h3>
                    <span className="flex items-center text-amber-500 font-bold text-xs shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      {dish.rating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-[#bbcabf] mt-0.5 truncate">
                    {dish.stall}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className={`inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wide ${
                      dish.badgeColor === 'secondary'
                        ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400'
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {dish.badge}
                    </span>

                    {isVisited && (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Sampled!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-[#4edea3]">
                  ₹{dish.priceINR}
                </span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  ${dish.priceUSD.toFixed(2)}
                </span>

                {onAddDishToBudget && (
                  <button
                    onClick={() => onAddDishToBudget(dish)}
                    className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-[#4edea3] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add to Tracker
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dish Quick Info Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#182029] rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-white/10 shadow-2xl relative">
            <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedDish.image}')` }}
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                ₹{selectedDish.priceINR} • ${selectedDish.priceUSD.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {selectedDish.stall.split('•')[0]}
              </span>
              <span className="flex items-center text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                {selectedDish.rating} / 5.0
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedDish.name}
            </h3>

            <p className="text-sm text-slate-600 dark:text-[#bbcabf] mb-4">
              {selectedDish.description}
            </p>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141c25] text-xs space-y-1 mb-5">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Pro-Tips for Chandni Chowk Food Walks:
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                • Always ask for "kam teekha" (less spicy) or "meetha pani" (sweet water) if sensitive to red &amp; green chilli heat.
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                • Look for designated leaf dona / paper bowl dustbins right beside the vendor counter to keep the bazaar clean.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onToggleVisited(selectedDish.id);
                  setSelectedDish(null);
                }}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedDish.visited
                    ? 'bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white'
                    : 'bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b]'
                }`}
              >
                <Check className="w-4 h-4" />
                {selectedDish.visited ? 'Mark as Unvisited' : 'Mark Visited & Sampled'}
              </button>
              <button
                onClick={() => setSelectedDish(null)}
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#232b33] dark:hover:bg-[#2e353e] text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
