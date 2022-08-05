import {
  formatFromDateInSecondsToDate,
  removeSpecialChars,
} from '@/utils/dataFormatting';

test('Should remove special chars from string', () => {
  let initialString = 'this is a test';
  expect(removeSpecialChars(initialString)).toBe('thisisatest');

  initialString = 'this is a test with special chars: !@#$%^&*()_+';
  expect(removeSpecialChars(initialString)).toBe('thisisatestwithspecialchars');
});

test('Should format date from seconds to date', () => {
  let initialDate = 1565168135;
  expect(formatFromDateInSecondsToDate(initialDate)).toBe('07/08/2019');
  initialDate = 15651681351;
  expect(formatFromDateInSecondsToDate(initialDate)).toBe('24/12/2465');
});
