import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from '../features/listings/listingsSlice';
import authReducer from '../features/auth/authSlice';
import currencyReducer from '../features/currency/currencySlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    auth: authReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
