/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { apiPost } from '../api/axiosInstance';
import type { RootState } from '../redux/rootReducer';

// --- KYC Payload Type ---
export interface KycPayload {
  user: { id: number };
  identityType: string;
  identityNumber: string;
  documentUrl: string;
  documentType: string;
  status?: string;
  submissionDate?: string;
  verifiedDate?: string;
  verifiedBy?: string;
  remarks?: string;
  startDate?: string;
  endDate?: string;
  updatedDate?: string;
}

// --- KYC Response Type ---
export interface KycResponse {
  status: string;
  referenceId: string;
  message: string;
}

// --- Slice State Type ---
interface KycState {
  kycDetails: KycResponse | null;
  loading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: KycState = {
  kycDetails: null,
  loading: false,
  error: null,
};

// --- Submit KYC Thunk ---
export const submitKyc = createAsyncThunk<
  KycResponse,          // ✅ Returned data
  KycPayload,           // ✅ Thunk argument (payload)
  { rejectValue: string } // ✅ Rejection type
>(
  'kyc/submitKyc',
  async (kycPayload, { rejectWithValue }) => {
    console.log("kycPayload",kycPayload);
    try {
      const response = await apiPost('http://localhost:8082/api/compliance/kyc', kycPayload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'KYC submission failed');
    }
  }
);

// --- Slice ---
const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitKyc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitKyc.fulfilled, (state, action) => {
        state.loading = false;
        state.kycDetails = action.payload;
      })
      .addCase(submitKyc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'KYC submission failed';
      });
  },
});

// --- Selectors ---
export const getKycState = (state: RootState) => state.kyc;
export const getKycDetails = createSelector(getKycState, (kyc) => kyc.kycDetails);
export const getKycLoading = createSelector(getKycState, (kyc) => kyc.loading);
export const getKycError = createSelector(getKycState, (kyc) => kyc.error);

export default kycSlice.reducer;
