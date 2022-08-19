import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { generateRandomId } from '@/utils/data';
import styles from './TableActions.module.scss';
import {
  setModalIsOpen,
  setNameOfElementToEdit,
} from '@/redux/editModal/editModalSlice';
import { deleteDeckFromDB, deleteFolderFromDB } from '@/database/deleteInDB';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { removeDeck, removeFolder } from '@/redux/folders/FolderSlice';
import toast from 'react-hot-toast';

type TableActionsProps = {
  element: string[];
  activeElement: string;
};

const TableActions = ({ element, activeElement }: TableActionsProps) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { activeFolder, folders } = useAppSelector((state) => state.folders);

  const handleDeleteEl = async (el: string) => {
    if (el === 'Edit folder' || el === 'Edit deck') {
      const confirmDelete = confirm(
        `Are you sure you want to delete this ${
          el === 'Edit folder' ? 'folder' : 'deck'
        } and its data ?`
      );
      if (confirmDelete) {
        const { error, success } =
          el === 'Edit folder'
            ? await deleteFolderFromDB(email, removeSpecialChars(element[0]))
            : await deleteDeckFromDB(
                email,
                removeSpecialChars(activeFolder),
                removeSpecialChars(element[0])
              );

        if (success) {
          if (el === 'Edit folder') {
            dispatch(removeFolder(element[0]));
          } else {
            dispatch(
              removeDeck({
                deckId: removeSpecialChars(element[0]),
                folderId: removeSpecialChars(activeFolder),
              })
            );
          }
          toast.success(
            `${el === 'Edit folder' ? 'Folder' : 'Deck'} deleted successfully`
          );
        } else {
          toast.error(error);
        }
      }
    }
  };

  return (
    <div className={styles.editIcons}>
      <EditIcon
        sx={{ color: '#358004', cursor: 'pointer' }}
        onClick={() => {
          dispatch(setModalIsOpen(true));
          dispatch(setNameOfElementToEdit(element[0]));
        }}
      />
      <DeleteForeverIcon
        sx={{ color: '#d11515', cursor: 'pointer' }}
        onClick={() => handleDeleteEl(activeElement)}
      />
    </div>
  );
};

export default TableActions;
