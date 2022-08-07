import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import Decks from './Decks';
import Folders from './Folders';

type StudiesContentProps = {
  contentType: string;
};

const StudiesContent = ({ contentType }: StudiesContentProps) => {
  return (
    <FlexContainer>
      {contentType === 'folders' && <Folders />}
      {contentType === 'decks' && <Decks />}
    </FlexContainer>
  );
};

export default StudiesContent;
