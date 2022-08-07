import { EditModalState } from '@/types/editModal';
import { createSlice } from '@reduxjs/toolkit';

const initialState: EditModalState = {
  isOpen: false,
  typeOfElementToEdit: '',
  nameOfElementToEdit: '',
};

export const editModal = createSlice({
  name: 'editModal',
  initialState,
  reducers: {
    setModalIsOpen: (state, action: { payload: boolean }) => {
      state.isOpen = action.payload;
    },
    setTypeOfElementToEdit: (state, action: { payload: string }) => {
      state.typeOfElementToEdit = action.payload;
    },
    setNameOfElementToEdit: (state, action: { payload: string }) => {
      state.nameOfElementToEdit = action.payload;
    },
  },
});

export const {
  setModalIsOpen,
  setTypeOfElementToEdit,
  setNameOfElementToEdit,
} = editModal.actions;

export default editModal.reducer;
