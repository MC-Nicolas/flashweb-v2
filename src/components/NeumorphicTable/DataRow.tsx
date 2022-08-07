import React from 'react';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { removeDeck, removeFolder } from '@/redux/folders/FolderSlice';

import toast from 'react-hot-toast';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { deleteDeckFromDB, deleteFolderFromDB } from '@/database/deleteInDB';
import { removeSpecialChars } from '@/utils/dataFormatting';

import styles from './NeumorphicTable.module.scss';
import {
  setModalIsOpen,
  setNameOfElementToEdit,
  setTypeOfElementToEdit,
} from '@/redux/editModal/editModalSlice';

type DataRowProps = {
  element: string[];
};

const DataRow = ({ element }: DataRowProps) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { activeFolder } = useAppSelector((state) => state.folders);

  const handleDeleteEl = async (el: string) => {
    if (el === 'Edit folder') {
      const confirm = window.confirm(
        'Are you sure you want to delete this folder and its data ?'
      );
      if (confirm) {
        const { error, success } = await deleteFolderFromDB(
          email,
          removeSpecialChars(element[0])
        );
        if (success) {
          dispatch(removeFolder(element[0]));
          toast.success('Folder deleted successfully');
        } else {
          toast.error(error);
        }
      }
    } else if (el === 'Edit deck') {
      const confirm = window.confirm(
        'Are you sure you want to delete this deck and its data ?'
      );
      if (confirm) {
        const { error, success } = await deleteDeckFromDB(
          email,
          removeSpecialChars(activeFolder),
          removeSpecialChars(element[0])
        );
        if (success) {
          dispatch(
            removeDeck({
              deckId: removeSpecialChars(element[0]),
              folderId: removeSpecialChars(activeFolder),
            })
          );
          toast.success('Deck deleted successfully');
        } else {
          toast.error('An error occured while deleting the deck');
        }
      }
    }
  };

  return (
    <div className={styles.folderRow}>
      {element.map((el) => {
        if (el === 'Edit folder' || el === 'Edit deck') {
          return (
            <div key={Math.random() * 10000} className={styles.editIcons}>
              <EditIcon
                sx={{ color: '#358004', cursor: 'pointer' }}
                onClick={() => {
                  dispatch(setModalIsOpen(true));
                  dispatch(setTypeOfElementToEdit('folder'));
                  dispatch(setNameOfElementToEdit(element[0]));
                }}
              />
              <DeleteForeverIcon
                sx={{ color: '#d11515', cursor: 'pointer' }}
                onClick={() => handleDeleteEl(el)}
              />
            </div>
          );
        } else if (el === 'Chart') {
          return (
            <div key={Math.random() * 100000}>
              <Link href='/'>
                <EqualizerIcon sx={{ cursor: 'pointer' }} />
              </Link>
            </div>
          );
        } else {
          return <div key={Math.random() * 10000}>{el}</div>;
        }
      })}
    </div>
  );
};

export default DataRow;
