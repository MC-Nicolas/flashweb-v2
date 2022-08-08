import {
  AnswersType,
  DeckReviewType,
  DeckType,
  FolderType,
} from '@/types/folders';
import { calculatePercentageFromTwoNumber } from './calculations';

export const removeSpecialChars = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

export const formatFromDateInSecondsToDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString('fr-fr');
};

export const addAnswersFromSameDay = (allAnswers: any[]) => {
  let allAnswersByDate: any[] = [];

  // for each answer, add the answers from the same day

  allAnswers.forEach((answer: any) => {
    const date = formatFromDateInSecondsToDate(answer.date);
    const index = allAnswersByDate.findIndex((item) => item.date === date);

    if (index === -1) {
      allAnswersByDate.push({
        timeSpent: answer.timeSpent,
        rightAnswerCount: answer.answers.right.length,
        wrongAnswerCount: answer.answers.wrong.length,
        date: formatFromDateInSecondsToDate(answer.date),
      });
    } else {
      allAnswersByDate[index].rightAnswerCount += answer.answers.right.length;
      allAnswersByDate[index].wrongAnswerCount += answer.answers.wrong.length;
      allAnswersByDate[index].timeSpent += answer.timeSpent;
    }
  });

  allAnswersByDate.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return allAnswersByDate;
};

export const extractDataForFolderTable = (
  folders: FolderType[],
  activeFolder?: string
) => {
  const foldersData: any[] = [];

  folders.forEach((folder: FolderType) => {
    let numberOfDecks = 0;
    let numberOfCards = 0;
    let numberOfReviews = 0;
    let timeSpent = 0;
    let totalAnswers = 0;
    let rightAnswers = 0;
    numberOfDecks += folder.decks.length;
    folder.decks.forEach((deck: DeckType) => {
      numberOfCards += deck.flashcards.length;
      if (deck.reviews) {
        numberOfReviews += deck.reviews.length;
        deck.reviews.forEach((review: DeckReviewType) => {
          timeSpent += review.timeSpent;
          //@ts-ignore
          totalAnswers +=
            //@ts-ignore
            review.answers.right.length + review.answers.wrong.length;
          //@ts-ignore
          rightAnswers += review.answers.right.length;
        });
      }
    });
    const avgSuccess = `${calculatePercentageFromTwoNumber(
      totalAnswers,
      rightAnswers
    )}%`;

    foldersData.push([
      folder.title,
      numberOfDecks,
      numberOfCards,
      numberOfReviews,
      avgSuccess,
      calculateMinutesAndSecondsFromSeconds(timeSpent),
      'Chart',
      'Edit folder',
    ]);
  });
  if (activeFolder) {
    return foldersData.filter(
      (folder: any) =>
        removeSpecialChars(folder[0]) === removeSpecialChars(activeFolder)
    );
  }

  return foldersData;
};

export const extractDataForDeckTable = (decks: DeckType[]) => {
  const decksData: any[] = [];

  decks.forEach((deck: DeckType) => {
    const numberOfCards = deck.flashcards.length;
    const numberOfReviews = deck?.reviews?.length || 0;
    let avgSuccess = '0%';

    decksData.push([
      deck.title,
      numberOfCards,
      numberOfReviews,
      avgSuccess,
      'Chart',
      'Edit deck',
    ]);
  });

  return decksData;
};

export const extractAllReviewsFromActiveFolder = (
  folders: FolderType[],
  activeFolder: string
) => {
  let allReviews: any = [];
  const activeFolderIndex = folders.findIndex(
    (folder: FolderType) =>
      removeSpecialChars(folder.title) === removeSpecialChars(activeFolder)
  );
  if (activeFolderIndex === -1) return [];
  const decks = folders[activeFolderIndex].decks;
  decks.forEach((deck: DeckType) => {
    if (deck.reviews) {
      allReviews.push(deck.reviews);
    }
  });
  return allReviews;
};

export const calculateMinutesAndSecondsFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${secondsLeft}`;
};
