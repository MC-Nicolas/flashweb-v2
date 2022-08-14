import React from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';

import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setModalIsOpened } from '@/redux/smartCard/smartCardSlice';
import SmartcardModal from '@/components/SmartcardModal/SmartcardModal';

const Smart = () => {
  const dispatch = useAppDispatch();
  const { modalIsOpened } = useAppSelector((state) => state.smartcard);

  return (
    <FlexContainer height='50%'>
      <NeumorphicContainer width='50%'>
        {modalIsOpened && <SmartcardModal />}
        <FlexContainer
          height='50px'
          width='100%'
          style={{ color: 'white', padding: '0 50px' }}
          justifyContent='flex-end'
        >
          <EditIcon
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(setModalIsOpened(true))}
          />
        </FlexContainer>
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default Smart;
