import { AnswersType, DeckType, FlashcardType } from './folders';
import { studySections } from '@/redux/study/StudySections';

export interface StudyState {
  studyIsActive: boolean;
  deck: null | DeckType;
  flashcards: FlashcardType[];
  flashcardIsFlipped: boolean;
  answers: AnswersType;
  totalAnswers: number;
  studySection: keyof typeof studySections;
  timeSpent: number;
}
