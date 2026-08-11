import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Avatar, Tooltip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import type { Listing } from '../listingTypes';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';
import { formatLKR, formatUSD } from '../../../services/currencyService';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();
  const usdToLkr = useAppSelector((state: RootState) => state.currency.usdToLkr);

  const discountPercent = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <div className="glow-card cursor-pointer group" onClick={() => navigate(`/listing/${listing.id}`)}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Image Container with Badges */}
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '65%' }}>
          <CardMedia
            component="img"
            image={listing.imageUrl}
            alt={listing.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              '.glow-card:hover &': {
                transform: 'scale(1.08)',
              },
            }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(18, 24, 41, 0.95) 0%, rgba(18, 24, 41, 0) 50%)',
            }}
          />

          {/* SKU Pill Top Left */}
          <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
            <span className="bg-slate-900/80 backdrop-blur-md text-cyan-400 font-mono text-[11px] px-2.5 py-1 rounded-md border border-cyan-500/30 tracking-wider">
              {listing.sku}
            </span>
          </Box>

          {/* Hot Deal / Live Chip Top Right */}
          <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1 }}>
            {listing.isHotDeal && (
              <div className="flex items-center gap-1.5 bg-rose-500/90 text-white font-semibold text-xs px-2.5 py-1 rounded-md backdrop-blur-md shadow-lg shadow-rose-500/20">
                <LocalFireDepartmentIcon sx={{ fontSize: 16 }} className="animate-bounce" />
                <span>HOT DEAL</span>
              </div>
            )}
          </Box>

          {/* Category & Campus Zone Chips Bottom */}
          <Box sx={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={listing.category}
              size="small"
              sx={{
                bgcolor: 'rgba(108, 92, 231, 0.85)',
                color: '#ffffff',
                backdropFilter: 'blur(8px)',
                fontWeight: 600,
                fontSize: '0.72rem',
              }}
            />

            {listing.campusZone && (
              <span className="bg-slate-900/90 text-cyan-300 backdrop-blur-md font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
                <LocationOnIcon sx={{ fontSize: 11 }} className="text-cyan-400" />
                {listing.campusZone}
              </span>
            )}
          </Box>
        </Box>

        <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.05rem',
                fontWeight: 700,
                lineHeight: 1.3,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: 'text.primary',
                '.glow-card:hover &': {
                  color: 'secondary.main',
                },
                transition: 'color 0.2s ease',
              }}
            >
              {listing.title}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.85rem',
                lineHeight: 1.5,
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {listing.description}
            </Typography>
          </div>

          <div>
            {/* Price section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 800,
                    color: '#00E5FF',
                  }}
                >
                  {formatLKR(listing.price, usdToLkr)}
                </Typography>

                {listing.originalPrice && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                    }}
                  >
                    {formatLKR(listing.originalPrice, usdToLkr)}
                  </Typography>
                )}

                {discountPercent && (
                  <span className="text-[11px] font-bold text-lime-400 bg-lime-400/10 px-1.5 py-0.5 rounded border border-lime-400/20 ml-auto">
                    -{discountPercent}%
                  </span>
                )}
              </Box>

              {/* Secondary USD reference tag */}
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.73rem', opacity: 0.8 }}>
                ≈ {formatUSD(listing.price)} USD
              </Typography>
            </Box>

            {/* Seller & Location Footer */}
            <Box
              sx={{
                pt: 1.5,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={listing.seller.avatar} alt={listing.seller.name} sx={{ width: 26, height: 26 }} />
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {listing.seller.name}
                    {listing.seller.verifiedStudent && (
                      <Tooltip title={`Verified Student • ${listing.seller.department || 'Peer'} (${listing.seller.batchYear || 'Verified'})`}>
                        <VerifiedIcon sx={{ fontSize: 14, color: '#6C5CE7' }} />
                      </Tooltip>
                    )}
                    {listing.seller.batchYear && (
                      <span className="text-[9px] font-mono font-bold text-indigo-300 bg-indigo-500/20 px-1 py-0.2 rounded">
                        {listing.seller.batchYear}
                      </span>
                    )}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.3, fontSize: '0.73rem' }}>
                <LocationOnIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                {listing.campusLocation.split(' ')[0]}
              </Typography>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
