import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { apiGet } from '../api/axiosInstance';
import type { RootState } from '../redux/rootReducer';

// Fund interface (reuse your existing Fund interface)
export interface Fund {
  id: number;
  name: string;
  sector: string;
  risk: string;
  return: string;
  performance: string;
}

interface SingleFundState {
  data: Fund | null;
  loading: boolean;
  error: string | null;
}

const initialState: SingleFundState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch single fund by ID
export const fetchFundById = createAsyncThunk<Fund, number>(
  'singleFund/fetchFundById',
  async (fundId, { rejectWithValue }) => {
    try {
      const response = await apiGet(`/singlefunds/${fundId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch fund');
    }
  }
);

const singleFundSlice = createSlice({
  name: 'singleFund',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFundById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFundById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFundById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch fund';
      });
  },
});

// Selectors
export const getSingleFundState = (state: RootState) => state.fetchFundById;
export const getSingleFundData = createSelector(getSingleFundState, (state) => state.data);
export const getSingleFundLoading = createSelector(getSingleFundState, (state) => state.loading);
export const getSingleFundError = createSelector(getSingleFundState, (state) => state.error);

export default singleFundSlice.reducer;
