import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import StudySection from '@/components/StudySection/StudySection';
import StudySelectors from '@/components/StudySelectors/StudySelectors';
import SectionTitle from '@/components/Texts/SectionTitle';

type Props = {};

const StudyP = (props: Props) => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { activeFolder, foldersOptions, activeDeck, decksOptions, decks } =
    useAppSelector((state) => state.folders);

  const [deck, setDeck] = useState<any>(null);

  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (activeFolder && activeDeck && deck) {
      setFlashcards(deck.flashcards);
    }
  }, [deck]);

  useEffect(() => {
    if (query.folder && query.folder !== activeFolder) {
      dispatch(setActiveFolder(query.folder));
    }
    if (query.deck && query.deck !== activeDeck) {
      dispatch(setActiveDeck(query.deck));
    }
  }, [query]);

  useEffect(() => {
    if (activeFolder && activeDeck) {
      const deckData: any = decks.find((deck: any) => deck.id === activeDeck);
      if (activeDeck) {
        setDeck(deckData);
      }
    }
    // Might be possible with is first init use state
  }, [activeFolder, activeDeck]);

  return (
    <PageContainerWithNav pageTitle='GLP - Study'>
      <FlexContainer height='100px'>
        <SectionTitle title='Study' color='white' />
      </FlexContainer>
      {flashcards.length > 0 ? (
        <StudySection deck={deck} />
      ) : (
        <StudySelectors deck={deck} />
      )}
    </PageContainerWithNav>
  );
};

export default StudyP;
