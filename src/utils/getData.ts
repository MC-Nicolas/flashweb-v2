import { DeckType, FolderType } from '@/types/folders';
import { findIndexOfFolder, removeSpecialChars } from './dataFormatting';

export const getDeckData = (
  folders: FolderType[],
  activeFolder: string,
  activeDeck: string
) => {
  const activeFolderIndex = findIndexOfFolder(folders, activeFolder);
  if (folders[activeFolderIndex] === undefined) return;
  const activeDeckIndex = folders[activeFolderIndex].decks.findIndex(
    (deck: DeckType) =>
      removeSpecialChars(deck.title) === removeSpecialChars(activeDeck)
  );

  const deckData: DeckType = folders[activeFolderIndex].decks[activeDeckIndex];

  return deckData;
};

export const getVariableById = (variables: any, id: string) => {
  const variable = variables.find((variable: any) => variable.id === id);
  return variable;
};
