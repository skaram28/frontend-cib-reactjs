// src/slices/transactionSlice.ts
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { apiGet } from "../api/axiosInstance";
import type { RootState } from "../redux/rootReducer";

// Transaction Type
export interface Transaction {
  fundsId: string;
  transactionDate: string;
  status: string;
  amount: string; // e.g. "$2.09"
}

// State Shape
interface TransactionState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: TransactionState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch transactions from API
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transaction/fetchTransactions",
  async () => {
   // const response = await apiGet("http://localhost:8085/api/transactions/1");
   const response = await apiGet('http://localhost:8085/api/transactions/2');
    console.log("API response for transactions:", response.data);
    return Array.isArray(response.data) ? response.data : [response.data];
  }
);


// Slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Selectors
export const getTransactionState = (state: RootState) => state.transaction;
export const getTransactionData = createSelector(
  getTransactionState,
  (transaction) => transaction.data
);

// Export reducer
export default transactionSlice.reducer;
