import { DeckReviewType } from '@/types/folders';
import { addAnswersFromSameDay } from './dataFormatting';

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
    const avgSuccess = calculatePercentageFromTwoNumber(
      //@ts-ignore
      answers.right.length + answers.wrong.length,
      //@ts-ignore
      answers.right.length
    );
    // Format date with minutes and seconds
    const rawDate = new Date(date * 1000);
    const d = rawDate.toLocaleDateString('fr-fr');
    const minutesAndHours = `${rawDate.getHours()}:${rawDate.getMinutes()}`;
    const formattedDate = `${d} ${minutesAndHours}`;

    categories.push(formattedDate);
    series.push(avgSuccess);
  });
  return { series, categories };
};
