import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setTypeOfFlashcardBeingStudied } from '@/redux/study/StudySlice';
import { FlashcardType } from '@/types/folders';
import { useEffect } from 'react';
import ClassicFlashcard from '../Flashcard/Classic';
import Smartcard from './components/Smartcard';

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
  }, [typeOfFlashcard]);

  if (typeOfFlashcard === 'classic') {
    return (
      <ClassicFlashcard
        front={front}
        back={back}
        isFlipped={flashcardIsFlipped}
      />
    );
  } else if (typeOfFlashcard === 'smart') {
    return (
      //@ts-ignore
      <Smartcard front={front} back={back} isFlipped={flashcardIsFlipped} />
    );
  } else {
    return <></>;
  }
};

export default ActiveFlashcard;
