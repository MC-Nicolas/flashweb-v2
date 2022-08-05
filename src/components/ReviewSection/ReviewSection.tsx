import { useAppDispatch } from '@/redux/redux.hooks';
import { resetStudyState } from '@/redux/study/StudySlice';
import { CheckCircle } from '@mui/icons-material';
import React from 'react';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import ReviewInfo from './components/ReviewInfo';

const ReviewSection = () => {
  const dispatch = useAppDispatch();

  const handleOnReturnClick = () => {
    dispatch(resetStudyState());
  };
  return (
    <InsetNeumorphicContainer width='80%' height='80vh'>
      <ReviewInfo />
      <ButtonWithIcon
        style={{
          backgroundColor: 'green',
          color: 'white',
          width: '150px',
        }}
        title='Return'
        iconPosition='right'
        iconIsComponent
        icon={<CheckCircle sx={{ color: 'white' }} />}
        onClick={handleOnReturnClick}
      />
    </InsetNeumorphicContainer>
  );
};

export default ReviewSection;
