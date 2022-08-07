import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import FlexContainer from '../FlexContainer/FlexContainer';

import NeumorphicTable from '../NeumorphicTable/NeumorphicTable';
import Select from '../Inputs/Select';
import { setActiveFolder } from '@/redux/folders/FolderSlice';
import {
  extractDataForDeckTable,
  removeSpecialChars,
} from '@/utils/dataFormatting';

type Props = {};

const Decks = (props: Props) => {
  const dispatch = useAppDispatch();
  const { folders, foldersOptions, activeFolder } = useAppSelector(
    (state) => state.folders
  );
  const [deckDataForTable, setDeckDataForTable] = useState<any>([]);

  useEffect(() => {
    const folderIndex = folders.findIndex(
      (folder) => removeSpecialChars(folder.title) === activeFolder
    );
    const decks = folders[folderIndex].decks;

    const decksDataForTable = extractDataForDeckTable(decks);
    setDeckDataForTable(decksDataForTable);
  }, [folders, activeFolder]);
  return (
    <FlexContainer flexDirection='column'>
      <FlexContainer height='150px' width='300px'>
        <Select
          label='Folder'
          options={foldersOptions}
          value={activeFolder}
          onChange={(e) => dispatch(setActiveFolder(e.target.value))}
        />
      </FlexContainer>

      <NeumorphicTable
        width='80%'
        height='70%'
        headerElements={[
          'Name',
          'Total Flashcards',
          'Total Reviews',
          'AVG success',
          'Actions',
        ]}
        data={deckDataForTable}
      />
    </FlexContainer>
  );
};

export default Decks;
