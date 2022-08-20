import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { resetStudyState } from '@/redux/study/StudySlice';

import { CheckCircle } from '@mui/icons-material';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import ReviewInfo from './components/ReviewInfo';
import { saveReviewInDB } from '@/database/createInDB';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { addReview } from '@/redux/folders/FolderSlice';
import toast from 'react-hot-toast';

const ReviewSection = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { activeFolder, activeDeck } = useAppSelector((state) => state.folders);
  const { answers, timeSpent } = useAppSelector((state) => state.study);

  const handleOnReturnClick = () => {
    dispatch(resetStudyState());
  };

  const handleSaveInDB = async () => {
    const { success } = await saveReviewInDB(
      email,
      removeSpecialChars(activeFolder),
      removeSpecialChars(activeDeck),
      answers,
      timeSpent
    );
    if (success) {
      dispatch(
        addReview({
          folderId: removeSpecialChars(activeFolder),
          deckId: removeSpecialChars(activeDeck),
          answers,
          timeSpent,
        })
      );
    } else {
      toast.error('Oops, a problem has occured while saving the review...');
    }
  };

  useEffect(() => {
    handleSaveInDB();
  }, []);

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
