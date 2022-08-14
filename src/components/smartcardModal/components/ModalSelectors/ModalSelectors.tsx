import React from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';

import { Button } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ButtonWithDropdown from '@/components/ButtonWithDropdown/ButtonWithDropdown';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  reset,
  setAddVariableIsOpened,
  setDraggableVariablesIsOpened,
  setPreviewIsOpened,
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
      justifyContent='space-between'
    >
      <Button
        variant='contained'
        onClick={() => {
          dispatch(setTableIsCollapsed(false));
          dispatch(setAddVariableIsOpened(false));
          dispatch(setDraggableVariablesIsOpened(false));
          dispatch(setPreviewIsOpened(true));
        }}
      >
        <ArticleIcon />
      </Button>

      <Button
        variant='contained'
        onClick={() => {
          dispatch(setTableIsCollapsed(false));
          dispatch(setAddVariableIsOpened(false));
          dispatch(setDraggableVariablesIsOpened(true));
          dispatch(setPreviewIsOpened(false));
        }}
      >
        <ViewModuleIcon />
      </Button>

      <Button
        variant='contained'
        onClick={() => {
          dispatch(setTableIsCollapsed(true));
          dispatch(setAddVariableIsOpened(false));
          dispatch(setDraggableVariablesIsOpened(false));
          dispatch(setPreviewIsOpened(false));
        }}
      >
        <TocIcon />
      </Button>

      <Button
        variant='contained'
        sx={{ backgroundColor: 'red' }}
        onClick={() => {
          confirm('Are you sure you want to reset the variables ?') &&
            dispatch(reset());
        }}
      >
        <RestartAltIcon />
      </Button>

      <ButtonWithDropdown
        onChange={(v: string) => {
          dispatch(setTableIsCollapsed(false));
          dispatch(setTypeOfElementToAdd(v));
          dispatch(setAddVariableIsOpened(true));
          dispatch(setDraggableVariablesIsOpened(false));
          dispatch(setPreviewIsOpened(false));
        }}
      />
    </FlexContainer>
  );
};

export default ModalSelectors;
