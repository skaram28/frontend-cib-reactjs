import { createSlice } from "@reduxjs/toolkit";

const localUserId = localStorage.getItem('userId');

const initialState = {
  userId: localUserId || null,
};

const userSlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    clearUserId: (state) => {
      state.userId = null;
      localStorage.removeItem('userId');
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;

export default userSlice.reducer;
