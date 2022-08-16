import { MCQAnswerType, MCQState } from '@/types/mcq';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: MCQState = {
  front: '',
  back: [{ text: '', isCorrect: false }],
};

export const mcqSlice = createSlice({
  name: 'mcqFlashcard',
  initialState,
  reducers: {
    setFront: (state, action: { payload: string }) => {
      state.front = action.payload;
    },
    addEmptyAnswer: (state) => {
      state.back.push({ text: '', isCorrect: false });
    },
    setAnswerText: (
      state,
      action: { payload: { index: number; text: string } }
    ) => {
      state.back[action.payload.index] = {
        ...state.back[action.payload.index],
        text: action.payload.text,
      };
    },
    setAnswerIsCorrect: (
      state,
      action: { payload: { index: number; isCorrect: boolean } }
    ) => {
      state.back[action.payload.index] = {
        ...state.back[action.payload.index],
        isCorrect: action.payload.isCorrect,
      };
    },
    removeAnswer: (state, action: { payload: number }) => {
      state.back.splice(action.payload, 1);
    },

    resetMCQFlashcard: (state) => {
      state.front = '';
      state.back = [{ text: '', isCorrect: false }];
    },
  },
});

export const {
  setFront,
  addEmptyAnswer,
  setAnswerText,
  setAnswerIsCorrect,
  removeAnswer,
  resetMCQFlashcard,
} = mcqSlice.actions;
export default mcqSlice.reducer;
