import React from 'react';
import { useAppDispatch } from '@/redux/redux.hooks';

import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import CloseIcon from '@mui/icons-material/Close';
import FlexContainer from '../FlexContainer/FlexContainer';

import { setEditModalIsOpen } from '@/redux/smartCard/smartCardSlice';
import Variables from './components/Variables/Variables';

const SmartcardModal = () => {
  const dispatch = useAppDispatch();
  return (
    <FlexContainer
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '10px',
        backdropFilter: 'blur(5px)',
      }}
    >
      <NeumorphicContainer
        width='50%'
        height='50%'
        style={{ padding: '10px 30px' }}
      >
        <FlexContainer height='50px' justifyContent='flex-end'>
          <CloseIcon
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => dispatch(setEditModalIsOpen(false))}
          />
        </FlexContainer>
        <FlexContainer justifyContent='flex-start' alignItems='flex-start'>
          <Variables />
        </FlexContainer>
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default SmartcardModal;
