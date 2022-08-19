export const foldersDataForTable = [
  {
    id: 'math',
    title: 'Math',
    decks: [],
  },
];

export const createRandomNumberWithMinMax = (
  min: string | number,
  max: string | number
) => {
  if (typeof min === 'string') {
    min = parseInt(min);
  }
  if (typeof max === 'string') {
    max = parseInt(max);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomId = (): string => {
  const randomNumber = createRandomNumberWithMinMax(1, 100000);
  return `${randomNumber}-${randomNumber}-${randomNumber}`;
};

export const fromStringToBoolean = (string: string): boolean => {
  return string === 'true';
};
