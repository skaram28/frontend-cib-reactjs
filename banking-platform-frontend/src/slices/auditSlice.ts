/* eslint-disable @typescript-eslint/no-explicit-any */
// features/audit/auditSlice.ts

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { apiGet } from '../api/axiosInstance'; // assumed custom axios wrapper
import type { RootState } from '../redux/rootReducer';

// --- Audit Interface ---
export interface Audit {
  length: any;
  id: number;
  timestamp: string;
  message: string;
  action: string;
  status: string;
  ipAddress: string;
  startDate: string;
  updatedDate: string;
  endDate: string;
}

// --- Slice State Type ---
interface AuditState {
  data: Audit[]| null;
  loading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: AuditState = {
  data: null,
  loading: false,
  error: null,
};

// --- Fetch Audit by ID Thunk ---
export const fetchAuditById = createAsyncThunk<Audit[], number>(
  'audit/fetchAuditById',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await apiGet(`http://localhost:8082/api/compliance/audit/1`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch audit data');
    }
  }
);

// --- Slice ---
const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAuditById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// --- Selectors ---
export const getAuditState = (state: RootState) => state.audit;
export const getAuditData = createSelector(getAuditState, (audit) => audit.data);
export const getAuditLoading = createSelector(getAuditState, (audit) => audit.loading);
export const getAuditError = createSelector(getAuditState, (audit) => audit.error);

// --- Export reducer ---
export default auditSlice.reducer;
