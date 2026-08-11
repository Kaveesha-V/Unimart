import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Listing, CategoryFilter, CampusZone, ListingFilterState } from './listingTypes';

interface ListingsState {
  items: Listing[];
  filters: ListingFilterState;
  selectedListing: Listing | null;
  loading: boolean;
  error: string | null;
}

const initialMockListings: Listing[] = [
  {
    id: 'lst-101',
    sku: 'UM-BOOK-0941',
    title: 'Software Architecture & PM Principles (4th Ed.) + Past Exam Bundle',
    description: 'Minimal highlighting, excellent condition. Includes printed UML reference sheets & 5 years of past exam solutions. Essential for CS/SE 2nd year.',
    price: 45.0,
    originalPrice: 85.0,
    category: 'Textbooks',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    seller: {
      id: 'usr-01',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      department: 'Software Engineering',
      batchYear: "'25",
    },
    campusLocation: 'Main Library 2nd Floor',
    campusZone: 'Main Library',
    isHotDeal: true,
    bundleItems: ['4th Edition Hardcover Book', 'UML Cheat Sheet', '2021-2025 Past Exam Solutions'],
    stock: 2,
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: 'lst-102',
    sku: 'UM-ELEC-4421',
    title: 'Apple MacBook Air M2 16GB / 512GB Space Gray',
    description: 'Includes original charger, USB-C hub, and hardshell sleeve. Battery health 96%. Tested for IntelliJ, VS Code, and Figma design workflows.',
    price: 890.0,
    originalPrice: 1199.0,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    seller: {
      id: 'usr-02',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verifiedStudent: true,
      rating: 5.0,
      department: 'Computer Science',
      batchYear: "'24",
    },
    campusLocation: 'Engineering Canteen Lobby',
    campusZone: 'Engineering Canteen',
    isHotDeal: true,
    bundleItems: ['M2 MacBook Air', 'Magsafe Charger', 'Multi-port USB-C Hub', 'Hardshell Sleeve'],
    stock: 1,
    createdAt: '2026-08-02T14:30:00Z',
  },
  {
    id: 'lst-103',
    sku: 'UM-DORM-0092',
    title: 'Smart Touch Desk Lamp with 15W Wireless Qi Phone Charging',
    description: 'Multi-angle dimmable LED study lamp with warm/daylight modes and built-in 15W fast wireless charger. Perfect for night study in dorms.',
    price: 24.5,
    originalPrice: 42.0,
    category: 'Dorm Goods',
    condition: 'Brand New',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    seller: {
      id: 'usr-03',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verifiedStudent: true,
      rating: 4.8,
      department: 'Electrical Engineering',
      batchYear: "'26",
    },
    campusLocation: 'Student Union Hub',
    campusZone: 'Student Union',
    isHotDeal: false,
    stock: 5,
    createdAt: '2026-08-03T09:15:00Z',
  },
  {
    id: 'lst-104',
    sku: 'UM-STAT-8831',
    title: 'TI-84 Plus CE Graphing Calculator (Rose Gold) + Math Formulas Book',
    description: 'Rechargeable color display graphing calculator. Preloaded with statistics & calculus apps. Includes USB charging cable and formula booklet.',
    price: 78.0,
    originalPrice: 135.0,
    category: 'Stationery',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    seller: {
      id: 'usr-04',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      department: 'Mathematics & Stats',
      batchYear: "'25",
    },
    campusLocation: 'Science Quad Courtyard',
    campusZone: 'Science Quad',
    isHotDeal: true,
    bundleItems: ['TI-84 Plus CE', 'USB Cable', 'Formula Guide'],
    stock: 1,
    createdAt: '2026-08-03T16:20:00Z',
  },
  {
    id: 'lst-105',
    sku: 'UM-SERV-0110',
    title: 'On-Campus Laptop & Phone Repair / SSD Upgrade Service',
    description: 'Broken screen replacement, thermal paste repasting, RAM/SSD upgrades, and OS clean installs. Same-day turnaround at Innovation Lab!',
    price: 35.0,
    category: 'Services',
    condition: 'Brand New',
    imageUrl: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80',
    seller: {
      id: 'usr-05',
      name: 'Devin Vance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      verifiedStudent: true,
      rating: 5.0,
      department: 'Hardware Robotics Lab',
      batchYear: "'24",
    },
    campusLocation: 'Innovation Lab Room 204',
    campusZone: 'Innovation Lab',
    isHotDeal: false,
    stock: 99,
    createdAt: '2026-08-04T08:00:00Z',
  },
  {
    id: 'lst-106',
    sku: 'UM-DORM-7712',
    title: 'Mini Fridge & Espresso Coffee Maker Set for Boarding Room',
    description: 'Compact 45L low-noise mini refrigerator + 15-bar espresso coffee machine. Includes 2 mugs. Clean condition, perfect for hostel or boarding room.',
    price: 110.0,
    originalPrice: 190.0,
    category: 'Dorm Goods',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    seller: {
      id: 'usr-01',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verifiedStudent: true,
      rating: 4.9,
      department: 'Software Engineering',
      batchYear: "'25",
    },
    campusLocation: 'West Dorm Towers Gate',
    campusZone: 'West Dorms',
    isHotDeal: true,
    bundleItems: ['45L Compact Fridge', '15-Bar Espresso Maker', '2 Ceramic Mugs'],
    stock: 1,
    createdAt: '2026-08-04T08:45:00Z',
  },
];

const initialState: ListingsState = {
  items: initialMockListings,
  filters: {
    searchQuery: '',
    selectedCategory: 'All',
    selectedCampusZone: 'All',
    minPrice: 0,
    maxPrice: 1500,
    condition: 'All',
    verifiedOnly: false,
    sortBy: 'featured',
  },
  selectedListing: null,
  loading: false,
  error: null,
};

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<CategoryFilter>) => {
      state.filters.selectedCategory = action.payload;
    },
    setSelectedCampusZone: (state, action: PayloadAction<CampusZone>) => {
      state.filters.selectedCampusZone = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.filters.maxPrice = action.payload;
    },
    setCondition: (state, action: PayloadAction<string>) => {
      state.filters.condition = action.payload;
    },
    setVerifiedOnly: (state, action: PayloadAction<boolean>) => {
      state.filters.verifiedOnly = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ListingFilterState['sortBy']>) => {
      state.filters.sortBy = action.payload;
    },
    setSelectedListing: (state, action: PayloadAction<Listing | null>) => {
      state.selectedListing = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedCampusZone,
  setMinPrice,
  setMaxPrice,
  setCondition,
  setVerifiedOnly,
  setSortBy,
  setSelectedListing,
  resetFilters,
} = listingsSlice.actions;

export default listingsSlice.reducer;
