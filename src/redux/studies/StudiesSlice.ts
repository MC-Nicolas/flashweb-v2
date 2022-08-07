import { createSlice } from '@reduxjs/toolkit';

import { StudiesState } from '@/types/studies';

const initialState: StudiesState = {
  editIsActive: false,
};

export const studiesSlice = createSlice({
  name: 'studies',
  initialState,
  reducers: {
    setEditIsActive: (state, action) => {
      state.editIsActive = action.payload;
    },
  },
});

export const { setEditIsActive } = studiesSlice.actions;
export default studiesSlice.reducer;
