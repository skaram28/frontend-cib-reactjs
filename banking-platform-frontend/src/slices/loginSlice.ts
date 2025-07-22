/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../redux/rootReducer";
import { apiPost } from "../api/axiosInstance";

interface Token {
  accessToken?: string;
  expiresIn?: number;
  roles?: string[];
  userId?: string;
}

interface LoginState {
  accessToken: Token | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  accessToken: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<Token, { username: string; password: string }>(
  "login/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiPost("http://localhost:8082/api/auth/login", credentials);
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
      state.accessToken = null;
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
        state.accessToken = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const getLoginLoading = (state: RootState) => state.login.loading;
export const getLoginError = (state: RootState) => state.login.error;
export const getCurrentToken = (state: RootState) => state.login.accessToken;

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;