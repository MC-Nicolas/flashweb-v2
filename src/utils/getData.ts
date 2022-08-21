import { DeckType, FolderType } from '@/types/folders';
import { calculateFromTwoOpsAndOperator } from './calculations';
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

export const getFolderFromDeck = (deckId: string, folders: FolderType[]) => {
  const folder = folders.find((folder) => {
    return folder.decks.find((deck) => deck.id === deckId);
  });
  return removeSpecialChars(folder?.title ?? '');
};

export const getVariableById = (variables: any, id: string) => {
  const variable = variables.find((variable: any) => variable.id === id);
  return variable;
};

export const getVariableOfType = (variables: any, type: string): any[] => {
  const variablesByType = variables.filter(
    (variable: any) => variable.type === type
  );
  return variablesByType;
};

export const getValueByRecursive = (variables: any, id: string) => {
  const variableFound = getVariableById(variables, id);
  if (typeof variableFound.value === 'object') {
    if (variableFound.value['firstOp']) {
      const firstOpValue = getValueByRecursive(
        variables,
        variableFound.value['firstOp']
      );
      const secondOpValue = getValueByRecursive(
        variables,
        variableFound.value['secondOp']
      );
      const operator = variableFound.value['operator'];
      const result = calculateFromTwoOpsAndOperator(
        firstOpValue,
        secondOpValue,
        operator
      );
      return result;
    }
  } else return variableFound.value;
};

export const calculateResultByRecursion = (variable: any, variables: any[]) => {
  const { value } = variable;
  const firstOp = value.firstOp;
  const secondOp = value.secondOp;
  const operator = value.operator;
  const firstOpValue = getValueByRecursive(variables, firstOp);
  const secondOpValue = getValueByRecursive(variables, secondOp);
  const result = calculateFromTwoOpsAndOperator(
    firstOpValue,
    secondOpValue,
    operator
  );
  return result;
};
