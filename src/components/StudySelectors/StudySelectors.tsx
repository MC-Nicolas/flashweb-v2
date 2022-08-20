import React from 'react';

import { useAppSelector } from '@/redux/redux.hooks';

import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';
import Selectors from './components/Selectors/Selectors';
import StartStudyButton from './components/StartStudyButton/StartStudyButton';
import EmptyDeck from './components/EmptyDeck/EmptyDeck';
import EmptyFolder from './components/EmptyFolder/EmptyFolder';

const StudySelectors = () => {
  const { flashcards } = useAppSelector((state) => state.study);
  const { decksOptions } = useAppSelector((state) => state.folders);

  return (
    <InsetNeumorphicContainer width='80%' height='80vh'>
      <Selectors />
      <FlexContainer height='80%'>
        {decksOptions.length === 0 && <EmptyFolder />}
        {decksOptions.length > 0 &&
          (!flashcards || !flashcards.length || flashcards.length === 0) && (
            <EmptyDeck />
          )}
        {flashcards && flashcards.length > 0 && <StartStudyButton />}
      </FlexContainer>
    </InsetNeumorphicContainer>
  );
};

export default StudySelectors;
