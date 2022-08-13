export const foldersDataForTable = [
  {
    id: 'math',
    title: 'Math',
    decks: [],
  },
];

export const createRandomNumberWithMinMax = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
