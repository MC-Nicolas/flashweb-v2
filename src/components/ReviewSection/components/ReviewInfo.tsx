import React from 'react';
import { useAppSelector } from '@/redux/redux.hooks';

import FlexContainer from '@/components/FlexContainer/FlexContainer';

import { calculatePercentageFromTwoNumber } from '@/utils/calculations';

const ReviewInfo = () => {
  const { flashcards, totalAnswers, answers, timeSpent } = useAppSelector(
    (state) => state.study
  );

  return (
    <FlexContainer
      height='50%'
      width='80%'
      justifyContent='center'
      alignItems='center'
    >
      <FlexContainer height='150px'>
        <p style={{ color: 'white' }}>{`Total answers: ${totalAnswers}`}</p>
        <p style={{ color: 'white' }}>{`Time spent: ${timeSpent}`}</p>
        <FlexContainer>
          <h1 style={{ color: 'white' }}>
            Total success:{' '}
            {calculatePercentageFromTwoNumber(
              flashcards.length,
              answers.right.length
            )}
            %
          </h1>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default ReviewInfo;
