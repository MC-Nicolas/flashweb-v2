import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setActiveDeck,
  setActiveFolder,
  setDecksOptions,
  setFolders,
  setFoldersOptions,
} from '@/redux/folders/FolderSlice';
import {
  getDecksFromDB,
  getFlashcardsForDeck,
  getFoldersFromDB,
} from '@/database/folders';
import {
  transformDecksFromDBToOptions,
  transformFoldersFromDBToOptions,
  transformFromDatabaseToReduxFolders,
} from '@/utils/foldersFormatting';
import { DeckType } from '@/types/folders';

const UserData = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const { email, isUserAuthenticated } = useAppSelector((state) => state.user);
  const [folders, setFoldersDB] = useState<{ id: string; title: string }[]>([]);
  const [decks, setDecks] = useState<DeckType[]>([]);

  const getUserData = async () => {
    const foldersFromDB = await getFoldersFromDB(email);
    let decksFromDB = await getDecksFromDB(email, foldersFromDB);

    if (decksFromDB.length > 0) {
      decksFromDB.map(async (deck: DeckType, i: number) => {
        let flashcards = await getFlashcardsForDeck(
          email,
          deck.folderId,
          deck.id
        );

        if (flashcards.length > 0) {
          decksFromDB[i].flashcards = flashcards;
        }

        setDecks(decksFromDB);
      });
    }
    if (foldersFromDB.length > 0) {
      setFoldersDB(foldersFromDB);
    }
  };

  useEffect(() => {
    if (!isUserAuthenticated || folders.length === 0) return;

    const foldersForRedux: any = transformFromDatabaseToReduxFolders(
      folders,
      decks
    );

    const foldersOptions = transformFoldersFromDBToOptions(folders);
    const decksOptions = transformDecksFromDBToOptions(decks);

    dispatch(setFolders(foldersForRedux));
    dispatch(setFoldersOptions(foldersOptions));
    dispatch(setDecksOptions(decksOptions));

    if (folders.length > 0) dispatch(setActiveFolder(folders[0].id));
    if (decks.length > 0) dispatch(setActiveDeck(decks[0].id));
  }, [isUserAuthenticated, folders, decks, dispatch]);

  useEffect(() => {
    if (!isUserAuthenticated) return;
    getUserData();
  }, [email, isUserAuthenticated]);

  return children;
};

export default UserData;
