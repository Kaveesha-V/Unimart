import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './authTypes';

const mockUser: User = {
  id: 'usr-demo-99',
  name: 'Jordan Taylor',
  email: 'j.taylor@university.edu',
  studentId: 'ST-2024-8842',
  campusLocation: 'North Dorm Towers',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  verifiedStudent: true,
};

const initialState: AuthState = {
  user: localStorage.getItem('unimart_auth_token') ? mockUser : null,
  token: localStorage.getItem('unimart_auth_token') || null,
  isAuthenticated: !!localStorage.getItem('unimart_auth_token'),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('unimart_auth_token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('unimart_auth_token');
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginSuccess, logout, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
