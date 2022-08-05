import React, { useState } from 'react';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';
import Select from '../Inputs/Select';
import EastIcon from '@mui/icons-material/East';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { setStudyIsActive } from '@/redux/study/StudySlice';

const StudySelectors = () => {
  const dispatch = useAppDispatch();
  const { flashcards } = useAppSelector((state) => state.study);
  const { activeFolder, foldersOptions, activeDeck, decksOptions } =
    useAppSelector((state) => state.folders);

  return (
    <InsetNeumorphicContainer width='80%' height='80vh'>
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
      <FlexContainer height='80%'>
        {flashcards && flashcards.length > 0 ? (
          <ButtonWithIcon
            style={{ width: '180px', backgroundColor: 'green' }}
            title='Study'
            icon={<EastIcon />}
            onClick={() => dispatch(setStudyIsActive(true))}
            iconIsComponent
            iconPosition='right'
          />
        ) : (
          <h2>{`No flashcard in this deck`}</h2>
        )}
      </FlexContainer>
    </InsetNeumorphicContainer>
  );
};

export default StudySelectors;
