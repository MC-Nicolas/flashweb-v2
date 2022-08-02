import React, { useEffect, useState } from 'react';
import { shuffleFlashcards } from '@/utils/shuffle';

import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import ClassicFlashcard from '../Flashcard/Classic';
import FlexContainer from '../FlexContainer/FlexContainer';
import StudyDeckInfo from '../StudyDeckInfo/StudyDeckInfo';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { Button } from '@mui/material';

type StudySectionProps = {
  deck: any;
};

const StudySection = ({ deck }: StudySectionProps) => {
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [flashcardIsFlipped, setFlashcardIsFlipped] = useState(false);
  const [shuffledFlashcards, setshuffledFlashcards] = useState<any>(null);
  const [usedOrders, setUsedOrders] = useState<any>([]);
  const [order, setOrder] = useState(0);

  const { flashcards } = deck;

  useEffect(() => {
    setshuffledFlashcards(shuffleFlashcards(flashcards));
  }, [flashcards]);

  const ActiveFlashcard = ({ index }: { index: number }) => {
    const { typeOfFlashcard, flashcardData } = shuffledFlashcards[index];
    const { front, back } = flashcardData;
    if (typeOfFlashcard === 'classic') {
      return (
        <ClassicFlashcard
          front={front}
          back={back}
          isFlipped={flashcardIsFlipped}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <InsetNeumorphicContainer width='80%' height='80vh'>
      <StudyDeckInfo deck={deck} cardsDone={usedOrders} />
      <FlexContainer height='70%'>
        {shuffledFlashcards &&
          shuffledFlashcards.length > usedOrders.length && (
            <ActiveFlashcard index={order} />
          )}
      </FlexContainer>
      <FlexContainer height='20%'>
        {flashcardIsFlipped && shuffledFlashcards.length > usedOrders.length && (
          <>
            <Button
              variant='contained'
              color='error'
              onClick={() => {
                setFlashcardIsFlipped(false);
                setUsedOrders([...usedOrders, order]);
                setOrder(order + 1);
              }}
            >
              Mistake
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={() => {
                setFlashcardIsFlipped(false);
                setUsedOrders([...usedOrders, order]);
                setOrder(order + 1);
              }}
            >
              Success
            </Button>
          </>
        )}
        {!flashcardIsFlipped &&
          shuffledFlashcards &&
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
              onClick={() => setFlashcardIsFlipped(true)}
            />
          )}

        {/* SHow Results */}
      </FlexContainer>
    </InsetNeumorphicContainer>
  );
};

export default StudySection;
