import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import React, { useState } from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import Select from '../Inputs/Select';

type FoldersParamsProps = {
  typeOfData: string;
  setTypeOfData: (typeOfData: string) => void;
};

const FoldersParams = ({ typeOfData, setTypeOfData }: FoldersParamsProps) => {
  const dispatch = useAppDispatch();
  const { activeFolder, foldersOptions, activeDeck, decksOptions } =
    useAppSelector((state) => state.folders);

  return (
    <>
      <FlexContainer height='50px' style={{ marginTop: '-30px' }}>
        <Select
          width='30%'
          label='Type of data'
          value={typeOfData}
          onChange={(e) => setTypeOfData(e.target.value)}
          options={[
            { name: 'Folder', value: 'folder' },
            { name: 'Deck', value: 'deck' },
          ]}
        />
      </FlexContainer>
      <FlexContainer
        height='50px'
        justifyContent='center'
        style={{ marginTop: '-80px' }}
      >
        <Select
          width='30%'
          label='Folder'
          value={activeFolder}
          onChange={(e) => dispatch(setActiveFolder(e.target.value))}
          options={foldersOptions}
        />
         
        {typeOfData === 'deck' && (
          <Select
            width='30%'
            label='Deck'
            value={activeDeck}
            onChange={(e) => dispatch(setActiveDeck(e.target.value))}
            options={decksOptions}
          />
        )}
      </FlexContainer>
    </>
  );
};

export default FoldersParams;
