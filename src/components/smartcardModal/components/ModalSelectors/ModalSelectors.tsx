import React from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';

import { Button } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ButtonWithDropdown from '@/components/ButtonWithDropdown/ButtonWithDropdown';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch } from '@/redux/redux.hooks';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  reset,
  setOpenedModal,
  setTypeOfElementToAdd,
} from '@/redux/smartCard/smartCardSlice';
import { modals } from '@/redux/smartCard/modals';

const ModalSelectors = () => {
  const dispatch = useAppDispatch();

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
          dispatch(setOpenedModal(modals.PREVIEW));
        }}
      >
        <ArticleIcon />
      </Button>

      <Button
        variant='contained'
        onClick={() => {
          dispatch(setOpenedModal(modals.DRAGGABLE_VARIABLES));
        }}
      >
        <ViewModuleIcon />
      </Button>

      <Button
        variant='contained'
        onClick={() => {
          dispatch(setOpenedModal(modals.TABLE));
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
          dispatch(setTypeOfElementToAdd(v));
          dispatch(setOpenedModal(modals.ADD_VARIABLE));
        }}
      />
    </FlexContainer>
  );
};

export default ModalSelectors;
