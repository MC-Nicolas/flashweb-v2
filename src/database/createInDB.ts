import { removeSpecialChars } from '@/utils/dataFormatting';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import database from './firebase';

export const createFolderInDB = async (email: string, folderName: string) => {
  let response: { success: boolean; error: any } = {
    success: false,
    error: null,
  };

  try {
    const docRef = doc(database, 'users', email);
    const docSnapshot = await getDoc(docRef);

    const formattedFolderName = removeSpecialChars(folderName).toLowerCase();

    if (docSnapshot.exists()) {
      const { folders } = docSnapshot.data();
      if (folders && folders[formattedFolderName]) {
        response.error = 'Folder already exists';
        return response;
      } else {
        await setDoc(
          doc(database, 'users', email),
          {
            folders: {
              [formattedFolderName]: {
                title: folderName,
                decks: [],
              },
            },
          },
          { merge: true }
        );
      }
    }

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
    const docRef = doc(database, 'users', email);
    const docSnapshot = await getDoc(docRef);

    const formattedDeckName = removeSpecialChars(deckName).toLowerCase();

    if (docSnapshot.exists()) {
      const { folders } = docSnapshot.data();

      const deckFound = folders[folderName].decks.find(
        (deck: any) => deck.id === formattedDeckName
      );

      if (!deckFound) {
        await setDoc(
          doc(database, 'users', email),
          {
            folders: {
              [folderName]: {
                decks: [
                  ...folders[folderName].decks,
                  {
                    title: deckName,
                    isImportant: isDeckImportant,
                    id: formattedDeckName,
                    flashcards: [],
                  },
                ],
              },
            },
          },
          { merge: true }
        );
      }
    }

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
    const docRef = doc(database, 'users', email);
    const docSnapshot = await getDoc(docRef);

    console.log(email, folderName, deckName, typeOfFlashcard, flashcardData);

    if (docSnapshot.exists()) {
      const { folders } = docSnapshot.data();

      const deckFound = folders[folderName].decks.findIndex(
        (deck: any) => deck.id === deckName
      );

      if (deckFound !== -1) {
        response.error = 'Deck not found';
        return;
      } else {
        // Add flashcard to deck
      }
    }
    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};
