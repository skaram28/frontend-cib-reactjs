import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import mockData from '../data/portfolioData.json'; 
import type { RootState } from '../redux/rootReducer';

//  Define the Transaction type (matching mock data)
export interface Transaction {
  fundsId: string;
  date: string;
  status: string;
  amount: string; 
}

//  Define the state shape
interface TransactionState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

//  Initial state
const initialState: TransactionState = {
  data: [],
  loading: false,
  error: null,
};

//  Async thunk to simulate fetching from mock JSON
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transaction/fetchTransactions',
  async (_param: any) => {
    return new Promise<Transaction[]>((resolve) => {
      setTimeout(() => {
        resolve(mockData.transactions as Transaction[]);
      }, 500);
    });
  }
);

//  Create the transaction slice
const transactionSlice = createSlice({
  name: 'transaction',
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
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Selectors
export const getTransactionState = (state: RootState) => state.transaction;
export const getTransactionData = createSelector(getTransactionState, (transaction) => transaction.data);

// Export reducer
export default transactionSlice.reducer;
