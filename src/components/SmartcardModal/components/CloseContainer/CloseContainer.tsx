import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppDispatch } from '@/redux/redux.hooks';
import { setEditModalIsOpen } from '@/redux/smartCard/smartCardSlice';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

type Props = {};

const CloseContainer = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <FlexContainer height='50px' justifyContent='flex-end'>
      <CloseIcon
        sx={{ color: 'white', cursor: 'pointer' }}
        onClick={() => dispatch(setEditModalIsOpen(false))}
      />
    </FlexContainer>
  );
};

export default CloseContainer;
