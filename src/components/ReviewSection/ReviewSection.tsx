import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { resetStudyState } from '@/redux/study/StudySlice';

import { CheckCircle } from '@mui/icons-material';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

import InsetNeumorphicContainer from '../Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import ReviewInfo from './components/ReviewInfo';
import { saveReviewInDB } from '@/database/createInDB';
import { removeSpecialChars } from '@/utils/dataFormatting';
import toast from 'react-hot-toast';
import { addReview } from '@/redux/folders/FolderSlice';

const ReviewSection = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { activeFolder, activeDeck } = useAppSelector((state) => state.folders);
  const { answers, timeSpent } = useAppSelector((state) => state.study);

  const handleOnReturnClick = () => {
    dispatch(resetStudyState());
  };

  const handleSaveInDB = async () => {
    const date = new Date().toLocaleDateString('fr-fr');
    const { success, error } = await saveReviewInDB(
      email,
      removeSpecialChars(activeFolder),
      removeSpecialChars(activeDeck),
      answers,
      timeSpent
    );

    dispatch(
      addReview({
        folderId: removeSpecialChars(activeFolder),
        deckId: removeSpecialChars(activeDeck),
        answers,
        timeSpent,
      })
    );

    if (success) {
      return toast.success('Results saved successfully !');
    } else {
      return toast.error(
        'Oops, something happened while saving your results... '
      );
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
