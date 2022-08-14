import { AnswersType } from '@/types/folders';
import { variablesWithIdType } from '@/types/smartCard';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import database from './firebase';

export const createFolderInDB = async (email: string, folderName: string) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    const formattedFolderName = removeSpecialChars(folderName).toLowerCase();
    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      formattedFolderName
    );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      response.error = 'Folder already exists';
      return response;
    }

    await setDoc(docRef, {
      title: folderName,
    });

    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};

export const createNewDeckInDB = async (
  email: string,
  folderName: string,
  deckName: string,
  isDeckImportant: boolean
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    const formattedFolderName = removeSpecialChars(folderName).toLowerCase();
    const formattedDeckName = removeSpecialChars(deckName).toLowerCase();

    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      formattedFolderName,
      'decks',
      formattedDeckName
    );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      response.error = 'Deck already exists';
      return response;
    }

    await setDoc(docRef, {
      title: deckName,
      id: formattedDeckName,
      isImportant: isDeckImportant,
    });

    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};

export const createNewFlashcardInDb = async (
  email: string,
  folderName: string,
  deckName: string,
  typeOfFlashcard: string,
  flashcardData:
    | { front: string; back: any }
    | {
        front: { variables: variablesWithIdType[] };
        back: { variables: variablesWithIdType[] };
      }
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };
  try {
    const formattedFolderName = removeSpecialChars(folderName).toLowerCase();
    const formattedDeckName = removeSpecialChars(deckName).toLowerCase();
    let flashcardTitle = '';
    console.log(flashcardData);
    if (typeof flashcardData.front === 'string') {
      flashcardTitle = removeSpecialChars(flashcardData.front).toLowerCase();
    } else {
      const results = flashcardData.front.variables.filter(
        (variable: variablesWithIdType) => variable.type === 'result'
      );
      flashcardTitle = `${removeSpecialChars(
        results[results.length - 1].name
      ).toLowerCase()}${Math.floor(Math.random() * 10000)}`;
    }

    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      formattedFolderName,
      'decks',
      formattedDeckName,
      'flashcards',
      flashcardTitle
    );
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      response.error = 'Flashcard already exists';
      return response;
    }

    await setDoc(docRef, {
      typeOfFlashcard,
      flashcardData,
    });

    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};

export const saveReviewInDB = async (
  email: string,
  folderId: string,
  deckId: string,
  answers: AnswersType,
  timeSpent: number
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };
  const nowInSec = Math.floor(Date.now() / 1000);
  try {
    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      folderId,
      'decks',
      deckId,
      'reviews',
      nowInSec.toString()
    );
    await setDoc(docRef, {
      answers,
      date: nowInSec,
      timeSpent,
    });
    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};

export const modifyFolderTitleInDB = async (
  email: string,
  folderId: string
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    alert(
      'This feature is not yet implemented, please try again in a few days'
    );

    response.success = true;
  } catch (err) {
    response.error = err;
  }
};
