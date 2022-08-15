import { AnswersType, DeckType, FlashcardType } from './folders';
import { studySections } from '@/redux/study/StudySections';

export interface StudyState {
  studyIsActive: boolean;
  deck: null | DeckType;
  flashcards: FlashcardType[];
  flashcardIsFlipped: boolean;
  typeOfFlashcardBeingStudied: string;
  answers: AnswersType;
  totalAnswers: number;
  studySection: keyof typeof studySections;
  timeSpent: number;
  answerIsSuccess: boolean;
}
