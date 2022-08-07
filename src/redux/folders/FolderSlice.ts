import {
  AnswersType,
  DeckReviewType,
  FoldersOptionType,
  FolderType,
} from '@/types/folders';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { transformFoldersFromDBToOptions } from '@/utils/foldersFormatting';

import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  folders: FolderType[];
  foldersOptions: FoldersOptionType[];
  activeFolder: string;
  decksOptions: FoldersOptionType[];
  activeDeck: string;
  allReviews: DeckReviewType[];
} = {
  folders: [],
  foldersOptions: [],
  activeFolder: '',
  decksOptions: [],
  activeDeck: '',
  allReviews: [],
};

export const userSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    setFoldersOptions: (state, action) => {
      state.foldersOptions = action.payload;
    },
    setActiveFolder: (state, action) => {
      const folderIndex = state.folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.id) === removeSpecialChars(action.payload)
      );
      const decks = state.folders[folderIndex].decks;
      state.activeFolder = action.payload;
      if (decks.length > 0) {
        state.activeDeck = state.folders[folderIndex].decks[0].title;
        state.decksOptions = transformFoldersFromDBToOptions(decks);
      }
    },
    setDecksOptions: (state, action) => {
      state.decksOptions = action.payload;
    },
    setActiveDeck: (state, action) => {
      state.activeDeck = action.payload;
    },
    addFolder: (state, action) => {
      const formattedFolder = {
        title: action.payload,
        decks: [],
      };
      state.folders.push(formattedFolder);
      state.activeFolder = action.payload;
      state.foldersOptions.push({
        name: formattedFolder.title,
        value: removeSpecialChars(formattedFolder.title),
      });
    },

    removeFolder: (state, action) => {
      const folderIndex = state.folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.id) === removeSpecialChars(action.payload)
      );
      state.folders.splice(folderIndex, 1);
      state.foldersOptions.splice(folderIndex, 1);
      if (state.folders.length > 0) {
        state.activeFolder = state.folders[0].title;
      } else {
        state.activeFolder = '';
      }
    },
    addDeck: (state, action) => {
      const { isImportant, title, folderId } = action.payload;
      const formattedDeck = {
        title,
        isImportant,
        folderId,
        id: removeSpecialChars(title),
        flashcards: [],
      };
      const folderIndex = state.folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.title) === removeSpecialChars(folderId)
      );
      state.folders[folderIndex].decks.push(formattedDeck);
      state.decksOptions.push({
        name: formattedDeck.title,
        value: removeSpecialChars(formattedDeck.title),
      });
    },
    removeDeck: (state, action) => {
      const { folderId, deckId } = action.payload;
      const folderIndex = state.folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.title) === removeSpecialChars(folderId)
      );
      const deckIndex = state.folders[folderIndex].decks.findIndex(
        (deck: any) =>
          removeSpecialChars(deck.title) === removeSpecialChars(deckId)
      );
      state.folders[folderIndex].decks.splice(deckIndex, 1);
      state.decksOptions.splice(deckIndex, 1);
      // ! TODO modify all reviews as well
    },
    addFlashcard: (state, action) => {
      const { typeOfFlashcard, deckId, front, back, folderId } = action.payload;
      const formattedFlashcard = {
        typeOfFlashcard,
        flashcardData: {
          front,
          back,
        },
      };
      const folderIndex = state.folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.title) === removeSpecialChars(folderId)
      );

      const deckIndex = state.folders[folderIndex].decks.findIndex(
        (deck: any) =>
          removeSpecialChars(deck.id) === removeSpecialChars(deckId)
      );
      state.folders[folderIndex].decks[deckIndex].flashcards.push(
        formattedFlashcard
      );
    },

    addReview: (
      state,
      action: {
        payload: {
          deckId: string;
          folderId: string;
          answers: any;
          timeSpent: number;
        };
      }
    ) => {
      const { deckId, folderId, answers, timeSpent } = action.payload;
      const formattedReview = {
        answers,
        date: parseInt((new Date().getTime() / 1000).toFixed()),
        timeSpent,
      };
      const folderIndex = state.folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.title) === removeSpecialChars(folderId)
      );

      const deckIndex = state.folders[folderIndex].decks.findIndex(
        (deck: any) =>
          removeSpecialChars(deck.id) === removeSpecialChars(deckId)
      );
      state.folders[folderIndex]?.decks[deckIndex]?.reviews?.push(
        formattedReview
      );
      state.allReviews.push(formattedReview);
    },

    setAllReview: (state, action) => {
      state.allReviews = action.payload;
    },
  },
});

export const {
  setFolders,
  setFoldersOptions,
  setDecksOptions,
  setActiveFolder,
  setActiveDeck,
  addFolder,
  removeFolder,
  addDeck,
  removeDeck,
  addFlashcard,
  addReview,
  setAllReview,
} = userSlice.actions;

export default userSlice.reducer;
