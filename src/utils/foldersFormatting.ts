import {
  DeckReviewType,
  DeckType,
  FoldersOptionType,
  FolderType,
} from '@/types/folders';
import { removeSpecialChars } from './dataFormatting';

// check if a key exists in object
export const keyExists = (obj: any, key: string) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const transformFromDatabaseToReduxFolders = (
  folders: any,
  decks: any
) => {
  const foldersRedux: {}[] = [];
  for (const folder of folders) {
    const decksRedux: any[] = [];
    for (const deck of decks) {
      if (deck.folderId === folder.id) {
        if (keyExists(deck, 'flashcards')) {
          decksRedux.push(deck);
        } else {
          decksRedux.push({
            ...deck,
            flashcards: [],
          });
        }
      }
    }
    foldersRedux.push({
      id: folder.id,
      title: folder.title,
      decks: decksRedux,
    });
  }
  return foldersRedux;
};

export const transformFoldersFromDBToOptions = (
  folders: { id: string; title: string }[]
): FoldersOptionType[] => {
  const foldersOptions: FoldersOptionType[] = [];
  for (const folder of folders) {
    foldersOptions.push({
      name: folder.title,
      value: folder.id,
    });
  }
  return foldersOptions;
};

export const transformDecksFromDBToOptions = (
  decks: DeckType[]
): FoldersOptionType[] => {
  const decksOptions: FoldersOptionType[] = [];

  for (const deck of decks) {
    decksOptions.push({
      name: deck.title,
      value: deck.id,
    });
  }
  return decksOptions;
};

export const sortOptionsByName = (options: FoldersOptionType[]) => {
  return options.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const extractAllDecksForFolder = (
  activeFolder: string,
  folders: FolderType[]
) => {
  const decks: DeckType[] = [];
  for (const folder of folders) {
    if (removeSpecialChars(folder.title) === removeSpecialChars(activeFolder)) {
      for (const deck of folder.decks) {
        decks.push(deck);
      }
    }
  }
  return decks;
};
