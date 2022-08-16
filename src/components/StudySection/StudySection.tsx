import React, { useEffect, useState } from 'react';
import { shuffleFlashcards } from '@/utils/shuffle';

import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import ClassicFlashcard from '../Flashcard/Classic';
import FlexContainer from '../FlexContainer/FlexContainer';
import StudyDeckInfo from '../StudyDeckInfo/StudyDeckInfo';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { Button } from '@mui/material';
import ActiveFlashcard from './ActiveFlashcard';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addRightAnswer,
  addWrongAnswer,
  setFlashcardIsFlipped,
} from '@/redux/study/StudySlice';
import { DoneAll } from '@mui/icons-material';
import { variablesWithIdType } from '@/types/smartCard';
import { deepCopy, removeSpecialChars } from '@/utils/dataFormatting';

type StudySectionProps = {
  deck: any;
};

const StudySection = ({ deck }: StudySectionProps) => {
  const dispatch = useAppDispatch();
  const { flashcardIsFlipped, typeOfFlashcardBeingStudied, answerIsSuccess } =
    useAppSelector((state) => state.study);
  const [shuffledFlashcards, setShuffledFlashcards] = useState<any>(null);
  const [usedOrders, setUsedOrders] = useState<any>([]);
  const [order, setOrder] = useState(0);

  const { flashcards } = deck;

  useEffect(() => {
    if (flashcards.length > 0) {
      const shuffled = shuffleFlashcards(flashcards);
      setShuffledFlashcards(shuffled);
    }
  }, [flashcards]);

  const handleOnAnswerClick = (flashcardFront: string, isRight: boolean) => {
    if (isRight) dispatch(addRightAnswer(flashcardFront));
    if (!isRight) dispatch(addWrongAnswer(flashcardFront));
    dispatch(setFlashcardIsFlipped(false));
    setTimeout(() => {
      setUsedOrders([...usedOrders, order]);
      setOrder(order + 1);
    }, 225);
  };

  return (
    <InsetNeumorphicContainer width='80%' height='80vh'>
      <StudyDeckInfo />
      <FlexContainer height='70%'>
        {shuffledFlashcards &&
          shuffledFlashcards?.length > usedOrders.length && (
            <ActiveFlashcard index={order} flashcards={shuffledFlashcards} />
          )}
      </FlexContainer>
      <FlexContainer height='20%'>
        {flashcardIsFlipped &&
          shuffledFlashcards?.length > usedOrders.length &&
          typeOfFlashcardBeingStudied !== 'smart' &&
          typeOfFlashcardBeingStudied !== 'mcq' && (
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
          )}
        {flashcardIsFlipped &&
          shuffledFlashcards?.length > usedOrders.length &&
          typeOfFlashcardBeingStudied !== 'classic' && (
            <>
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  if (typeOfFlashcardBeingStudied === 'smart') {
                    const results = shuffledFlashcards[
                      order
                    ].flashcardData.front.variables.filter(
                      (variable: variablesWithIdType) =>
                        variable.type === 'result'
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
          )}
        {!flashcardIsFlipped &&
          shuffledFlashcards &&
          typeOfFlashcardBeingStudied === 'classic' &&
          shuffledFlashcards.length > usedOrders.length && (
            <ButtonWithIcon
              style={{
                backgroundColor: 'white',
                color: 'black',
                width: '150px',
              }}
              title='Flip'
              iconPosition='right'
              iconIsComponent
              icon={<SwapHorizIcon />}
              onClick={() => dispatch(setFlashcardIsFlipped(true))}
            />
          )}
        {!flashcardIsFlipped &&
          shuffledFlashcards &&
          (typeOfFlashcardBeingStudied === 'smart' ||
            typeOfFlashcardBeingStudied === 'mcq') &&
          shuffledFlashcards.length > usedOrders.length && (
            <ButtonWithIcon
              style={{
                backgroundColor: 'white',
                color: 'black',
                width: '150px',
              }}
              title='Check'
              iconPosition='right'
              iconIsComponent
              icon={<DoneAll />}
              onClick={() => dispatch(setFlashcardIsFlipped(true))}
            />
          )}
      </FlexContainer>
    </InsetNeumorphicContainer>
  );
};

export default StudySection;
