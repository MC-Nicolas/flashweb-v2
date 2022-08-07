export const calculatePercentageFromTwoNumber = (
  total: number,
  part: number
) => {
  const result = Math.round((part / total) * 100);
  if (result.toString() === 'NaN') return 0;
  return Math.round((part / total) * 100);
};
