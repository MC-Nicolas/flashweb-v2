export const removeSpecialChars = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

export const formatFromDateInSecondsToDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString('fr-fr');
};
