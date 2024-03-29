import { DeckReviewType } from '@/types/folders';
import {
  addAnswersFromSameDay,
  formatFromDateInSecondsToDate,
  manageSingleNumber,
} from './dataFormatting';

export const calculatePercentageFromTwoNumber = (
  total: number,
  part: number
) => {
  const result = Math.round((part / total) * 100);
  if (result.toString() === 'NaN') return 0;
  return Math.round((part / total) * 100);
};

export const calculateSeriesForChartFromAllReviews = (allReviews: any[]) => {
  const seriesData: number[] = [];
  let categories: string[] = [];

  let groupedReviewsByDay = addAnswersFromSameDay(allReviews);

  groupedReviewsByDay.map((review) => {
    const avgSuccess = calculatePercentageFromTwoNumber(
      review.rightAnswerCount + review.wrongAnswerCount,
      review.rightAnswerCount
    );

    seriesData.push(avgSuccess);
    categories.push(review.date);
  });

  return { seriesData, categories };
};

export const calculateSeriesForChartForEachDay = (
  reviews: DeckReviewType[]
) => {
  let series: number[] = [];
  let categories: string[] = [];

  reviews.map((review) => {
    const { answers, date, timeSpent } = review;
    if (answers) {
      const avgSuccess = calculatePercentageFromTwoNumber(
        answers.right.length + answers.wrong.length,
        answers.right.length
      );
      const formattedDate = createDateWithTimeFromSeconds(date);

      categories.push(formattedDate);
      series.push(avgSuccess);
    }
  });
  return { series, categories };
};

export const createDateWithTimeFromSeconds = (seconds: number) => {
  const d = new Date(seconds * 1000);
  return `${formatFromDateInSecondsToDate(seconds)} ${manageSingleNumber(
    d.getHours(),
    'left'
  )}:${manageSingleNumber(d.getMinutes(), 'right')}`;
};

export const calculateFromTwoOpsAndOperator = (
  op1: number,
  op2: number,
  operator: string,
  rounded?: boolean,
  roundNumber?: number
) => {
  const firstOp = op1 * 1;
  const secondOp = op2 * 1;
  let result = 0;
  switch (operator) {
    case '+':
      result = firstOp + secondOp;
      break;
    case '-':
      result = firstOp - secondOp;
      break;
    case '*':
      result = firstOp * secondOp;
      break;
    case '/':
      result = firstOp / secondOp;
      break;
    case 'sin (°)':
      result = Math.sin((firstOp * Math.PI) / 180);
      break;
    case 'cos (°)':
      result = Math.cos((firstOp * Math.PI) / 180);
      break;
    case 'tan':
      result = Math.tan(firstOp);
      break;
  }
  if (rounded !== undefined && rounded) {
    return result.toFixed(roundNumber);
  }
  return result;
};
