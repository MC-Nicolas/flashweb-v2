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
  flashcardData: { front: string; back: any }
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    const formattedFolderName = removeSpecialChars(folderName).toLowerCase();
    const formattedDeckName = removeSpecialChars(deckName).toLowerCase();
    const formattedFlashcardFront = removeSpecialChars(
      flashcardData.front
    ).toLowerCase();

    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      formattedFolderName,
      'decks',
      formattedDeckName,
      'flashcards',
      formattedFlashcardFront
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
