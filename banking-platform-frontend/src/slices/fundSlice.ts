import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../api/axiosInstance'; // ✅ You’ll need POST too
import type { RootState } from '../redux/rootReducer';

// --- Fund Interface ---
export interface Fund {
  id: number;
  name: string;
  sector: string;
  risk: string;
  return: string;
  performance: string;
}

// --- Slice State Type ---
interface FundState {
  data: Fund[];
  loading: boolean;
  error: string | null;
  investStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  investError: string | null;
}

// --- Initial State ---
const initialState: FundState = {
  data: [],
  loading: false,
  error: null,
  investStatus: 'idle',
  investError: null,
};

// --- Fetch Funds Thunk ---
export const fetchFunds = createAsyncThunk<Fund[]>(
  'fund/fetchFunds',
  async () => {
    // const response = await apiGet('/funds');
     const response = await apiGet('http://localhost:8084/api/funds');
    return response.data;
  }
);

// --- Invest Thunk ---
interface InvestPayload {
  fundId: number;
  amount: number;
  userId: number;
}

export const investInFund = createAsyncThunk<
  any, // or a proper success response type if known
  InvestPayload,
  { rejectValue: string }
>(
  'fund/investInFund',
  async ({ fundId, amount, userId }, { rejectWithValue }) => {
    try {
      // const response = await apiPost(`/invest`, {
        const response = await apiPost(`http://localhost:8084/api/funds/${fundId}/invest`, {
        amount,
        userId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Investment failed');
    }
  }
);

// --- Slice ---
const fundSlice = createSlice({
  name: 'fund',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Funds
      .addCase(fetchFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFunds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch funds';
      })

      // Invest in Fund
      .addCase(investInFund.pending, (state) => {
        state.investStatus = 'loading';
        state.investError = null;
      })
      .addCase(investInFund.fulfilled, (state) => {
        state.investStatus = 'succeeded';
      })
      .addCase(investInFund.rejected, (state, action) => {
        state.investStatus = 'failed';
        state.investError = action.payload || 'Investment failed';
      });
  },
});

// --- Selectors ---
export const getFundState = (state: RootState) => state.fund;
export const getFundsData = createSelector(getFundState, (fund) => fund.data);
export const getFundsLoading = createSelector(getFundState, (fund) => fund.loading);
export const getFundsError = createSelector(getFundState, (fund) => fund.error);
export const getInvestStatus = createSelector(getFundState, (fund) => fund.investStatus);
export const getInvestError = createSelector(getFundState, (fund) => fund.investError);

// --- Export reducer ---
export default fundSlice.reducer;
