import {
  AnswersType,
  DeckReviewType,
  DeckType,
  FolderType,
} from '@/types/folders';

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

export const extractDataForFolderTable = (folders: FolderType[]) => {
  const foldersData: any[] = [];

  folders.forEach((folder: FolderType) => {
    let numberOfDecks = 0;
    let numberOfCards = 0;
    numberOfDecks += folder.decks.length;
    folder.decks.forEach((deck: DeckType) => {
      numberOfCards += deck.flashcards.length;
    });
    foldersData.push([
      folder.title,
      numberOfDecks,
      numberOfCards,
      'Edit folder',
    ]);
  });

  return foldersData;
};

export const extractDataForDeckTable = (decks: DeckType[]) => {
  const decksData: any[] = [];

  decks.forEach((deck: DeckType) => {
    const numberOfCards = deck.flashcards.length;
    const numberOfReviews = deck?.reviews?.length || 0;
    const avgSuccess = 0;

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
