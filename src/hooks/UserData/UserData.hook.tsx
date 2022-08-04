import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setActiveDeck,
  setActiveFolder,
  setDecksOptions,
  setFolders,
  setFoldersOptions,
} from '@/redux/folders/FolderSlice';
import { getDecksFromDB, getFoldersFromDB } from '@/database/folders';
import {
  transformDecksFromDBToOptions,
  transformFoldersFromDBToOptions,
  transformFromDatabaseToReduxFolders,
} from '@/utils/foldersFormatting';

const UserData = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const { email, isUserAuthenticated } = useAppSelector((state) => state.user);

  const getUserData = async () => {
    const foldersFromDB = await getFoldersFromDB(email);
    const decksFromDB = await getDecksFromDB(email, foldersFromDB);
    const foldersForRedux = transformFromDatabaseToReduxFolders(
      foldersFromDB,
      decksFromDB
    );

    const foldersOptions = transformFoldersFromDBToOptions(foldersFromDB);
    const decksOptions = transformDecksFromDBToOptions(decksFromDB);

    dispatch(setFolders(foldersForRedux));

    dispatch(setFoldersOptions(foldersOptions));
    dispatch(setDecksOptions(decksOptions));

    if (foldersFromDB.length > 0) {
      dispatch(setActiveFolder(foldersFromDB[0].id));
    }
    if (decksFromDB.length > 0) {
      dispatch(setActiveDeck(decksFromDB[0].id));
    }
  };

  useEffect(() => {
    if (!isUserAuthenticated) return;

    getUserData();
  }, [email, dispatch, isUserAuthenticated]);

  return children;
};

export default UserData;
