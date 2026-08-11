export type CampusZone =
  | 'All'
  | 'Main Library'
  | 'Student Union'
  | 'Science Quad'
  | 'Engineering Canteen'
  | 'West Dorms'
  | 'Innovation Lab';

export interface Listing {
  id: string;
  sku: string;
  title: string;
  description: string;
  price: number; // base USD value, converted to LKR dynamically
  originalPrice?: number;
  category: 'Textbooks' | 'Electronics' | 'Dorm Goods' | 'Stationery' | 'Services';
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  imageUrl: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    verifiedStudent: boolean;
    rating: number;
    department?: string;
    batchYear?: string;
  };
  campusLocation: string;
  campusZone: CampusZone;
  isHotDeal?: boolean;
  bundleItems?: string[];
  stock: number;
  createdAt: string;
}

export type CategoryFilter = 'All' | 'Textbooks' | 'Electronics' | 'Dorm Goods' | 'Stationery' | 'Services';

export interface ListingFilterState {
  searchQuery: string;
  selectedCategory: CategoryFilter;
  selectedCampusZone: CampusZone;
  minPrice: number;
  maxPrice: number;
  condition: string;
  verifiedOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest';
}
