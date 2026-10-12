import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TourHero } from './components/TourHero';
import { BudgetBreakdown } from './components/BudgetBreakdown';
import { StallsLineup } from './components/StallsLineup';
import { LiveTravelers } from './components/LiveTravelers';
import { TripEstimateSidebar } from './components/TripEstimateSidebar';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { QuestsView } from './components/QuestsView';
import { CommunityView } from './components/CommunityView';
import { BudgetTrackerView } from './components/BudgetTrackerView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { 
  TOUR_DATA, 
  INITIAL_DISHES, 
  INITIAL_REVIEWS, 
  INITIAL_QUESTS, 
  INITIAL_BUDGET_ITEMS 
} from './data/tourData';
import { ActiveTab, DishItem, ReviewItem, QuestItem, BudgetItem } from './types';

export default function App() {
  // Theme state - defaults to dark to match the reference design mockup
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('wandermate_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('wandermate_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('wandermate_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive app data states
  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
  const [wanderPoints, setWanderPoints] = useState(195);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Budget calculations in INR (₹)
  const budgetCapINR = 500;
  const totalSpentINR = budgetItems.reduce((acc, curr) => acc + curr.costINR, 0);

  // Toggle visited status for a dish
  const handleToggleVisited = (dishId: string) => {
    setDishes((prev) =>
      prev.map((d) => {
        if (d.id === dishId) {
          const nextVisited = !d.visited;
          if (nextVisited) {
            setWanderPoints((pts) => pts + 25);
          }
          return { ...d, visited: nextVisited };
        }
        return d;
      })
    );
  };

  // Add a dish directly to the budget tracker
  const handleAddDishToBudget = (dish: DishItem) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      title: dish.name,
      category: 'Street Snack',
      costINR: dish.priceINR,
      costUSD: dish.priceUSD,
      time: 'Just now',
      stall: dish.stall.split('•')[0].trim() || 'Chandni Chowk Vendor'
    };
    setBudgetItems((prev) => [newItem, ...prev]);
    setWanderPoints((pts) => pts + 15);
  };

  // Add a new review
  const handleAddReview = (newReview: Omit<ReviewItem, 'id' | 'timeAgo'>) => {
    const item: ReviewItem = {
      ...newReview,
      id: Date.now().toString(),
      timeAgo: 'Just now'
    };
    setReviews((prev) => [item, ...prev]);
    setWanderPoints((pts) => pts + 20);
  };

  // Advance or complete a quest
  const handleCompleteQuestStep = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const nextProg = Math.min(q.total, q.progress + 1);
          const isDone = nextProg >= q.total;
          if (isDone && !q.completed) {
            setWanderPoints((pts) => pts + q.points);
          }
          return {
            ...q,
            progress: nextProg,
            completed: isDone
          };
        }
        return q;
      })
    );
  };

  // Budget item management
  const handleAddBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    setBudgetItems((prev) => [
      { ...item, id: Date.now().toString() },
      ...prev
    ]);
  };

  const handleDeleteBudgetItem = (id: string) => {
    setBudgetItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter dishes by search query if present
  const filteredDishes = dishes.filter((dish) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      dish.name.toLowerCase().includes(q) ||
      dish.stall.toLowerCase().includes(q) ||
      dish.description.toLowerCase().includes(q) ||
      dish.badge.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0c141c] dark:text-[#dbe3ef]">
      {/* Universal Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalSpent={totalSpentINR}
        budgetCap={budgetCapINR}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {activeTab === 'explore' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Hero Gallery Banner */}
            <TourHero 
              onOpenPhotos={() => setIsPhotoModalOpen(true)}
              onSelectThumbnail={(title) => {
                setSearchQuery(title);
              }}
            />

            {/* Split Content Grid: Left 8 cols, Right 4 cols */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (8 cols): Budget breakdown, Curated Lineup, Live Activity */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <BudgetBreakdown />

                <StallsLineup
                  dishes={filteredDishes}
                  onToggleVisited={handleToggleVisited}
                  onAddDishToBudget={handleAddDishToBudget}
                />

                <LiveTravelers
                  reviews={reviews}
                  onAddReview={handleAddReview}
                />
              </div>

              {/* Right Column (4 cols): Sticky Trip Estimate, Directions, Active Quest */}
              <div className="lg:col-span-4">
                <TripEstimateSidebar
                  onViewQuest={() => setActiveTab('quests')}
                  onAddedToPlan={() => {
                    setWanderPoints((pts) => pts + 20);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quests' && (
          <QuestsView
            quests={quests}
            onCompleteStep={handleCompleteQuestStep}
            onBackToExplore={() => setActiveTab('explore')}
            wanderPoints={wanderPoints}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetTrackerView
            budgetItems={budgetItems}
            totalSpentINR={totalSpentINR}
            budgetCapINR={budgetCapINR}
            onAddItem={handleAddBudgetItem}
            onDeleteItem={handleDeleteBudgetItem}
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Navigation Dock */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        remainingBudget={Math.max(0, budgetCapINR - totalSpentINR)}
      />
    </div>
  );
}
