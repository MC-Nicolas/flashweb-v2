import { deepCopy } from '@firebase/util';

export const shuffleFlashcards = (
  flashcards: { front: string; back: any }[]
) => {
  const usedOrders: number[] = [];
  let shuffledFlashcards: any = deepCopy(flashcards);

  for (let i = 0; i < shuffledFlashcards.length; i++) {
    let randomIndex = Math.floor(Math.random() * flashcards.length);
    while (usedOrders.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    }
    shuffledFlashcards[i] = {
      ...flashcards[randomIndex],
      order: i,
    };

    usedOrders.push(randomIndex);
  }
  return shuffledFlashcards;
};
