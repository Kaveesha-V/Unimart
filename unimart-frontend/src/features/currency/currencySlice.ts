import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchLiveUsdToLkrRate } from '../../services/currencyService';

interface CurrencyState {
  usdToLkr: number;
  lastUpdated: string | null;
  source: string;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  usdToLkr: 300.0,
  lastUpdated: null,
  source: 'Default Fallback',
  loading: false,
  error: null,
};

export const loadLiveExchangeRate = createAsyncThunk(
  'currency/loadLiveExchangeRate',
  async () => {
    const result = await fetchLiveUsdToLkrRate();
    return result;
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setManualExchangeRate: (state, action: PayloadAction<number>) => {
      state.usdToLkr = action.payload;
      state.source = 'Manual Override';
      state.lastUpdated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLiveExchangeRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLiveExchangeRate.fulfilled, (state, action) => {
        state.loading = false;
        state.usdToLkr = action.payload.rate;
        state.lastUpdated = action.payload.lastUpdated;
        state.source = action.payload.source;
      })
      .addCase(loadLiveExchangeRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch live rate';
      });
  },
});

export const { setManualExchangeRate } = currencySlice.actions;
export default currencySlice.reducer;
