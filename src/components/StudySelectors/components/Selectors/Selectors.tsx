import React from 'react';
import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';

const Selectors = () => {
  const dispatch = useAppDispatch();
  const { activeFolder, foldersOptions, activeDeck, decksOptions } =
    useAppSelector((state) => state.folders);

  return (
    <FlexContainer height='100px'>
      <Select
        width='30%'
        label='Folder'
        value={activeFolder}
        options={foldersOptions}
        onChange={(e) => dispatch(setActiveFolder(e.target.value))}
      />
      <Select
        width='30%'
        label='Folder'
        value={activeDeck}
        options={decksOptions}
        onChange={(e) => dispatch(setActiveDeck(e.target.value))}
      />
    </FlexContainer>
  );
};

export default Selectors;
