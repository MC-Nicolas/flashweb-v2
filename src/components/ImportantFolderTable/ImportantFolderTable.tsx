import React, { useEffect, useState } from 'react';
import { DeckType } from '@/types/folders';

import { useAppSelector } from '@/redux/redux.hooks';

import FlexContainer from '../FlexContainer/FlexContainer';
import FolderHeaderRow from './FolderHeaderRow';
import FolderRow from './FolderRow';

const ImportantFolderTable = () => {
  const { folders } = useAppSelector((state) => state.folders);
  const [importantDecks, setImportantDecks] = useState<DeckType[]>([]);

  useEffect(() => {
    // for each folder, check for important deck inside and setImportantDecks
    const importantDecks: DeckType[] = folders.reduce((acc: any, folder) => {
      const importantDeck: DeckType | undefined = folder.decks.find(
        (deck) => deck.isImportant
      );
      if (importantDeck) {
        acc.push(importantDeck);
      }
      return acc;
    }, []);
    setImportantDecks(importantDecks);
  }, [folders]);
  return (
    <FlexContainer>
      <FolderHeaderRow />
      {importantDecks.length > 0 &&
        importantDecks.map((deck) => <FolderRow key={deck.id} deck={deck} />)}
    </FlexContainer>
  );
};

export default ImportantFolderTable;
