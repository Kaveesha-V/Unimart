import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: '#070A12',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '4fr 2fr 2fr 4fr' }, gap: 4 }}>
          {/* Column 1 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <StorefrontIcon className="text-cyan-400" sx={{ fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800 }}>
                Uni<span className="gradient-text-electric">Mart</span>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, mb: 2.5, lineHeight: 1.6 }}>
              The next-generation campus marketplace built exclusively for verified university students to buy, sell, and trade textbooks, electronics, and dorm essentials.
            </Typography>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <SecurityIcon sx={{ fontSize: 16 }} />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <VerifiedUserIcon sx={{ fontSize: 16 }} />
                <span>Verified .edu Auth</span>
              </div>
            </div>
          </Box>

          {/* Column 2 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
              Marketplace
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Textbooks
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Electronics
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Dorm Essentials
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Stationery
              </Link>
            </Box>
          </Box>

          {/* Column 3 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
              Safety & Rules
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Campus Meetup Zones
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Verification Guide
              </Link>
              <Link href="#" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                Scam Prevention
              </Link>
            </Box>
          </Box>

          {/* Column 4 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
              Student Command Center
            </Typography>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <p className="font-mono text-cyan-400 mb-1">&gt; System Status: ALL SYSTEMS OPERATIONAL</p>
              <p className="text-slate-400">Campus Sync: Active • 24/7 Verified Student Peer Network</p>
            </div>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} UniMart Student Marketplace. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary" className="font-mono">
            Build 2026.08.04 • INTE 22283 Project
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
