export interface FlashcardType {
  typeOfFlashcard: string;
  flashcardData: {
    front: string;
    back: any;
  };
}

export interface AnswersType {
  wrong: string[];
  right: string[];
}
export interface DeckReviewType {
  date: number;
  timeSpent: number;
  answers: AnswersType[];
}
export interface DeckType {
  isImportant: boolean;
  id: string;
  title: string;
  folderId: string;
  flashcards: FlashcardType[];
  reviews?: DeckReviewType[];
}

export interface FoldersOptionType {
  name: string;
  value: string;
}

export interface FolderType {
  title: string;
  decks: DeckType[];
}
