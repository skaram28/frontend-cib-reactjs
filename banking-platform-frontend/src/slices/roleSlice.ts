import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";


interface RolesResponse {
    userId: number;
    roles: string[];
}

interface RoleState {
    userId?: number;
    error: string | null;
    role: string[] | null;
    loading: boolean;
}
const initialState: RoleState = {
    userId: undefined,
    error: null,
    role: null,
    loading: false,
};
export const fetchRoles = createAsyncThunk<RolesResponse>(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
        console.log("Fetching roles..."+`Bearer ${localStorage.getItem('token')}`);
      const response = await axios.get("http://localhost:8082/api/auth/roles/1",
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
          },
        }
      );
      console.log("Roles fetched successfully", response.data);
      localStorage.setItem('userId', response.data.userId.toString()); // Store userId in localStorage
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);



export const roleSlice = createSlice({
  name: 'role',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.roles;
        state.userId = action.payload.userId;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch roles";
      });
  },
});

export const getRoleState = (state: any) => state.role;
export const getRoleLoading = (state: any) => state.role.loading;
export const getRoleError = (state: any) => state.role.error;
export const getUserId = (state: any) => state.role.userId;
export default roleSlice.reducer;