import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import Decks from './Decks';
import Flashcards from './Flashcards';
import Folders from './Folders';

type StudiesContentProps = {
  contentType: string;
};

const StudiesContent = ({ contentType }: StudiesContentProps) => {
  return (
    <FlexContainer>
      {contentType === 'folders' && <Folders />}
      {contentType === 'decks' && <Decks />}
      {contentType === 'flashcards' && <Flashcards />}
    </FlexContainer>
  );
};

export default StudiesContent;
