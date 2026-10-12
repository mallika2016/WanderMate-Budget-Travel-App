import React, { useState } from 'react';
import { ArrowLeft, Users, Send, MessageCircle, ShieldCheck, MapPin } from 'lucide-react';

interface CommunityViewProps {
  onBackToExplore: () => void;
}

interface Message {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  avatarColor: string;
  text: string;
  time: string;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onBackToExplore }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'Priya S.',
      role: 'Squad Leader',
      avatar: 'P',
      avatarColor: 'bg-emerald-500',
      text: 'Just tried the Natraj Dahi Bhalla at corner #19. The line is 6 people deep, moving super fast!',
      time: '4:15 PM'
    },
    {
      id: 'm-2',
      sender: 'Rohan V.',
      role: 'Old Delhi Foodie',
      avatar: 'R',
      avatarColor: 'bg-blue-500',
      text: 'Remember to ask for rabri on your jalebi at Dariba Kalan—pure desi ghee bliss!',
      time: '4:28 PM'
    },
    {
      id: 'm-3',
      sender: 'Aman G.',
      role: 'Travel Buddy',
      avatar: 'A',
      avatarColor: 'bg-amber-500',
      text: 'Meeting the squad right by the Town Hall red building in 10 minutes?',
      time: '4:40 PM'
    }
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: 'You',
        role: 'Traveler',
        avatar: 'Y',
        avatarColor: 'bg-emerald-600',
        text: input.trim(),
        time: 'Just now'
      }
    ]);
    setInput('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToExplore}
          className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tour</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-[#4edea3] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>8 Squad Members Active</span>
        </div>
      </div>

      {/* Squad Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Delhi 6 Street Foodies Squad
              </h2>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xs text-slate-500 dark:text-[#bbcabf] mt-0.5">
              Target: Chandni Chowk • 3 Heritage checkpoints planned today
            </p>
          </div>
        </div>

        <div className="flex -space-x-2">
          {['P', 'R', 'A', 'S', 'Y'].map((letter, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#232b33] border-2 border-white dark:border-[#182029] flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Squad Messages Feed */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/5 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 text-xs font-semibold text-slate-400">
          <span>Live Field Updates</span>
          <span>Chandni Chowk Route Chat</span>
        </div>

        <div className="space-y-4 min-h-[260px] max-h-[380px] overflow-y-auto pr-1">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${m.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5`}>
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {m.sender}
                  </span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium">
                    {m.role}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-auto">
                    {m.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#dbe3ef] mt-1 bg-slate-50 dark:bg-[#141c25] p-3 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-white/5">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="pt-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share stall update, crowd status, or chat with squad..."
            className="flex-1 px-4 py-2.5 rounded-full text-xs sm:text-sm bg-slate-100 dark:bg-[#141c25] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
