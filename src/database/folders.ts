import { DeckReviewType, DeckType, FlashcardType } from '@/types/folders';
import { collection, getDocs } from 'firebase/firestore';
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
  let decks: DeckType[] = [];

  try {
    for (const folder of folders) {
      const querySnapshot = await getDocs(
        collection(database, 'users', email, 'folders', folder.id, 'decks')
      );
      querySnapshot.docs.map(async (doc) => {
        const { title, isImportant } = doc.data();
        decks.push({
          folderId: folder.id,
          title: title,
          id: doc.id,
          isImportant,
          flashcards: [],
        });
      });
    }
  } catch (error: any) {
    throw new Error(error);
  }

  return decks;
};

export const getFlashcardsForDeck = async (
  email: string,
  folderId: string,
  deckId: string
): Promise<FlashcardType[]> => {
  const flashcards: FlashcardType[] = [];
  const querySnapshot = await getDocs(
    collection(
      database,
      'users',
      email,
      'folders',
      folderId,
      'decks',
      deckId,
      'flashcards'
    )
  );

  querySnapshot.docs.map((doc) => {
    const { typeOfFlashcard, flashcardData } = doc.data();
    flashcards.push({
      typeOfFlashcard,
      flashcardData,
    });
  });

  return flashcards;
};

export const getReviewsForDeck = async (
  email: string,
  folderId: string,
  deckId: string
): Promise<DeckReviewType[]> => {
  const reviews: DeckReviewType[] = [];
  const querySnapshot = await getDocs(
    collection(
      database,
      'users',
      email,
      'folders',
      folderId,
      'decks',
      deckId,
      'reviews'
    )
  );

  querySnapshot.docs.map((doc) => {
    const { answers, date, timeSpent } = doc.data();

    reviews.push({
      answers,
      date,
      timeSpent,
    });
  });

  return reviews;
};
