import { createSlice } from '@reduxjs/toolkit';

import { StudyState } from '@/types/study';
import { studySections } from './StudySections';

const initialState: StudyState = {
  studyIsActive: false,
  deck: null,
  flashcards: [],
  answers: { right: [], wrong: [] },
  flashcardIsFlipped: false,
  totalAnswers: 0,
  studySection: 'STUDY',
  timeSpent: 0,
};

export const userSlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setStudyIsActive: (state, action) => {
      state.studyIsActive = action.payload;
    },
    setDeck: (state, action) => {
      state.deck = action.payload;
    },
    setFlashcards: (state, action) => {
      state.flashcards = action.payload;
    },
    addWrongAnswer: (state, action: { payload: string }) => {
      //@ts-ignore
      state.answers.wrong.push(action.payload);
      state.totalAnswers++;
    },
    addRightAnswer: (state, action: { payload: string }) => {
      //@ts-ignore
      state.answers.right.push(action.payload);
      state.totalAnswers++;
    },
    setFlashcardIsFlipped: (state, action) => {
      state.flashcardIsFlipped = action.payload;
    },
    setStudySection: (state, action) => {
      state.studySection = action.payload;
    },
    setTimeSpent: (state, action) => {
      state.timeSpent = action.payload;
    },

    resetStudyState: (state) => {
      state.studyIsActive = false;
      state.answers = { right: [], wrong: [] };
      state.flashcardIsFlipped = false;
      state.totalAnswers = 0;
      state.studySection = 'STUDY';
      state.timeSpent = 0;
    },
  },
});

export const {
  setStudyIsActive,
  setDeck,
  setFlashcards,
  addWrongAnswer,
  addRightAnswer,
  setFlashcardIsFlipped,
  resetStudyState,
  setStudySection,
  setTimeSpent,
} = userSlice.actions;

export default userSlice.reducer;
