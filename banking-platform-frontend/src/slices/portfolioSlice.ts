import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import mockData from '../data/portfolioData.json'; 
import type { RootState } from '../redux/rootReducer';

// Define the Portfolio type
export interface Portfolio {
  id: number | string;
  portfolioNumber: string;
  portfolioType: string;
  status: string;
  startDate: string;
  updateddate: string | null;
  enddate: string | null;
}

//  Define the state shape
interface PortfolioState {
  data: Portfolio[];
  loading: boolean;
  error: string | null;
}

//  Initial state
const initialState: PortfolioState = {
  data: [],
  loading: false,
  error: null,
};

//  Async thunk to simulate fetching from mock JSON
export const fetchPortfolios = createAsyncThunk<Portfolio[]>(
  'portfolio/fetchPortfolios',
  async () => {
    return new Promise<Portfolio[]>((resolve) => {
      setTimeout(() => {
        // Make sure mockData.portfolio is correct in your JSON
        resolve(mockData.portfolio as Portfolio[]);
      }, 500);
    });

    // 🔗 You can replace the above with a real API call:
    // const response = await axios.get('/api/portfolios');
    // return response.data;
  }
);

//  Create the slice
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // You can add reducers like addPortfolio here later
  },
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
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

//  Selectors
export const getPortfolioState = (state: RootState) => state.portfolio;
export const getPortfolioData = createSelector(
  getPortfolioState,
  (portfolio) => portfolio.data
);

//  Export reducer
export default portfolioSlice.reducer;

// Optional: export actions if needed in the future
// export const { addPortfolio, removePortfolio, updatePortfolio } = portfolioSlice.actions;
