import React from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import type { Listing } from '../listingTypes';
import { ListingCard } from './ListingCard';
import { useAppDispatch } from '../../../app/hooks';
import { resetFilters } from '../listingsSlice';

interface ListingGridProps {
  listings: Listing[];
  loading?: boolean;
}

export const ListingGrid: React.FC<ListingGridProps> = ({ listings, loading = false }) => {
  const dispatch = useAppDispatch();

  if (loading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <Skeleton
            key={idx}
            variant="rectangular"
            height={380}
            sx={{ borderRadius: 4, bgcolor: 'rgba(255, 255, 255, 0.05)' }}
          />
        ))}
      </Box>
    );
  }

  if (listings.length === 0) {
    return (
      <Box
        className="glass-panel"
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 4,
          my: 4,
        }}
      >
        <StorefrontIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.8 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          No Matching Campus Listings Found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 460, mx: 'auto', mb: 3 }}>
          We couldn't find any student items matching your active search keywords or category filters.
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(resetFilters())}
        >
          Reset All Filters
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </Box>
  );
};
