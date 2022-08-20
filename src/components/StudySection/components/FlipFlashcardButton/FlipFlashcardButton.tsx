import React from 'react';
import { useAppDispatch } from '@/redux/redux.hooks';
import { setFlashcardIsFlipped } from '@/redux/study/StudySlice';

import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import DoneAll from '@mui/icons-material/DoneAll';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

type FlipFlashcardButtonProps = {
  icon: 'DoneAll' | 'SwapHoriz';
};

const FlipFlashcardButton = ({ icon }: FlipFlashcardButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <ButtonWithIcon
      style={{
        backgroundColor: 'white',
        color: 'black',
        width: '150px',
      }}
      title='Check'
      iconPosition='right'
      iconIsComponent
      icon={icon === 'DoneAll' ? <DoneAll /> : <SwapHorizIcon />}
      onClick={() => dispatch(setFlashcardIsFlipped(true))}
    />
  );
};

export default FlipFlashcardButton;
