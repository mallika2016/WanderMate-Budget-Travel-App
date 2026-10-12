import { DishItem, ReviewItem, QuestItem, BudgetItem } from '../types';
import chandniHero from '../assets/images/chandni_chowk_hero_1791630401988.jpg';
import jalebiImg from '../assets/images/golden_kesar_jalebi_1791630429751.jpg';
import paniPuriImg from '../assets/images/crispy_pani_puri_1791630455403.jpg';
import kachoriImg from '../assets/images/spicy_kachori_chaat_1791630485661.jpg';
import dahiBhallaImg from '../assets/images/dahi_bhalla_macro_1791630516407.jpg';
import routeMapImg from '../assets/images/delhi_metro_map_1791630564863.jpg';

export const TOUR_DATA = {
  id: 'chandni-chowk-tour',
  title: 'Chandni Chowk Street Food Tour',
  location: 'Old Delhi, India',
  category: 'Heritage Street Food',
  subtitle: "Delhi's 370-year-old culinary labyrinth with over 200 legendary street stalls.",
  rating: 4.9,
  reviewsCount: 2840,
  openHours: 'Open Today • 10:00 AM - 10:00 PM',
  photosCount: 48,
  recommendedBudgetINR: 350,
  recommendedBudgetUSD: 4.20,
  paymentMode: 'UPI & Cash Preferred',
  paymentSubtext: 'QR codes accepted at 90% stalls; carry ₹50–₹100 notes for quick carts',
  peakHours: '4 PM – 8 PM',
  peakHoursSubtext: 'Maximum freshness, hot desi ghee frying & evening chaat rush',
  priceRange: '₹40 – ₹120',
  heroImage: chandniHero,
  mapImage: routeMapImg,
  heroThumbnails: [
    {
      title: 'Golden Kesar Jalebi',
      priceINR: '₹120',
      priceUSD: '$1.45',
      image: jalebiImg
    },
    {
      title: 'Crispy Teekhi Golgappe',
      priceINR: '₹40',
      priceUSD: '$0.50',
      image: paniPuriImg
    },
    {
      title: 'Khasta Kachori Aloo',
      priceINR: '₹60',
      priceUSD: '$0.75',
      image: kachoriImg
    }
  ],
  mustTry: {
    title: 'Natraj Dahi Bhalla Chaat',
    priceINR: '₹80',
    priceUSD: '$0.95',
    quote: '"Velvety whipped curd over melt-in-the-mouth lentil bhallas, crowned with spiced saunth and fresh pomegranate. Legendary since 1940."',
    image: dahiBhallaImg
  }
};

