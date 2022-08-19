import React from 'react';

import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';

import EastIcon from '@mui/icons-material/East';
import { useAppDispatch } from '@/redux/redux.hooks';
import { setStudyIsActive } from '@/redux/study/StudySlice';

const StartStudyButton = () => {
  const dispatch = useAppDispatch();

  return (
    <ButtonWithIcon
      style={{ width: '180px', backgroundColor: 'green' }}
      title='Study'
      icon={<EastIcon />}
      onClick={() => dispatch(setStudyIsActive(true))}
      iconIsComponent
      iconPosition='right'
    />
  );
};

export default StartStudyButton;
