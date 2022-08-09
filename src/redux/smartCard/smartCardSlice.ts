import { smartCardState } from '@/types/smartCard';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: smartCardState = {
  modalIsOpened: false,
  elementOptions: [
    { name: 'Number', value: 'number' },
    { name: 'Text', value: 'text' },
  ],
  typeOfElement: 'number',
  numberOptions: [
    { name: 'Simple', value: 'simple' },
    { name: 'Random', value: 'random' },
    { name: 'Result', value: 'result' },
  ],
  typeOfNumber: 'simple',
  addVariableIsOpened: false,
};

export const smartCardSlice = createSlice({
  name: 'smartCard',
  initialState,
  reducers: {
    setModalIsOpened: (state, action) => {
      state.modalIsOpened = action.payload;
    },
    setTypeOfElement: (state, action) => {
      state.typeOfElement = action.payload;
    },
    setTypeOfNumber: (state, action) => {
      state.typeOfNumber = action.payload;
    },
    setAddVariableIsOpened: (state, action) => {
      state.addVariableIsOpened = action.payload;
    },
  },
});

export const {
  setModalIsOpened,
  setTypeOfElement,
  setTypeOfNumber,
  setAddVariableIsOpened,
} = smartCardSlice.actions;
export default smartCardSlice.reducer;
