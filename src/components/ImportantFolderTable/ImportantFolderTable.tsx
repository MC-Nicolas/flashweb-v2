import React, { useEffect, useState } from 'react';
import { DeckType } from '@/types/folders';

import { useAppSelector } from '@/redux/redux.hooks';

import FlexContainer from '../FlexContainer/FlexContainer';
import FolderHeaderRow from './FolderHeaderRow';
import FolderRow from './FolderRow';

const ImportantFolderTable = () => {
  const { folders } = useAppSelector((state) => state.folders);
  const [importantDecks, setImportantDecks] = useState<null | DeckType[]>(null);

  // useEffect(() => {
  //   if (decks.length > 0) {
  //     const importantDecks = decks.filter((deck: DeckType) => deck.isImportant);
  //     setImportantDecks(importantDecks);
  //   }
  // }, [decks]);
  return (
    <FlexContainer>
      <FolderHeaderRow />
      {/* {importantDecks &&
        importantDecks.map((deck) => <FolderRow key={deck.id} deck={deck} />)} */}
    </FlexContainer>
  );
};

export default ImportantFolderTable;
