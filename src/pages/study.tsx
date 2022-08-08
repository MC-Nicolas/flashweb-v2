import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { setDeck, setFlashcards } from '@/redux/study/StudySlice';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import StudySection from '@/components/StudySection/StudySection';
import StudySelectors from '@/components/StudySelectors/StudySelectors';
import SectionTitle from '@/components/Texts/SectionTitle';
import { DeckType } from '@/types/folders';
import { findIndexOfFolder, removeSpecialChars } from '@/utils/dataFormatting';
import { studySections } from '@/redux/study/StudySections';
import ReviewSection from '@/components/ReviewSection/ReviewSection';
import { getDeckData } from '@/utils/getData';

const Study = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { studyIsActive, deck, flashcards, studySection } = useAppSelector(
    (state) => state.study
  );
  const { folders, activeFolder, foldersOptions, activeDeck, decksOptions } =
    useAppSelector((state) => state.folders);

  useEffect(() => {
    if (query.folder && query.folder !== activeFolder) {
      dispatch(setActiveFolder(query.folder));
    }
    if (query.deck && query.deck !== activeDeck) {
      dispatch(setActiveDeck(query.deck));
    }
  });

  useEffect(() => {
    if (activeFolder && activeDeck) {
      const deckData = getDeckData(folders, activeFolder, activeDeck);
      if (deckData) {
        dispatch(setDeck(deckData));
        dispatch(setFlashcards(deckData.flashcards));
      }
    }
  }, [folders, activeFolder, activeDeck, dispatch]);

  return (
    <PageContainerWithNav pageTitle='GLP - Study'>
      <FlexContainer height='100px'>
        <SectionTitle title='Study' color='white' />
      </FlexContainer>
      {studyIsActive && flashcards.length && deck ? (
        studySection === studySections.STUDY ? (
          <StudySection deck={deck} />
        ) : (
          <ReviewSection />
        )
      ) : (
        <StudySelectors />
      )}
    </PageContainerWithNav>
  );
};

export default Study;
