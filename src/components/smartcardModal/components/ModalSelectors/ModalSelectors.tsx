import React from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';

import { Button } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import { KeyboardArrowDown } from '@mui/icons-material';
import ButtonWithDropdown from '@/components/ButtonWithDropdown/ButtonWithDropdown';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setAddVariableIsOpened,
  setDraggableVariablesIsOpened,
  setTableIsCollapsed,
  setTypeOfElementToAdd,
} from '@/redux/smartCard/smartCardSlice';

const ModalSelectors = () => {
  const dispatch = useAppDispatch();
  const { tableIsCollapsed, draggableVariablesIsOpened } = useAppSelector(
    (state) => state.smartcard
  );

  return (
    <FlexContainer
      height='10%'
      width='100%'
      style={{ color: 'white' }}
      alignItems='center'
      justifyContent='flex-end'
    >
      <Button
        variant='contained'
        onClick={() => {
          dispatch(setTableIsCollapsed(false));
          dispatch(setAddVariableIsOpened(false));
          dispatch(setDraggableVariablesIsOpened(!draggableVariablesIsOpened));
        }}
      >
        <TocIcon />
      </Button>
      <FlexContainer
        width='60px'
        height='40px'
        style={{
          borderRadius: '3px',
          backgroundColor: 'white',
          margin: '0 10px',
        }}
      >
        <KeyboardArrowDown
          sx={{
            color: 'black',
            cursor: 'pointer',
            transform: !tableIsCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease-in-out',
          }}
          onClick={() => {
            dispatch(setTableIsCollapsed(!tableIsCollapsed));
            dispatch(setAddVariableIsOpened(false));
            dispatch(setDraggableVariablesIsOpened(false));
          }}
        />
      </FlexContainer>
      <ButtonWithDropdown
        onChange={(v: string) => {
          dispatch(setTableIsCollapsed(false));
          dispatch(setTypeOfElementToAdd(v));
          dispatch(setAddVariableIsOpened(true));
          dispatch(setDraggableVariablesIsOpened(false));
        }}
      />
    </FlexContainer>
  );
};

export default ModalSelectors;
