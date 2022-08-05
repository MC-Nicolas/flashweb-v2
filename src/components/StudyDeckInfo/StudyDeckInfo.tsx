import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { studySections } from '@/redux/study/StudySections';
import {
  resetStudyState,
  setStudyIsActive,
  setStudySection,
  setTimeSpent,
} from '@/redux/study/StudySlice';
import React, { useEffect, useState } from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

const StudyDeckInfo = () => {
  const dispatch = useAppDispatch();
  const { flashcards, totalAnswers } = useAppSelector((state) => state.study);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    // update timer every second
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (totalAnswers >= flashcards.length) {
      dispatch(setStudySection(studySections.RESULTS));
      dispatch(setTimeSpent(timer));
    }
  }, [flashcards, totalAnswers]);

  return (
    <FlexContainer height='100px'>
      <p style={{ color: 'white' }}>
        Remaining: {flashcards.length - totalAnswers}
      </p>
      <p style={{ color: 'white' }}>Time Spent: {timer}</p>
    </FlexContainer>
  );
};

export default StudyDeckInfo;
