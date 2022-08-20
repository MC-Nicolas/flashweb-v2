import { useAppSelector } from '@/redux/redux.hooks';
import { variablesWithIdType } from '@/types/smartCard';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { Button } from '@mui/material';
import React from 'react';

type NextButtonProps = {
  shuffledFlashcards: any;
  order: number;
  handleOnAnswerClick: any;
};

const NextButton = ({
  shuffledFlashcards,
  order,
  handleOnAnswerClick,
}: NextButtonProps) => {
  const { typeOfFlashcardBeingStudied, answerIsSuccess } = useAppSelector(
    (state) => state.study
  );

  return (
    <>
      <Button
        variant='contained'
        color='success'
        onClick={() => {
          if (typeOfFlashcardBeingStudied === 'smart') {
            const results = shuffledFlashcards[
              order
            ].flashcardData.front.variables.filter(
              (variable: variablesWithIdType) => variable.type === 'result'
            );
            const flashcardTitle = `${removeSpecialChars(
              results[results.length - 1].name
            ).toLowerCase()}`;
            handleOnAnswerClick(flashcardTitle, answerIsSuccess);
          } else if (typeOfFlashcardBeingStudied === 'mcq') {
            handleOnAnswerClick(
              shuffledFlashcards[order].flashcardData.front,
              answerIsSuccess
            );
          }
        }}
      >
        Next
      </Button>
    </>
  );
};

export default NextButton;
