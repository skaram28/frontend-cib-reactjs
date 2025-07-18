// src/slices/adminSlice.ts
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../redux/rootReducer';
import { apiGet } from '../api/axiosInstance'; // ✅ Axios GET helper

// Admin Type
export interface Admin {
  id: string;
  Name: string;
  Email: string;
  ContactNo: string;
  Address: string;
  Actions: any | null;
}

// State Shape
interface AdminState {
  data: Admin[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: AdminState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch admins
export const fetchAdmins = createAsyncThunk<Admin[]>(
  'admin/fetchAdmins',
  async () => {
    const response = await apiGet('/admin/users'); // ⬅️ http://localhost:8083/api/admin
    return response.data;
  }
);

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Selectors
export const getAdminState = (state: RootState) => state.admin;
export const getAdminData = createSelector(
  getAdminState,
  (admin) => admin.data
);

// Export reducer
export default adminSlice.reducer;
