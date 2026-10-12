import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ArrowRightLeft, 
  TrendingUp, 
  Sparkles,
  PieChart
} from 'lucide-react';
import { BudgetItem } from '../types';

interface BudgetTrackerViewProps {
  budgetItems: BudgetItem[];
  totalSpentINR: number;
  budgetCapINR: number;
  onAddItem: (item: Omit<BudgetItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onBackToExplore: () => void;
}

export const BudgetTrackerView: React.FC<BudgetTrackerViewProps> = ({
  budgetItems,
  totalSpentINR,
  budgetCapINR,
  onAddItem,
  onDeleteItem,
  onBackToExplore
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Street Snack');
  const [newCostINR, setNewCostINR] = useState('');
  const [newStall, setNewStall] = useState('');

  // Currency Converter quick calculator state: 1 USD ≈ 84 INR
  const [usdInput, setUsdInput] = useState('5');
  const usdNum = parseFloat(usdInput) || 0;
  const inrOutput = Math.round(usdNum * 84);

  const remaining = Math.max(0, budgetCapINR - totalSpentINR);
  const percentage = Math.min(100, Math.round((totalSpentINR / budgetCapINR) * 100));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = parseFloat(newCostINR);
    if (!newTitle.trim() || isNaN(cost) || cost <= 0) return;

    onAddItem({
      title: newTitle.trim(),
      category: newCategory,
      costINR: Math.round(cost),
      costUSD: parseFloat((cost / 84).toFixed(2)),
      time: 'Just now',
      stall: newStall.trim() || 'Chandni Chowk Vendor'
    });

    setNewTitle('');
    setNewCostINR('');
    setNewStall('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToExplore}
          className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tour</span>
        </button>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Log Street Food Bite</span>
        </button>
      </div>

      {/* Main Budget Dashboard Banner */}
      <div className="rounded-3xl p-6 bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/5 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-[#4edea3]">
              Daily Pocket Tracker
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Old Delhi Street Food Wallet
            </h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-[#4edea3]">
              ₹{totalSpentINR}
            </span>
            <span className="text-slate-400 font-bold text-sm">
              / ₹{budgetCapINR} daily limit
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
            <span>Spent: {percentage}% of budget</span>
            <span>₹{remaining} Remaining Safe Buffer</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#141c25] overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                percentage > 85
                  ? 'bg-orange-500'
                  : percentage > 60
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* 3 Overview Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
            <span className="text-xs text-slate-500 dark:text-[#bbcabf] font-semibold">Total Spent Today</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">₹{totalSpentINR}</p>
            <span className="text-[11px] text-slate-400">≈ ${(totalSpentINR / 84).toFixed(2)} USD</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
            <span className="text-xs text-slate-500 dark:text-[#bbcabf] font-semibold">Remaining Allowance</span>
            <p className="text-xl font-bold text-emerald-600 dark:text-[#4edea3] mt-1">₹{remaining}</p>
            <span className="text-[11px] text-slate-400">≈ ${(remaining / 84).toFixed(2)} USD</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
            <span className="text-xs text-slate-500 dark:text-[#bbcabf] font-semibold">Avg Snack Cost</span>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              ₹{Math.round(totalSpentINR / Math.max(1, budgetItems.length))}
            </p>
            <span className="text-[11px] text-slate-400">{budgetItems.length} items logged</span>
          </div>
        </div>
      </div>

      {/* Live USD <-> INR Converter Widget */}
      <div className="rounded-3xl p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Instant USD to INR Converter
            </h4>
            <p className="text-xs text-slate-500 dark:text-[#bbcabf]">
              Market benchmark: 1 USD ≈ 84 INR (Ideal for planning street food expenses)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-[#182029] px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
            <span className="text-xs text-slate-400 mr-1">$</span>
            <input
              type="number"
              value={usdInput}
              onChange={(e) => setUsdInput(e.target.value)}
              className="w-16 text-xs font-bold bg-transparent border-0 focus:outline-none text-slate-900 dark:text-white"
            />
          </div>
          <span className="font-bold text-xs text-slate-400">=</span>
          <div className="bg-emerald-500 text-white px-3.5 py-1.5 rounded-full text-xs font-black">
            ₹{inrOutput.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Itemized Receipts List */}
      <div className="rounded-3xl p-6 bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/5 shadow-md">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
          Today's Chandni Chowk Food Trail Bills
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {budgetItems.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[#141c25] flex items-center justify-center font-bold text-emerald-600 dark:text-[#4edea3] text-xs shrink-0">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#bbcabf] truncate">
                    {item.stall} • <span className="text-slate-400">{item.time}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    ₹{item.costINR}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    ${item.costUSD.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="opacity-60 hover:opacity-100 text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors"
                  title="Remove expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white dark:bg-[#182029] rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-white/10 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Log Street Food Purchase
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-[#bbcabf] block mb-1">
                Item or Snack Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Paranthe Wali Gali Aloo Parantha"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#141c25] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-[#bbcabf] block mb-1">
                  Cost in INR (₹)
                </label>
                <input
                  type="number"
                  step="5"
                  required
                  placeholder="80"
                  value={newCostINR}
                  onChange={(e) => setNewCostINR(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#141c25] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-[#bbcabf] block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#141c25] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Street Snack">Street Snack / Chaat</option>
                  <option value="Drink">Chai / Lassi</option>
                  <option value="Dessert">Mithai / Kulfi</option>
                  <option value="Heritage Meal">Heritage Meal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-[#bbcabf] block mb-1">
                Stall / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Paranthe Wali Gali or Kuremal"
                value={newStall}
                onChange={(e) => setNewStall(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#141c25] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
              >
                Save Expense
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-full bg-slate-100 dark:bg-[#232b33] text-slate-700 dark:text-slate-200 font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
