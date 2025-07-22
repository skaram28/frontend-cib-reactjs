import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from "../redux/rootReducer";
import { apiGet } from "../api/axiosInstance"; // ✅ Axios GET helper

// Portfolio Type
export interface Portfolio {
  id: number | string,
  portfolioNumber: string | null,
  portfolioType: string,
  status: string,
  startDate: string,
  updateddate: string | null,
  enddate: string | null
}


// State Shape
interface PortfolioState {
  data: Portfolio[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: PortfolioState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch from real API
export const fetchPortfolios = createAsyncThunk<Portfolio[]>(
  "portfolio/fetchPortfolios",
  async () => {
    const response = await apiGet("http://localhost:8085/api/portfolio/1"); // 👈 Real API: http://localhost:8083/api/portfolio
    const data = Array.isArray(response.data) ? response.data : [response.data];
    return data;
  }
);

// Slice
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Selectors
export const getPortfolioState = (state: RootState) => state.portfolio;
export const getPortfolioData = createSelector(
  getPortfolioState,
  (portfolio) => portfolio.data
);

// Export reducer
export default portfolioSlice.reducer;

