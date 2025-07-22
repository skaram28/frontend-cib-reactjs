/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../redux/rootReducer";
import { apiPost } from "../api/axiosInstance";

interface User {
  username: string;
  role: string;
  token?: string;
}

interface LoginState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<User, { username: string; password: string }>(
  "login/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiPost("/login", credentials);
      // assuming response.data = { username, role, token }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const getLoginLoading = (state: RootState) => state.login.loading;
export const getLoginError = (state: RootState) => state.login.error;
export const getCurrentUser = (state: RootState) => state.login.user;

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;