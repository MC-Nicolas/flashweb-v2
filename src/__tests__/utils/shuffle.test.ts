import { shuffleFlashcards } from '@/utils/shuffle';

test('Should shuffle flashcards', () => {
  const flashcards = [
    { order: 1, front: 'front1', back: 'back1' },
    { order: 2, front: 'front2', back: 'back2' },
    { order: 3, front: 'front3', back: 'back3' },
    { order: 4, front: 'front4', back: 'back4' },
    { order: 5, front: 'front5', back: 'back5' },
  ];

  const shuffledFlashcards = shuffleFlashcards(flashcards);

  expect(shuffledFlashcards).not.toEqual(flashcards);
});
