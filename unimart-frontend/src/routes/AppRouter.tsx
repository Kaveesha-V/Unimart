import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { Box, CircularProgress } from '@mui/material';

// Lazy loaded routes
const ListingsPage = lazy(() =>
  import('../features/listings/pages/ListingsPage').then((m) => ({ default: m.ListingsPage }))
);
const ListingDetailPage = lazy(() =>
  import('../features/listings/pages/ListingDetailPage').then((m) => ({ default: m.ListingDetailPage }))
);
const LoginPage = lazy(() =>
  import('../features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress color="secondary" />
  </Box>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ListingsPage />
          </Suspense>
        ),
      },
      {
        path: 'listing/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ListingDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'create-listing',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ListingsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ListingsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
