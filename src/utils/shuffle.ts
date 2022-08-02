export const shuffleFlashcards = (
  flashcards: { front: string; back: any }[]
) => {
  const usedOrders: number[] = [];
  let shuffledFlashcards: { front: string; back: any; order: number }[] = [];

  // give a random order to each flashcard and make sure it's not already used
  for (let i = 0; i < flashcards.length; i++) {
    shuffledFlashcards.push({
      ...flashcards[i],
      order: i,
    });
  }

  // shuffle the flashcards
  for (let i = 0; i < flashcards.length; i++) {
    let randomIndex = Math.floor(Math.random() * flashcards.length);

    while (usedOrders.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    }

    usedOrders.push(randomIndex);
    shuffledFlashcards[i] = {
      ...shuffledFlashcards[randomIndex],
      order: i,
    };
  }

  return shuffledFlashcards;
};
