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
import { setTypeOfElementToEdit } from '@/redux/editModal/editModalSlice';
import { headerElements } from '../NeumorphicTable/data';

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
    if (folderIndex === -1) return;
    const decks = folders[folderIndex].decks;

    const decksDataForTable = extractDataForDeckTable(decks);

    setDeckDataForTable(decksDataForTable);
  }, [folders, activeFolder]);

  useEffect(() => {
    dispatch(setTypeOfElementToEdit('deck'));
  }, []);

  return (
    <FlexContainer flexDirection='row'>
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
        headerElements={headerElements.deck}
        data={deckDataForTable}
        style={{ maxHeight: '70%', overflowY: 'auto', paddingTop: '20px' }}
      />
    </FlexContainer>
  );
};

export default Decks;
