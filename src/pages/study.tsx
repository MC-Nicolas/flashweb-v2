import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setActiveDeck,
  setActiveFolder,
  setDecksOptions,
} from '@/redux/folders/FolderSlice';
import { setDeck, setFlashcards } from '@/redux/study/StudySlice';

import StudySection from '@/components/StudySection/StudySection';
import StudySelectors from '@/components/StudySelectors/StudySelectors';
import { studySections } from '@/redux/study/StudySections';
import ReviewSection from '@/components/ReviewSection/ReviewSection';
import { getDeckData } from '@/utils/getData';
import PageContainerWithNavAndTitle from '@/components/Containers/PageContainerWithNavAndTitle/PageContainerWithNavAndTitle';

const Study = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { studyIsActive, deck, flashcards, studySection } = useAppSelector(
    (state) => state.study
  );
  const { folders, activeFolder, foldersOptions, activeDeck, decksOptions } =
    useAppSelector((state) => state.folders);

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (studyIsActive && flashcards.length && deck) {
      setActiveSection('study');
    } else setActiveSection('selectors');
  }, [flashcards, studyIsActive, deck]);

  useEffect(() => {
    if (query.folder && query.folder !== activeFolder) {
      dispatch(setActiveFolder(query.folder));
    }
    if (query.deck && query.deck !== activeDeck) {
      dispatch(setActiveDeck(query.deck));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (activeFolder && activeDeck) {
      const deckData = getDeckData(folders, activeFolder, activeDeck);

      if (deckData) {
        dispatch(setDeck(deckData));
        dispatch(setFlashcards(deckData.flashcards));
      } else {
        dispatch(setDecksOptions([]));
        dispatch(setFlashcards([]));
      }
    }
  }, [folders, activeFolder, activeDeck, dispatch]);

  return (
    <PageContainerWithNavAndTitle tabTitle='GLP - Study' pageTitle='Study'>
      {(activeSection === 'emptyDeck' || activeSection === 'selectors') && (
        <StudySelectors />
      )}
      {activeSection === 'study' &&
        (studySection === studySections.STUDY ? (
          <StudySection deck={deck} />
        ) : (
          <ReviewSection />
        ))}
    </PageContainerWithNavAndTitle>
  );
};

export default Study;
