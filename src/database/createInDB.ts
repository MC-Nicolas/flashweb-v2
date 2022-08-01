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
          docRef,
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
                    timeSpent: 0,
                    reviews: [],
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

    if (docSnapshot.exists()) {
      const { folders } = docSnapshot.data();

      let decks = folders[folderName].decks;
      const deckIndex = decks.findIndex((deck: any) => deck.id === deckName);

      decks[deckIndex] = {
        ...decks[deckIndex],
        flashcards: [
          ...decks[deckIndex].flashcards,
          {
            flashcardData,
            typeOfFlashcard,
          },
        ],
      };

      if (deckIndex === -1) {
        response.error = 'Deck not found';
        return;
      } else {
        await setDoc(docRef, {
          folders: {
            [folderName]: {
              ...folders[folderName],
              decks,
            },
          },
        });
      }
    }
    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};
