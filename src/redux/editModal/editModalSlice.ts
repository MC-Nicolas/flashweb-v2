import { EditModalState } from '@/types/editModal';
import { createSlice } from '@reduxjs/toolkit';

const initialState: EditModalState = {
  isOpen: false,
  typeOfElementToEdit: '',
  nameOfElementToEdit: '',
  typeOfFlashcard: 'classic',
  classicFlashcard: { front: '', back: '' },
  flashcardIsFlipped: false,
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
    setTypeOfFlashcard: (state, action: { payload: string }) => {
      state.typeOfFlashcard = action.payload;
    },

    setFlashcardIsFlipped: (state, action: { payload: boolean }) => {
      state.flashcardIsFlipped = action.payload;
    },
    setClassicFlashcard: (
      state,
      action: { payload: { front: string; back: string } }
    ) => {
      state.classicFlashcard = action.payload;
    },
  },
});

export const {
  setModalIsOpen,
  setTypeOfElementToEdit,
  setNameOfElementToEdit,
  setTypeOfFlashcard,
  setFlashcardIsFlipped,
  setClassicFlashcard,
} = editModal.actions;

export default editModal.reducer;
