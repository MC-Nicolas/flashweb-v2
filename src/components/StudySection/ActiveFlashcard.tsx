import { useAppSelector } from '@/redux/redux.hooks';
import { FlashcardType } from '@/types/folders';
import ClassicFlashcard from '../Flashcard/Classic';

const ActiveFlashcard = ({
  index,
  flashcards,
}: {
  index: number;
  flashcards: FlashcardType[];
}) => {
  const { flashcardIsFlipped } = useAppSelector((state) => state.study);
  const { typeOfFlashcard, flashcardData } = flashcards[index];
  const { front, back } = flashcardData;
  if (typeOfFlashcard === 'classic') {
    return (
      <ClassicFlashcard
        front={front}
        back={back}
        isFlipped={flashcardIsFlipped}
      />
    );
  } else {
    return <></>;
  }
};

export default ActiveFlashcard;
