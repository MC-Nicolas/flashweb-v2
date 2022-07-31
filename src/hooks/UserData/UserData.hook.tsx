import React, { useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import database from '@/database/firebase';
import { setFolders } from '@/redux/folders/FolderSlice';

const UserData = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const { email, isUserAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isUserAuthenticated) return;
    const unsub = onSnapshot(doc(database, 'users', email), (doc) => {
      const userFolders = doc.data();
      if (JSON.stringify(userFolders) !== '{}') {
        dispatch(setFolders(userFolders?.folders));
      }
    });
    return () => unsub();
  }, [email, dispatch, isUserAuthenticated]);

  return children;
};

export default UserData;
