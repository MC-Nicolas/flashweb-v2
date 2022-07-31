import React, { useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import database from '@/database/firebase';
import { setFolders } from '@/redux/folders/FolderSlice';

const UserData = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);

  useEffect(() => {
    const unsub = onSnapshot(doc(database, 'users', email), (doc) => {
      const userFolders = doc.data();
      if (JSON.stringify(userFolders) !== '{}') {
        dispatch(setFolders(userFolders?.folders));
      }
    });
    return () => unsub();
  }, [email, dispatch]);

  return children;
};

export default UserData;
