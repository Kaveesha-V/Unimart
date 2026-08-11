import React from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
