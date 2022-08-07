import { doc, deleteDoc } from 'firebase/firestore';
import database from './firebase';

export const deleteFolderFromDB = async (email: string, folderId: string) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };
  try {
    await deleteDoc(doc(database, 'users', email, 'folders', folderId));
    response.success = true;
  } catch (err) {
    response.error = err;
  }

  return response;
};

export const deleteDeckFromDB = async (
  email: string,
  folderId: string,
  deckId: string
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };
  try {
    await deleteDoc(
      doc(database, 'users', email, 'folders', folderId, 'decks', deckId)
    );
    response.success = true;
  } catch (err) {
    response.error = err;
  }

  return response;
};

export const deleteFlashcardFromDB = async (
  email: string,
  folderId: string,
  deckId: string,
  flashcardId: string
) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };
  try {
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
        flashcardId
      )
    );
    response.success = true;
  } catch (err) {
    response.error = err;
  }

  return response;
};
