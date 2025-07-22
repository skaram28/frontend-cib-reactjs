import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface register{
firstName: string;    
    lastName: string;
    username: string;
    emailId: string;
    address: string;
    phoneNumber: string;
    password: string;
    identityNumber: string;
    userType: string;
}

interface RegisterState {
  register:RegisterResponse|null;
    error: string | null;
}

const initialState: RegisterState = {
    register:null,
    error: null,

};
interface RegisterResponse {
    userId: string;
    userType: string | null;
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: string;
    identityNumber: string;
    address: string;
    password: string;
    active: boolean;
    userName: string;
}
 
export const registerUser = createAsyncThunk<RegisterResponse, register>(
  'register/registerUser',
  async (registerData: register, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:8086/api/users/register", 
            registerData, 
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
                },
            }
        );
        // assuming response.data = { username, role, token }
        console.log("testing .....");
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Registration failed");
      }
    }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
       state.register=action.payload;

        // Handle successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        // Handle registration failure
        console.error("Registration failed:", action.error);

      });
  }
});
export const { actions: registerActions } = registerSlice;
export default registerSlice.reducer;