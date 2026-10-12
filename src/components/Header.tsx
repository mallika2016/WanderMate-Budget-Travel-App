import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Wallet, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Check, 
  Sparkles,
  MapPin,
  Users,
  Target
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalSpent: number;
  budgetCap: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  totalSpent,
  budgetCap,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const remaining = Math.max(0, budgetCap - totalSpent);

  const notifications = [
    { id: 1, text: 'Rohan verified Natraj Dahi Bhalla corner!', time: '10m ago', unread: true },
    { id: 2, text: 'You unlocked +40 WanderPoints in Chandni Chowk', time: '1h ago', unread: false },
    { id: 3, text: 'Pooja invited you to Old Delhi Kulfi & Chaat Squad', time: '3h ago', unread: false },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-300 bg-white/85 border-slate-200/80 text-slate-800 dark:bg-[#070f17]/90 dark:border-white/5 dark:text-[#dbe3ef]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Search */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-emerald-500 animate-spin-slow" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Wander<span className="text-emerald-500 dark:text-[#4edea3]">Mate</span>
            </span>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden xl:flex items-center rounded-full px-4 py-2 gap-2.5 w-72 bg-slate-100/90 dark:bg-[#141c25] border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stalls, dishes, quests..."
              className="bg-transparent border-0 text-sm focus:outline-none w-full text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'explore'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#bbcabf] dark:hover:text-white dark:hover:bg-[#232b33]'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'quests'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#bbcabf] dark:hover:text-white dark:hover:bg-[#232b33]'
            }`}
          >
            Quests &amp; Games
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'community'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#bbcabf] dark:hover:text-white dark:hover:bg-[#232b33]'
            }`}
          >
            Community &amp; Groups
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'budget'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#bbcabf] dark:hover:text-white dark:hover:bg-[#232b33]'
            }`}
          >
            Budget Tracker
          </button>
        </nav>

        {/* Right Tools: Wallet, Dark Mode Toggle, Notifications, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Budget Quick Pill */}
          <button 
            onClick={() => setActiveTab('budget')}
            title="View budget tracker"
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#1e2835] border border-slate-200 dark:border-white/5 px-3 py-1.5 rounded-full transition-all"
          >
            <Wallet className="w-4 h-4 text-emerald-500 dark:text-[#4edea3]" />
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-sm text-emerald-600 dark:text-[#4edea3]">
                ₹{remaining.toFixed(0)}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                / ₹{budgetCap} left
              </span>
            </div>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-[#182029] border border-slate-200 dark:border-white/10 shadow-xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 px-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Notifications
                  </span>
                  <span className="text-[11px] text-emerald-500 font-semibold cursor-pointer">
                    Mark read
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-64 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{n.text}</p>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-emerald-500/20">
            MK
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-[#141c25] dark:hover:bg-[#232b33] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-200"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 bg-white/95 dark:bg-[#0c141c]/95 border-b border-slate-200 dark:border-white/10 space-y-2">
          {/* Mobile search */}
          <div className="flex items-center rounded-full px-4 py-2 gap-2 bg-slate-100 dark:bg-[#141c25] border border-slate-200 dark:border-white/5 mb-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or stalls..."
              className="bg-transparent border-0 text-sm focus:outline-none w-full text-slate-800 dark:text-slate-100"
            />
          </div>
          <button
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-3 ${
              activeTab === 'explore'
                ? 'bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            Explore
          </button>
          <button
            onClick={() => { setActiveTab('quests'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-3 ${
              activeTab === 'quests'
                ? 'bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Target className="w-4 h-4" />
            Quests &amp; Games
          </button>
          <button
            onClick={() => { setActiveTab('community'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-3 ${
              activeTab === 'community'
                ? 'bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            Community &amp; Groups
          </button>
          <button
            onClick={() => { setActiveTab('budget'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-3 ${
              activeTab === 'budget'
                ? 'bg-emerald-500 text-white dark:bg-[#10b981] dark:text-[#00422b]'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Wallet className="w-4 h-4" />
            Budget Tracker (${remaining.toFixed(0)} left)
          </button>
        </div>
      )}
    </header>
  );
};
