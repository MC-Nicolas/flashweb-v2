import { removeSpecialChars } from '@/utils/dataFormatting';

test('Should remove special chars from string', () => {
  let initialString = 'this is a test';
  expect(removeSpecialChars(initialString)).toBe('thisisatest');

  initialString = 'this is a test with special chars: !@#$%^&*()_+';
  expect(removeSpecialChars(initialString)).toBe('thisisatestwithspecialchars');
});
