import {
  addAnswersFromSameDay,
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

test('Should add answers from same day', () => {
  let allAnswers = [
    {
      answers: {
        wrong: [],
        right: ['dfrghjklm'],
      },
      date: 1659713645,
      timeSpent: 5,
    },
    {
      answers: {
        right: [],
        wrong: ['dfrghjklm'],
      },
      date: 1659713997,
      timeSpent: 1,
    },
    {
      answers: {
        right: ['aqsrhqdf'],
        wrong: [],
      },
      date: 1659714002,
      timeSpent: 1,
    },
  ];
  const expectedAllAnswers = [
    {
      date: '05/08/2022',
      answers: { right: ['dfrghjklm', 'aqsrhqdf'], wrong: ['dfrghjklm'] },
      timeSpent: 7,
    },
  ];
  //@ts-ignore
  expect(addAnswersFromSameDay(allAnswers)).toEqual(expectedAllAnswers);
});
