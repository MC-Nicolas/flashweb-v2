import {
  calculatePercentageFromTwoNumber,
  createDateWithTimeFromSeconds,
} from '@/utils/calculations';

test('Should calculatePercentage From two numbers', () => {
  expect(calculatePercentageFromTwoNumber(100, 10)).toBe(10);
  expect(calculatePercentageFromTwoNumber(100, 0)).toBe(0);
  expect(calculatePercentageFromTwoNumber(100, 100)).toBe(100);
  expect(calculatePercentageFromTwoNumber(100, 50)).toBe(50);
});

test('Should create Date with time from seconds', () => {
  expect(createDateWithTimeFromSeconds(1659979181)).toBe('08/08/2022 19:19');
  expect(createDateWithTimeFromSeconds(0)).toBe('01/01/1970 01:00');
  expect(createDateWithTimeFromSeconds(1655481053)).toBe('17/06/2022 17:50');
  expect(createDateWithTimeFromSeconds(1659981269)).toBe('08/08/2022 19:54');
  expect(createDateWithTimeFromSeconds(1755481053)).toBe('18/08/2025 03:37');
  expect(createDateWithTimeFromSeconds(17554810)).toBe('23/07/1970 05:20');
});
