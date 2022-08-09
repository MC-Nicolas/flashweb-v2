import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { ArrowBackIosNew, KeyboardArrowDown } from '@mui/icons-material';
import React, { useState } from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';
import Select from '../Inputs/Select';
import SectionDescription from '../Texts/SectionDescription';

type NewFlashcardSelectorsProps = {
  typeOfFlashcard: string;
  setTypeOfFlashcard: (typeOfFlashcard: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

const NewFlashcardSelectors = ({
  typeOfFlashcard,
  setTypeOfFlashcard,
  isCollapsed,
  setIsCollapsed,
}: NewFlashcardSelectorsProps) => {
  const dispatch = useAppDispatch();
  const { activeFolder, foldersOptions, activeDeck, decksOptions } =
    useAppSelector((state) => state.folders);

  return (
    <NeumorphicContainer
      width='80%'
      height={isCollapsed ? '300px' : '10%'}
      style={{ position: 'relative', transition: 'all 0.2s ease-in-out' }}
    >
      <KeyboardArrowDown
        sx={{
          color: 'white',
          position: 'absolute',
          right: 15,
          top: 15,
          cursor: 'pointer',
          transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      {isCollapsed ? (
        <>
          <FlexContainer width='95%' height='50%'>
            <Select
              width='30%'
              label='Folder to add to'
              value={activeFolder}
              onChange={(e) => dispatch(setActiveFolder(e.target.value))}
              options={foldersOptions}
            />
            <Select
              width='30%'
              label='Deck to add to'
              value={activeDeck}
              onChange={(e) => dispatch(setActiveDeck(e.target.value))}
              options={decksOptions}
            />
          </FlexContainer>
          <Select
            width='30%'
            value={typeOfFlashcard}
            onChange={(e: { target: { value: string } }) =>
              setTypeOfFlashcard(e.target.value)
            }
            label='Type of flashcard'
            options={[
              { name: 'Classic', value: 'classic' },
              { name: 'MCQ', value: 'mcq' },
              { name: 'Smart', value: 'smart' },
            ]}
          />
        </>
      ) : (
        <FlexContainer>
          <p style={{ color: 'white' }}>Parameters</p>
        </FlexContainer>
      )}
    </NeumorphicContainer>
  );
};

export default NewFlashcardSelectors;
