import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Drawer,
  Slider,
  FormControlLabel,
  Switch,
  IconButton,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShieldCheckIcon from '@mui/icons-material/VerifiedUser';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedCampusZone,
  setMinPrice,
  setMaxPrice,
  setCondition,
  setVerifiedOnly,
  setSortBy,
  resetFilters,
} from '../listingsSlice';
import type { CategoryFilter, CampusZone } from '../listingTypes';
import { ListingGrid } from '../components/ListingGrid';
import type { RootState } from '../../../app/store';
import { formatLKR, convertUsdToLkr } from '../../../services/currencyService';

const categories: CategoryFilter[] = [
  'All',
  'Textbooks',
  'Electronics',
  'Dorm Goods',
  'Stationery',
  'Services',
];

const campusZones: CampusZone[] = [
  'All',
  'Main Library',
  'Student Union',
  'Science Quad',
  'Engineering Canteen',
  'West Dorms',
  'Innovation Lab',
];

export const ListingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, filters, loading } = useAppSelector((state: RootState) => state.listings);
  const { usdToLkr } = useAppSelector((state: RootState) => state.currency);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filtered & Sorted items computation
  const filteredListings = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          filters.selectedCategory === 'All' || item.category === filters.selectedCategory;
        const matchesZone =
          filters.selectedCampusZone === 'All' || item.campusZone === filters.selectedCampusZone;
        const matchesSearch =
          filters.searchQuery === '' ||
          item.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesPrice = item.price >= filters.minPrice && item.price <= filters.maxPrice;
        const matchesCondition =
          filters.condition === 'All' || item.condition === filters.condition;
        const matchesVerified = !filters.verifiedOnly || item.seller.verifiedStudent;

        return (
          matchesCategory &&
          matchesZone &&
          matchesSearch &&
          matchesPrice &&
          matchesCondition &&
          matchesVerified
        );
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'newest')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // default featured
        return (b.isHotDeal ? 1 : 0) - (a.isHotDeal ? 1 : 0);
      });
  }, [items, filters]);

  const activeFiltersCount =
    (filters.selectedCategory !== 'All' ? 1 : 0) +
    (filters.selectedCampusZone !== 'All' ? 1 : 0) +
    (filters.condition !== 'All' ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 1500 ? 1 : 0);

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
          background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(108, 92, 231, 0.25), rgba(11, 15, 26, 0))',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto', mb: 5 }}>
            {/* Live Campus Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-live" />
              <span>LIVE CAMPUS MARKETPLACE • LKR MAIN CURRENCY ACTIVE</span>
            </div>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3.2rem', md: '4rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2.5,
              }}
            >
              Buy, Sell & Trade on Campus with{' '}
              <span className="gradient-text-electric">Zero Hassle</span>
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 640, mx: 'auto' }}>
              The student-first trading command center. Find exam bundles, cheap textbooks, M2 MacBooks, dorm fridges, and campus peer services directly from classmates.
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 720, mx: 'auto', mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search course bundles, M2 MacBooks, mini fridges, repair services, SKU..."
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
                    </InputAdornment>
                  ),
                  endAdornment: filters.searchQuery && (
                    <InputAdornment position="end">
                      <button
                        onClick={() => dispatch(setSearchQuery(''))}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <ClearIcon fontSize="small" />
                      </button>
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(18, 24, 41, 0.9)',
                    backdropFilter: 'blur(16px)',
                    py: 0.5,
                    px: 1,
                    fontSize: '1.05rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  },
                },
              }}
            />
          </Box>

          {/* Value Props Row */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
              <BoltIcon sx={{ fontSize: 18, color: '#00E5FF' }} />
              <span>Same-Day Campus Meetups</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
              <ShieldCheckIcon sx={{ fontSize: 18, color: '#6C5CE7' }} />
              <span>Verified .edu Peer Auth</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
              <LocalOfferIcon sx={{ fontSize: 18, color: '#FF5C7A' }} />
              <span>Up to 60% Off Retail Prices</span>
            </div>
          </Box>
        </Container>
      </Box>

      {/* Campus Safe Exchange Zone Chips Bar */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: '#00E5FF', fontSize: 18 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.78rem' }}>
            Campus Safe Exchange Zones
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, scrollbarWidth: 'none' }}>
          {campusZones.map((zone) => {
            const isSelected = filters.selectedCampusZone === zone;
            return (
              <Chip
                key={zone}
                label={zone === 'All' ? '📍 All Campus Zones' : zone}
                onClick={() => dispatch(setSelectedCampusZone(zone))}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  bgcolor: isSelected ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#00E5FF' : 'text.secondary',
                  border: isSelected ? '1px solid #00E5FF' : '1px solid rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    bgcolor: isSelected ? 'rgba(0, 229, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              />
            );
          })}
        </Box>
      </Container>

      {/* Category Chips & Filter Controls Section */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 4,
            pb: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Category Pills */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isSelected = filters.selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => dispatch(setSelectedCategory(cat))}
                  sx={{
                    px: 1,
                    py: 2.2,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    bgcolor: isSelected ? 'primary.main' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#FFFFFF' : 'text.secondary',
                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    '&:hover': {
                      bgcolor: isSelected ? 'primary.dark' : 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              );
            })}
          </Box>

          {/* Filter Drawer Toggle & Sort Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FilterListIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{ borderRadius: 2, py: 0.9 }}
            >
              Filter Drawer
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-rose-500 text-white font-bold text-xs px-1.5 py-0.2 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" className="font-mono" sx={{ fontSize: '0.85rem' }}>
              SHOWING <span className="text-cyan-400 font-bold">{filteredListings.length}</span> ITEMS
            </Typography>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="sort-select-label" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                Sort By
              </InputLabel>
              <Select
                labelId="sort-select-label"
                value={filters.sortBy}
                label="Sort By"
                onChange={(e) => dispatch(setSortBy(e.target.value as any))}
                sx={{
                  bgcolor: '#121829',
                  borderRadius: 2,
                  fontSize: '0.85rem',
                }}
              >
                <MenuItem value="featured">Featured / Hot Deals</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="newest">Newest Listed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Listings Grid */}
        <ListingGrid listings={filteredListings} loading={loading} />
      </Container>

      {/* Side Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '100%', sm: 380 },
              bgcolor: '#0B0F1A',
              color: '#FFFFFF',
              p: 3,
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon sx={{ color: '#00E5FF' }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Refine Marketplace
            </Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* LKR Price Range Slider */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CurrencyExchangeIcon sx={{ fontSize: 16, color: '#00E5FF' }} />
            LKR Price Filter Range
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Max Price: <strong className="text-cyan-400">{formatLKR(filters.maxPrice, usdToLkr)}</strong>
          </Typography>

          <Slider
            value={filters.maxPrice}
            min={10}
            max={1500}
            step={20}
            onChange={(_, val) => dispatch(setMaxPrice(val as number))}
            sx={{
              color: '#00E5FF',
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                bgcolor: '#00E5FF',
              },
            }}
          />
        </Box>

        {/* Verified Student Only Toggle */}
        <Box sx={{ mb: 4, p: 2, bgcolor: 'rgba(108, 92, 231, 0.1)', borderRadius: 3, border: '1px solid rgba(108, 92, 231, 0.3)' }}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.verifiedOnly}
                onChange={(e) => dispatch(setVerifiedOnly(e.target.checked))}
                color="secondary"
              />
            }
            label={
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Verified Students Only
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Show items from authenticated .edu peers
                </Typography>
              </Box>
            }
          />
        </Box>

        {/* Condition Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Item Condition
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['All', 'Brand New', 'Like New', 'Good', 'Fair'].map((cond) => {
              const isSelected = filters.condition === cond;
              return (
                <Chip
                  key={cond}
                  label={cond}
                  onClick={() => dispatch(setCondition(cond))}
                  sx={{
                    fontWeight: 600,
                    bgcolor: isSelected ? 'secondary.main' : 'rgba(255, 255, 255, 0.04)',
                    color: '#ffffff',
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => dispatch(resetFilters())}
            sx={{ py: 1.2, color: 'text.secondary' }}
          >
            Reset Filters
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            sx={{ py: 1.2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};
