import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { loadLiveExchangeRate } from '../../features/currency/currencySlice';
import type { RootState } from '../../app/store';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { usdToLkr, source, loading } = useAppSelector((state: RootState) => state.currency);

  useEffect(() => {
    dispatch(loadLiveExchangeRate());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const navLinks = [
    { label: 'Explore Marketplace', path: '/' },
    { label: 'Post a Listing', path: '/create-listing' },
  ];

  return (
    <AppBar position="sticky" elevation={0} className="glass-nav" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <StorefrontIcon className="text-cyan-400" sx={{ fontSize: 22 }} />
              </div>
            </div>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              Uni<span className="gradient-text-electric">Mart</span>
            </Typography>
            <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 uppercase tracking-widest hidden sm:inline-block">
              CAMPUS v1.0
            </span>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                sx={{
                  color: location.pathname === link.path ? 'secondary.main' : 'text.primary',
                  fontWeight: location.pathname === link.path ? 700 : 500,
                  fontSize: '0.92rem',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Right Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Live Exchange Rate Badge */}
            <Tooltip title={`Live USD to LKR Rate (${source}). Click to refresh!`}>
              <button
                onClick={() => dispatch(loadLiveExchangeRate())}
                className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 px-3 py-1.5 rounded-full text-xs font-mono font-semibold shadow-inner transition-all cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <CurrencyExchangeIcon sx={{ fontSize: 15 }} className="text-emerald-400" />
                <span>1 USD = Rs. {usdToLkr.toFixed(2)} LKR</span>
              </button>
            </Tooltip>

            <IconButton size="medium" sx={{ color: 'text.secondary', bgcolor: 'rgba(255, 255, 255, 0.04)' }}>
              <Badge badgeContent={2} color="secondary">
                <FavoriteBorderIcon fontSize="small" />
              </Badge>
            </IconButton>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={() => navigate('/create-listing')}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Sell Item
            </Button>

            {isAuthenticated && user ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0.5, border: '2px solid #6C5CE7' }}>
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 36, height: 36 }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5,
                        bgcolor: '#121829',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        borderRadius: 3,
                        minWidth: 200,
                      },
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <MenuItem onClick={handleLogout} sx={{ gap: 1.5, color: 'error.main', mt: 0.5 }}>
                    <LogoutIcon fontSize="small" />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<PersonIcon />}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: { width: 280, bgcolor: '#0B0F1A', color: 'text.primary', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' },
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Uni<span className="gradient-text-electric">Mart</span> Navigation
          </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileOpen(false);
                }}
                sx={{ borderRadius: 2, mb: 1, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