export const INITIAL_DISHES: DishItem[] = [
  {
    id: 'dish-1',
    number: '01',
    name: 'Natraj Dahi Bhalla Corner',
    stall: 'Stall #19 • Established 1940, secret spice blend & chilled curd',
    rating: 4.9,
    description: 'Ultra-soft urad dal dumplings steeped in thick sweetened curd, spiced cumin, and tangy tamarind saunth.',
    badge: 'Iconic Delhi Heritage Gem',
    badgeColor: 'primary',
    priceINR: 80,
    priceUSD: 0.95,
    image: dahiBhallaImg,
    visited: false
  },
  {
    id: 'dish-2',
    number: '02',
    name: 'Old Famous Jalebi Wala',
    stall: 'Stall #04 • Dariba Kalan corner, thick desi ghee spirals',
    rating: 4.8,
    description: 'Hand-swirled giant jalebis fried in pure desi ghee over charcoal, piping hot with saffron syrup & rabri.',
    badge: 'Fried in Pure Desi Ghee',
    badgeColor: 'secondary',
    priceINR: 120,
    priceUSD: 1.45,
    image: jalebiImg,
    visited: false
  },
  {
    id: 'dish-3',
    number: '03',
    name: 'Jung Bahadur Khasta Kachori',
    stall: 'Stall #42 • Maliwara alley, crisp urad dal kachori with hing aloo',
    rating: 4.7,
    description: 'Double-fried flaky kachoris crushed into rich, spicy hing-infused potato curry with green chillies.',
    badge: 'Local Spicy Street Favorite',
    badgeColor: 'primary',
    priceINR: 60,
    priceUSD: 0.75,
    image: kachoriImg,
    visited: false
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rohan S.',
    squad: 'Delhi Food Walkers',
    avatarColor: 'bg-emerald-500',
    avatarLetter: 'R',
    comment: 'Spent barely ₹280 across 3 heritage spots. The dahi bhalle melt like velvet on your tongue!',
    timeAgo: 'Yesterday'
  },
  {
    id: 'rev-2',
    author: 'Ananya K.',
    squad: 'Solo Explorer',
    avatarColor: 'bg-amber-500',
    avatarLetter: 'A',
    comment: 'Followed this exact route right from Chandni Chowk metro Exit 1. The piping hot jalebi right from the kadhai is unmatched.',
    timeAgo: '2d ago'
  },
  {
    id: 'rev-3',
    author: 'Vikram M.',
    squad: 'Old Delhi Food Guild',
    avatarColor: 'bg-blue-500',
    avatarLetter: 'V',
    comment: 'Pro-tip: Start near Town Hall around 4:30 PM to catch freshly fried batches before evening crowds swell.',
    timeAgo: '4d ago'
  }
];

export const INITIAL_QUESTS: QuestItem[] = [
  {
    id: 'quest-1',
    title: 'Old Delhi Heritage Spice Trail',
    category: 'Active Squad Quest',
    description: 'Scan UPI QR codes at 2 participating heritage stalls to log your bites and claim your points.',
    points: 40,
    progress: 1,
    total: 2,
    completed: false,
    badgeName: 'Shahjahanabad Explorer'
  },
  {
    id: 'quest-2',
    title: 'Desi Ghee Master Tasting',
    category: 'Cultural Milestone',
    description: 'Sample an authentic jalebi or parantha fried in certified heritage desi ghee.',
    points: 30,
    progress: 2,
    total: 2,
    completed: true,
    badgeName: 'Mithai Connoisseur'
  },
  {
    id: 'quest-3',
    title: 'Chaat Samurai Streak',
    category: 'Wallet Discipline',
    description: 'Complete a full street crawl spending under ₹350 without skipping top rated heritage dishes.',
    points: 50,
    progress: 260,
    total: 350,
    completed: false,
    badgeName: 'Bachat Guru'
  }
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  {
    id: 'b-1',
    title: 'Morning Kulhad Chai & Rusk',
    category: 'Breakfast',
    costINR: 30,
    costUSD: 0.35,
    time: '9:30 AM',
    stall: 'Chai Point Fatehpuri'
  },
  {
    id: 'b-2',
    title: 'Natraj Dahi Bhalla Chaat',
    category: 'Street Snack',
    costINR: 80,
    costUSD: 0.95,
    time: '11:45 AM',
    stall: 'Natraj Corner #19'
  },
  {
    id: 'b-3',
    title: 'Jung Bahadur Khasta Kachori',
    category: 'Street Snack',
    costINR: 60,
    costUSD: 0.75,
    time: '1:15 PM',
    stall: 'Stall #42 Maliwara'
  },
  {
    id: 'b-4',
    title: 'Old Famous Desi Ghee Jalebi',
    category: 'Dessert',
    costINR: 120,
    costUSD: 1.45,
    time: '2:30 PM',
    stall: 'Dariba Kalan Corner'
  },
  {
    id: 'b-5',
    title: 'Chilled Sweet Lassi Glass',
    category: 'Drink',
    costINR: 60,
    costUSD: 0.75,
    time: '3:20 PM',
    stall: 'Amritsari Lassi Stall'
  }
];
