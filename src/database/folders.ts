import { DeckType } from '@/types/folders';
import { collection, getDocs } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import database from './firebase';

export const getFoldersFromDB = async (email: string) => {
  const folders: { id: string; title: string }[] = [];
  const querySnapshot = await getDocs(
    collection(database, 'users', email, 'folders')
  );
  querySnapshot.forEach((doc) =>
    folders.push({ id: doc.id, title: doc.data().title, ...doc.data() })
  );
  return folders;
};

export const getDecksFromDB = async (
  email: string,
  folders: { id: string; title: string }[]
): Promise<DeckType[]> => {
  const decks: DeckType[] = [];

  for (const folder of folders) {
    const querySnapshot = await getDocs(
      collection(database, 'users', email, 'folders', folder.id, 'decks')
    );
    querySnapshot.docs.map((doc) => {
      const { title, isImportant } = doc.data();
      decks.push({
        folderId: folder.id,
        title: title,
        id: doc.id,
        isImportant,
      });
    });
  }

  return decks;
};
