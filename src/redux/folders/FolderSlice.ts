import { FoldersOptionType } from '@/types/folders';
import {
  sortOptionsByName,
  transformDecksToOptions,
  transformFoldersToOptions,
} from '@/utils/foldersFormatting';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  folders: {};
  foldersOptions: FoldersOptionType[];
  activeFolder: string;
  decks: [];
  decksOptions: FoldersOptionType[];
  activeDeck: string;
} = {
  folders: {},
  foldersOptions: [],
  activeFolder: '',
  decks: [],
  decksOptions: [],
  activeDeck: '',
};

export const userSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      const foldersOptions = sortOptionsByName(
        transformFoldersToOptions(action.payload)
      );
      state.folders = action.payload;
      state.foldersOptions = foldersOptions;
      if (foldersOptions.length > 0) {
        const decks = action.payload[foldersOptions[0].value]?.decks || [];
        state.activeFolder = foldersOptions[0].value;
        state.decks = decks;
        if (decks.length > 0) {
          state.activeDeck = decks[0].id;
          state.decksOptions = transformDecksToOptions(decks);
        }
      }
    },
    setFoldersOptions: (state, action) => {
      state.foldersOptions = action.payload;
    },
    setActiveFolder: (state: any, action) => {
      state.activeFolder = action.payload;
      const decks = state.folders[action.payload].decks || [];
      if (decks.length > 0) {
        state.activeDeck = decks[0].id;
        state.decksOptions = transformDecksToOptions(decks);
      }
    },
    setActiveDeck: (state, action) => {
      state.activeDeck = action.payload;
    },
  },
});

export const { setFolders, setFoldersOptions, setActiveFolder, setActiveDeck } =
  userSlice.actions;

export default userSlice.reducer;
