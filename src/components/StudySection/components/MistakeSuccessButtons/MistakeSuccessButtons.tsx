import { Button } from '@mui/material';
import React from 'react';

type MistakeSuccessButtonsProps = {
  handleOnAnswerClick: any;
  shuffledFlashcards: any;
  order: number;
};

const MistakeSuccessButtons = ({
  shuffledFlashcards,
  order,
  handleOnAnswerClick,
}: MistakeSuccessButtonsProps) => {
  return (
    <>
      <Button
        variant='contained'
        color='error'
        onClick={() =>
          handleOnAnswerClick(
            shuffledFlashcards[order].flashcardData.front,
            false
          )
        }
      >
        Mistake
      </Button>
      <Button
        variant='contained'
        color='success'
        onClick={() =>
          handleOnAnswerClick(
            shuffledFlashcards[order].flashcardData.front,
            true
          )
        }
      >
        Success
      </Button>
    </>
  );
};

export default MistakeSuccessButtons;
