import {
  addAnswersFromSameDay,
  calculateTimeFromSeconds,
  extractDataForFolderTable,
  findIndexOfFolder,
  formatFromDateInSecondsToDate,
  manageSingleNumber,
  removeSpecialChars,
  sortByDate,
} from '@/utils/dataFormatting';
import {
  allAnswersByDateNumber,
  allAnswersByDateString,
  expectedAnswersByDateNumber,
  expectedAnswersByDateString,
  expectedDataForFolderTable,
  state,
} from '@/utils/test/dataFormatting';

test('Should remove special chars from string', () => {
  let initialString = 'this is a test';
  expect(removeSpecialChars(initialString)).toBe('thisisatest');

  initialString = 'this is a test with special chars: !@#$%^&*()_+';
  expect(removeSpecialChars(initialString)).toBe('thisisatestwithspecialchars');
});

test('Should add answers from same day', () => {
  // TODO
});

test('Should format date from seconds to date', () => {
  expect(formatFromDateInSecondsToDate(1565168135)).toBe('07/08/2019');
  expect(formatFromDateInSecondsToDate(15651681351)).toBe('24/12/2465');
});

test('Should sort by date', () => {
  expect(sortByDate(allAnswersByDateString)).toEqual(
    expectedAnswersByDateString
  );

  expect(sortByDate(allAnswersByDateNumber)).toEqual(
    expectedAnswersByDateNumber
  );
});

test('Should extract data for folder table', () => {
  expect(extractDataForFolderTable(state.folders)).toEqual(
    expectedDataForFolderTable
  );
  expect(extractDataForFolderTable(state.folders, 'Math')).toEqual([
    expectedDataForFolderTable[0],
  ]);
});

test('Should extract data for deck table', () => {
  //  TODO extract data for deck table
});

test('Should extract all reviews from active folder ', () => {
  //  TODO extract all reviews from active folder
});

test('Should calculate time from seconds', () => {
  expect(calculateTimeFromSeconds(0)).toBe('00:00');
  expect(calculateTimeFromSeconds(60)).toBe('01:00');
  expect(calculateTimeFromSeconds(3600)).toBe('01:00:00');
  expect(calculateTimeFromSeconds(3600 + 60)).toBe('01:01:00');
  expect(calculateTimeFromSeconds(856)).toBe('14:16');
});

test('Should manage 0 on number', () => {
  expect(manageSingleNumber(12)).toBe('12');
  expect(manageSingleNumber(9, 'left')).toBe('09');
  expect(manageSingleNumber(5, 'right')).toBe('50');
});

test('should find Index of folder in folders', () => {
  const folders = state.folders;
  expect(findIndexOfFolder(folders, 'Math')).toBe(0);
  expect(findIndexOfFolder(folders, 'ppl')).toBe(1);
  expect(findIndexOfFolder(folders, 'NoFolder')).toBe(-1);
});
