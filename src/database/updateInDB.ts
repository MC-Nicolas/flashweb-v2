import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import database from './firebase';

export const updateDeckInDB = async (
  email: string,
  folderId: string,
  deckId: string,
  isImportant: boolean
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      folderId,
      'decks',
      deckId
    );

    await updateDoc(docRef, {
      isImportant,
    });

    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};

export const updateClassicFlashcardInDB = async (
  email: string,
  folderId: string,
  deckId: string,
  flashcardId: string,
  flashcardData: { front: string; back: string },
  initialFlashcardFront: string
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    const docRef = doc(
      database,
      'users',
      email,
      'folders',
      folderId,
      'decks',
      deckId,
      'flashcards',
      flashcardId
    );

    await deleteDoc(
      doc(
        database,
        'users',
        email,
        'folders',
        folderId,
        'decks',
        deckId,
        'flashcards',
        initialFlashcardFront
      )
    );

    await setDoc(docRef, {
      flashcardData,
      typeOfFlashcard: 'classic',
    });

    // ! TODO update in redux and update in DB allreviews

    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};
