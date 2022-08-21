import React from 'react';
import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import Select from '@/components/Inputs/Select';
import FlexContainer from '@/components/FlexContainer/FlexContainer';

interface FoldersSelectorsProps {}

const FoldersSelectors = ({}: FoldersSelectorsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { activeFolder, foldersOptions, decksOptions, activeDeck } =
    useAppSelector((state) => state.folders);
  return (
    <FlexContainer height='150px' width='700px'>
      <Select
        width='200px'
        label='Folder'
        options={foldersOptions}
        value={activeFolder}
        onChange={(e) => dispatch(setActiveFolder(e.target.value))}
      />
      <Select
        width='200px'
        label='Deck'
        options={decksOptions}
        value={activeDeck}
        onChange={(e) => dispatch(setActiveDeck(e.target.value))}
      />
    </FlexContainer>
  );
};

export default FoldersSelectors;
