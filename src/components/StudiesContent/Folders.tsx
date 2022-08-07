import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { extractDataForFolderTable } from '@/utils/dataFormatting';
import React, { useEffect, useState } from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import NeumorphicTable from '../NeumorphicTable/NeumorphicTable';

const Folders = () => {
  const dispatch = useAppDispatch();
  const { folders } = useAppSelector((state) => state.folders);
  const [foldersDataForTable, setFoldersDataForTable] = useState<any>([]);

  useEffect(() => {
    const foldersDataForTable = extractDataForFolderTable(folders);
    setFoldersDataForTable(foldersDataForTable);
  }, [folders]);

  return (
    <NeumorphicTable
      width='85%'
      height='80%'
      headerElements={['Name', 'Total Decks', 'Total Flashcards', 'Actions']}
      data={foldersDataForTable}
    />
  );
};

export default Folders;
