import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

type StudyDeckInfoProps = {
  deck: any;
  cardsDone: number[];
};

const StudyDeckInfo = ({ deck, cardsDone }: StudyDeckInfoProps) => {
  const { flashcards } = deck;
  return (
    <FlexContainer height='100px'>
      <p style={{ color: 'white' }}>
        Done: {cardsDone.length}/{flashcards.length}
      </p>
    </FlexContainer>
  );
};

export default StudyDeckInfo;
