import React, { useEffect, useState } from 'react';
import { shuffleFlashcards } from '@/utils/shuffle';

import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
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
  setTypeOfFlashcardBeingStudied,
} from '@/redux/study/StudySlice';
import { DoneAll } from '@mui/icons-material';
import { variablesWithIdType } from '@/types/smartCard';
import { removeSpecialChars } from '@/utils/dataFormatting';
import FlipFlashcardButton from './components/FlipFlashcardButton/FlipFlashcardButton';
import MistakeSuccessButtons from './components/MistakeSuccessButtons/MistakeSuccessButtons';
import NextButton from './components/NextButton/NextButton';

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
  const [renderFlashcard, setRenderFlashcard] = useState(false);
  const [typeOfFlipButton, setTypeOfFlipButton] = useState<null | String>(null);

  const { flashcards } = deck;

  useEffect(() => {
    if (flashcardIsFlipped) {
      if (
        typeOfFlashcardBeingStudied === 'smart' ||
        typeOfFlashcardBeingStudied === 'mcq'
      ) {
        return setTypeOfFlipButton('Next');
      } else {
        return setTypeOfFlipButton('mistakeSuccess');
      }
    }
    if (!shuffledFlashcards || shuffledFlashcards?.length <= usedOrders.length)
      return setTypeOfFlipButton(null);

    if (typeOfFlashcardBeingStudied === 'classic') {
      setTypeOfFlipButton('DoneAll');
    } else if (
      typeOfFlashcardBeingStudied === 'mcq' ||
      typeOfFlashcardBeingStudied === 'smart'
    ) {
      setTypeOfFlipButton('SwapHoriz');
    } else if (typeOfFlashcardBeingStudied === 'classic') {
      setTypeOfFlipButton('mistakeSuccess');
    }
  }, [
    flashcardIsFlipped,
    shuffledFlashcards,
    usedOrders,
    typeOfFlashcardBeingStudied,
  ]);

  useEffect(() => {
    if (!shuffledFlashcards) return setRenderFlashcard(false);
    if (shuffledFlashcards?.length > usedOrders.length) {
      setRenderFlashcard(true);
    } else {
      setRenderFlashcard(false);
    }
  }, [shuffledFlashcards, usedOrders]);

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
      // if the next is not of type 'classic', dont use setimeout
      setUsedOrders([...usedOrders, order]);
      setOrder(order + 1);
    }, 225);
  };

  return (
    <InsetNeumorphicContainer width='80%' height='80vh'>
      <StudyDeckInfo />
      <FlexContainer height='70%'>
        {renderFlashcard && (
          <ActiveFlashcard index={order} flashcards={shuffledFlashcards} />
        )}
      </FlexContainer>
      <FlexContainer height='20%'>
        {flashcardIsFlipped && typeOfFlipButton === 'mistakeSuccess' && (
          <MistakeSuccessButtons
            shuffledFlashcards={shuffledFlashcards}
            order={order}
            handleOnAnswerClick={handleOnAnswerClick}
          />
        )}
        {flashcardIsFlipped && typeOfFlipButton === 'Next' && (
          <NextButton
            shuffledFlashcards={shuffledFlashcards}
            order={order}
            handleOnAnswerClick={handleOnAnswerClick}
          />
        )}
        {!flashcardIsFlipped && typeOfFlipButton === 'DoneAll' && (
          <FlipFlashcardButton icon='DoneAll' />
        )}
        {!flashcardIsFlipped && typeOfFlipButton === 'SwapHoriz' && (
          <FlipFlashcardButton icon='SwapHoriz' />
        )}
      </FlexContainer>
    </InsetNeumorphicContainer>
  );
};

export default StudySection;
