export interface DishItem {
  id: string;
  number: string;
  name: string;
  stall: string;
  rating: number;
  description: string;
  badge: string;
  badgeColor?: 'primary' | 'secondary' | 'tertiary';
  priceINR: number;
  priceUSD: number;
  image: string;
  visited?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  squad: string;
  avatarColor: string;
  avatarLetter: string;
  comment: string;
  timeAgo: string;
}

export interface QuestItem {
  id: string;
  title: string;
  category: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  completed: boolean;
  badgeName: string;
}

export interface BudgetItem {
  id: string;
  title: string;
  category: string;
  costINR: number;
  costUSD: number;
  time: string;
  stall: string;
}

export type ActiveTab = 'explore' | 'quests' | 'community' | 'budget';
