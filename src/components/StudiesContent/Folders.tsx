import React, { useEffect, useState } from 'react';

import { setTypeOfElementToEdit } from '@/redux/editModal/editModalSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { extractDataForFolderTable } from '@/utils/dataFormatting';

import { headerElements } from '../NeumorphicTable/data';
import NeumorphicTable from '../NeumorphicTable/NeumorphicTable';
import SectionTitle from '../Texts/SectionTitle';

const Folders = () => {
  const dispatch = useAppDispatch();
  const { folders } = useAppSelector((state) => state.folders);
  const [foldersDataForTable, setFoldersDataForTable] = useState<any>([]);

  useEffect(() => {
    const foldersDataForTable = extractDataForFolderTable(folders);
    setFoldersDataForTable(foldersDataForTable);
  }, [folders]);

  useEffect(() => {
    dispatch(setTypeOfElementToEdit('folder'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (folders.length === 0) {
    return <SectionTitle title='No folders' />;
    // ! TODO: add a button to create a folder, show an icon instead of no folders title
  }
  return (
    <NeumorphicTable
      width='85%'
      height='85%'
      headerElements={headerElements.folder}
      data={foldersDataForTable}
    />
  );
};

export default Folders;
