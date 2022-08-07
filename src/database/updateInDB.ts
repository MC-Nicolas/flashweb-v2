import { doc, updateDoc } from 'firebase/firestore';
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
