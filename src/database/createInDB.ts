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

      if (folders[folderName][formattedDeckName]) {
        response.error = 'Deck already exists';
        return response;
      }

      // Get doc and merge both decks

      await setDoc(
        doc(database, 'users', email),
        {
          folders: {
            [folderName]: {
              decks: [
                {
                  title: deckName,
                  isImportant: isDeckImportant,
                  id: formattedDeckName,
                },
              ],
            },
          },
        },
        { merge: true }
      );
    }

    response.success = true;
  } catch (err) {
    response.error = err;
  }
  return response;
};
