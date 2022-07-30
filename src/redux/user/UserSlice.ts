import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const initialState: { email: string; isUserAuthenticated: boolean } = {
  email: '',
  isUserAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
      state.isUserAuthenticated = true;
    },
    setIsUserAuthenticated: (state, action) => {
      state.isUserAuthenticated = action.payload;
      if (!action.payload) {
        state.email = '';
      }
    },
  },
});

export const { setUserEmail, setIsUserAuthenticated } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
