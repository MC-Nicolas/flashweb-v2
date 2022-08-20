import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setTypeOfFlashcardBeingStudied } from '@/redux/study/StudySlice';
import { FlashcardType } from '@/types/folders';
import { useEffect } from 'react';
import ClassicFlashcard from '../Flashcard/Classic';
import MCQFlashcard from './components/MCQFlashcard/MCQFlashcard';
import Smartcard from './components/SmartCard/Smartcard';

const ActiveFlashcard = ({
  index,
  flashcards,
}: {
  index: number;
  flashcards: FlashcardType[];
}) => {
  const dispatch = useAppDispatch();
  const { flashcardIsFlipped } = useAppSelector((state) => state.study);
  const { typeOfFlashcard, flashcardData } = flashcards[index];
  const { front, back } = flashcardData;

  useEffect(() => {
    dispatch(setTypeOfFlashcardBeingStudied(typeOfFlashcard));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeOfFlashcard, dispatch]);

  const componentRenderer = (type: string) => {
    switch (type) {
      case 'classic':
        return (
          <ClassicFlashcard
            front={front}
            back={back}
            isFlipped={flashcardIsFlipped}
          />
        );
      case 'mcq':
        return (
          <MCQFlashcard
            front={front}
            back={back}
            isFlipped={flashcardIsFlipped}
          />
        );
      case 'smart':
        return (
          //@ts-ignore
          <Smartcard front={front} back={back} isFlipped={flashcardIsFlipped} />
        );
      default:
        return <></>;
    }
  };

  return componentRenderer(typeOfFlashcard);
};

export default ActiveFlashcard;
