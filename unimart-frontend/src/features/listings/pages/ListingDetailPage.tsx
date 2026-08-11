import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  Paper,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';
import { formatLKR, formatUSD, convertUsdToLkr } from '../../../services/currencyService';

export const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listings = useAppSelector((state: RootState) => state.listings.items);
  const { usdToLkr, source } = useAppSelector((state: RootState) => state.currency);
  const listing = listings.find((item) => item.id === id);

  const [toastOpen, setToastOpen] = React.useState(false);

  if (!listing) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Listing Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The student item you are looking for might have been sold or removed.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Return to Marketplace
        </Button>
      </Container>
    );
  }

  const handlePurchase = () => {
    setToastOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Breadcrumbs & Navigation */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          Back to Listings
        </Button>

        <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
          <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
            {listing.category}
          </Typography>
          <Typography color="secondary.main" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {listing.sku}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Listing Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 5 }}>
        {/* Left Column - Image Gallery */}
        <Paper
          elevation={0}
          className="glow-card"
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: '#121829',
            p: 2,
          }}
        >
          <Box
            component="img"
            src={listing.imageUrl}
            alt={listing.title}
            sx={{
              width: '100%',
              maxHeight: 520,
              objectFit: 'cover',
              borderRadius: 3,
            }}
          />
          {listing.isHotDeal && (
            <Box sx={{ position: 'absolute', top: 28, right: 28 }}>
              <Chip
                icon={<LocalFireDepartmentIcon />}
                label="HOT CAMPUS DEAL"
                color="error"
                sx={{ fontWeight: 800, fontSize: '0.8rem', py: 2 }}
              />
            </Box>
          )}
        </Paper>

        {/* Right Column - Listing Info & Buy Box */}
        <Box className="glass-panel" sx={{ p: 4, borderRadius: 4 }}>
          {/* SKU and Category Pills */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
              {listing.sku}
            </span>
            <Chip label={listing.category} size="small" color="primary" sx={{ fontWeight: 600 }} />
            <Chip label={listing.condition} size="small" variant="outlined" color="secondary" sx={{ fontWeight: 600 }} />
          </Box>

          {/* Title */}
          <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            {listing.title}
          </Typography>

          {/* Price Box */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="h3" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#00E5FF' }}>
                {formatLKR(listing.price, usdToLkr)}
              </Typography>
              {listing.originalPrice && (
                <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                  {formatLKR(listing.originalPrice, usdToLkr)}
                </Typography>
              )}
            </Box>

            {/* Live USD to LKR Converter Widget */}
            <Paper
              elevation={0}
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CurrencyExchangeIcon sx={{ fontSize: 18 }} />
                </div>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}>
                    LIVE CURRENCY CONVERTER
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                    {formatUSD(listing.price)} USD = {formatLKR(listing.price, usdToLkr)}
                  </Typography>
                </Box>
              </Box>

              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Rate: 1 USD = Rs. {usdToLkr.toFixed(2)}
              </span>
            </Paper>
          </Box>

          {/* Description */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
            {listing.description}
          </Typography>

          {/* Bundle Items Checklist if available */}
          {listing.bundleItems && listing.bundleItems.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: 2.5,
                bgcolor: 'rgba(108, 92, 231, 0.08)',
                border: '1px solid rgba(108, 92, 231, 0.25)',
                borderRadius: 3,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#A29BFE', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                📦 Included in Package Bundle:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {listing.bundleItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </Box>
            </Paper>
          )}

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

          {/* Seller Peer Profile Box */}
          <Box sx={{ mb: 4, bgcolor: 'rgba(255, 255, 255, 0.03)', p: 2.5, borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Listed By Verified Peer
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar src={listing.seller.avatar} alt={listing.seller.name} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {listing.seller.name}
                    {listing.seller.verifiedStudent && <VerifiedIcon sx={{ fontSize: 16, color: '#6C5CE7' }} />}
                    {listing.seller.batchYear && (
                      <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.2 rounded">
                        {listing.seller.batchYear}
                      </span>
                    )}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {listing.seller.department || 'Undergraduate'} • ⭐ {listing.seller.rating} / 5.0 Rating
                  </Typography>
                </Box>
              </Box>
              <Button variant="outlined" size="small" color="secondary" startIcon={<ChatIcon />}>
                Chat Peer
              </Button>
            </Box>
          </Box>

          {/* Location & Campus Safe Exchange Zone */}
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <LocationOnIcon sx={{ color: '#00E5FF', fontSize: 20 }} />
              <div>
                <span className="block text-xs text-slate-400">Campus Exchange Point</span>
                <strong className="text-white">{listing.campusLocation}</strong> ({listing.campusZone})
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <ShieldIcon sx={{ color: '#6C5CE7', fontSize: 20 }} />
              <div>
                <span className="block text-xs text-slate-400">Student Identity Auth</span>
                <strong className="text-cyan-400">Verified Campus ID & .edu Email</strong>
              </div>
            </div>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              startIcon={<ShoppingBagIcon />}
              onClick={handlePurchase}
              sx={{ py: 1.5, fontSize: '1.05rem' }}
            >
              Reserve / Order Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Purchase Modal Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%', bgcolor: '#121829', color: '#00E5FF', border: '1px solid #00E5FF' }}>
          🎉 Reserved! The seller ({listing.seller.name}) has been notified for campus meetup at {listing.campusLocation}.
        </Alert>
      </Snackbar>
    </Container>
  );
};
