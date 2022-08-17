import { EditModalState } from '@/types/editModal';
import { createSlice } from '@reduxjs/toolkit';

const initialState: EditModalState = {
  isOpen: false,
  typeOfElementToEdit: '',
  nameOfElementToEdit: '',
  typeOfFlashcard: 'classic',
  flashcardToEdit: { front: '', back: '' },
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
    setFlashcardToEdit: (
      state,
      action: { payload: { front: string; back: string } }
    ) => {
      state.flashcardToEdit = action.payload;
    },
    setTextForFlashcard: (
      state,
      action: { payload: { index: number; text: string } }
    ) => {
      state.flashcardToEdit.back[action.payload.index].text =
        action.payload.text;
    },
  },
});

export const {
  setModalIsOpen,
  setTypeOfElementToEdit,
  setNameOfElementToEdit,
  setTypeOfFlashcard,
  setFlashcardIsFlipped,
  setFlashcardToEdit,
  setTextForFlashcard,
} = editModal.actions;

export default editModal.reducer;
