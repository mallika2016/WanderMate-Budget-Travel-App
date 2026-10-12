import React, { useState } from 'react';
import { MessageSquarePlus, Send, Sparkles, Check } from 'lucide-react';
import { ReviewItem } from '../types';

interface LiveTravelersProps {
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'timeAgo'>) => void;
}

export const LiveTravelers: React.FC<LiveTravelersProps> = ({
  reviews,
  onAddReview
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [squad, setSquad] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddReview({
      author: name.trim() || 'You',
      squad: squad.trim() || 'Kyoto Explorer',
      avatarColor: 'bg-emerald-500',
      avatarLetter: (name.trim() || 'Y').charAt(0).toUpperCase(),
      comment: comment.trim(),
    });

    setName('');
    setSquad('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
    }, 1500);
  };

  return (
    <div className="rounded-3xl p-6 shadow-md border transition-colors duration-300 bg-white dark:bg-[#182029] border-slate-200/80 dark:border-white/5">
      {/* Header with Live Count */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-500 dark:text-[#ffb95f]">
            Live Activity
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            WanderMate Travelers on Route
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-[#4edea3] text-[11px] font-extrabold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>18 In Area</span>
        </div>
      </div>

      {/* Squad Verification Banner */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5">
        <div className="flex -space-x-2.5 overflow-hidden">
          <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#182029] bg-slate-200 dark:bg-[#232b33] flex items-center justify-center font-bold text-xs text-emerald-600 dark:text-[#4edea3]">
            KL
          </div>
          <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#182029] bg-orange-100 dark:bg-[#ec6a06] flex items-center justify-center font-bold text-xs text-orange-700 dark:text-white">
            AM
          </div>
          <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#182029] bg-amber-100 dark:bg-[#e29100] flex items-center justify-center font-bold text-xs text-amber-800 dark:text-white">
            RN
          </div>
          <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#182029] bg-emerald-100 dark:bg-[#10b981] flex items-center justify-center font-bold text-xs text-emerald-800 dark:text-[#00422b]">
            JW
          </div>
          <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#182029] bg-slate-300 dark:bg-[#2e353e] flex items-center justify-center font-bold text-xs text-slate-800 dark:text-[#dbe3ef]">
            +14
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            Elena, Kenji &amp; 16 squad buddies verified this tour
          </p>
          <p className="text-xs text-slate-500 dark:text-[#bbcabf] mt-0.5">
            4 community reviews added within the last 48 hours
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-[#4edea3] transition-colors flex items-center gap-1.5"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Close Form' : 'Share Tip'}</span>
        </button>
      </div>

      {/* Add Review Inline Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 rounded-2xl bg-emerald-500/5 dark:bg-[#070f17] border border-emerald-500/20 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#4edea3]">
            Add Your Traveler Tip or Nishiki Review
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Your name (e.g. Alex K.)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Your Squad / Trip Type (e.g. Solo Explorer)"
              value={squad}
              onChange={(e) => setSquad(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <textarea
            placeholder="Share what you ate, current crowd levels, or a budget saving secret..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={submitted}
              className="px-4 py-2 rounded-full bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b] text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              {submitted ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Posted!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Post Tip
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-2xl flex flex-col justify-between bg-slate-50 dark:bg-[#141c25] border border-slate-100 dark:border-white/5 shadow-sm"
          >
            <p className="text-sm text-slate-700 dark:text-[#dbe3ef] italic">
              "{rev.comment}"
            </p>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${rev.avatarColor} flex items-center justify-center text-white font-extrabold text-[11px]`}>
                  {rev.avatarLetter}
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-white">
                  {rev.author} • <span className="font-normal text-slate-500 dark:text-[#bbcabf]">{rev.squad}</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#86948a]">
                {rev.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
