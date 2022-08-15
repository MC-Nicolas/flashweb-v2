import {
  AnswersType,
  DeckReviewType,
  DeckType,
  FolderType,
} from '@/types/folders';
import { calculatePercentageFromTwoNumber } from './calculations';

export const addAnswersFromSameDay = (allAnswers: DeckReviewType[]) => {
  let allAnswersByDate: any[] = [];

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

  allAnswersByDate = sortByDate(allAnswersByDate);
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
          totalAnswers +=
            review.answers.right.length + review.answers.wrong.length;
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
      calculateTimeFromSeconds(timeSpent),
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

export const extractDataForDeckTable = (
  decks: DeckType[],
  actions?: string
) => {
  const decksData: any[] = [];

  decks.forEach((deck: DeckType) => {
    const numberOfCards = deck.flashcards.length;
    const numberOfReviews = deck?.reviews?.length || 0;
    let totalAnswers = 0;
    let rightAnswers = 0;
    let timeSpent = 0;
    let todaysAnswers = 0;
    let todaysDate = new Date().toLocaleDateString('fr-fr');
    deck.reviews?.forEach((review: DeckReviewType) => {
      const dateOfReview = formatFromDateInSecondsToDate(review.date);
      if (dateOfReview === todaysDate) {
        todaysAnswers +=
          review.answers.right.length + review.answers.wrong.length;
      }
      totalAnswers += review.answers.right.length + review.answers.wrong.length;
      rightAnswers += review.answers.right.length;
      timeSpent += review.timeSpent;
    });

    if (!actions) {
      decksData.push([
        deck.title,
        numberOfCards,
        numberOfReviews,
        `${calculatePercentageFromTwoNumber(totalAnswers, rightAnswers)}%`,
        'Chart',
        'Edit deck',
      ]);
    } else {
      decksData.push([
        deck.title,
        numberOfReviews,
        `${calculatePercentageFromTwoNumber(totalAnswers, rightAnswers)}%`,
        calculateTimeFromSeconds(timeSpent),
        `${todaysAnswers === 0 ? false : true}`,
        'Study',
      ]);
    }
  });

  return decksData;
};

export const extractAllReviewsFromActiveFolder = (
  folders: FolderType[],
  activeFolder: string,
  activeDeck?: string
) => {
  let allReviews: any = [];
  const activeFolderIndex = findIndexOfFolder(folders, activeFolder);
  if (activeFolderIndex === -1) return [];
  const decks = folders[activeFolderIndex].decks;
  decks.forEach((deck: DeckType) => {
    if (deck.reviews) {
      if (activeDeck) {
        if (removeSpecialChars(deck.title) === removeSpecialChars(activeDeck)) {
          allReviews.push(deck.reviews);
        }
      } else {
        allReviews.push(deck.reviews);
      }
    }
  });
  return allReviews;
};

export const removeSpecialChars = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

export const formatFromDateInSecondsToDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString('fr-fr');
};

export const calculateTimeFromSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;
  if (hours > 0) {
    return `${manageSingleNumber(hours, 'left')}:${manageSingleNumber(
      minutes,
      'left'
    )}:${manageSingleNumber(secondsLeft, 'right')}`;
  } else {
    return `${manageSingleNumber(minutes, 'left')}:${manageSingleNumber(
      secondsLeft,
      'right'
    )}`;
  }
};

const formatFRDateToNewDate = (date: string | number) => {
  if (typeof date === 'number') return date;
  const dateArray = date.split('/');
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
};

export const sortByDate = (elementsToFormat: any[]) => {
  elementsToFormat.sort((a, b) => {
    return (
      new Date(formatFRDateToNewDate(a.date)).getTime() -
      new Date(formatFRDateToNewDate(b.date)).getTime()
    );
  });
  return elementsToFormat;
};

export const manageSingleNumber = (
  number: number,
  zeroPosition?: 'right' | 'left'
): string => {
  if (number > 9) return number.toString();
  if (zeroPosition === 'right') {
    return `${number}0`;
  }
  return `0${number}`;
};

export const findIndexOfFolder = (
  folders: FolderType[],
  folderIDorTitle: string
) => {
  return folders.findIndex(
    (folder: FolderType) =>
      removeSpecialChars(folder.title) === removeSpecialChars(folderIDorTitle)
  );
};

export const findIndexOfDeck = (
  folders: FolderType[],
  folderIDorTitle: string,
  deckIDorTitle: string
) => {
  const folderIndex = findIndexOfFolder(folders, folderIDorTitle);
  if (folderIndex === -1) return -1;
  const allDecks = folders[folderIndex].decks;
  return allDecks.findIndex(
    (deck: DeckType) =>
      removeSpecialChars(deck.title) === removeSpecialChars(deckIDorTitle)
  );
};

export const deepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
