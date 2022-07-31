import { FoldersOptionType } from '@/types/folders';

export const transformFoldersToOptions = (folders: {
  [key: string]: { title: string };
}) => {
  return Object.keys(folders).map((key) => ({
    value: key,
    name: folders[key].title,
  }));
};

export const transformDecksToOptions = (
  decks: { title: string; id: string; isImportant: boolean }[]
) => {
  return decks.map((deck) => ({ name: deck.title, value: deck.id }));
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
