import React from 'react';

import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { Button, TextareaAutosize } from '@mui/material';
import MCQAnswer from './components/MCQAnswer';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addEmptyAnswer,
  removeAnswer,
  setAnswerIsCorrect,
  setAnswerText,
  setFront,
} from '@/redux/mcqFlashcard/mcqFlashcardSlice';

type MCQProps = {
  isFrontActive: boolean;
};

const MCQ = ({ isFrontActive }: MCQProps) => {
  const dispatch = useAppDispatch();
  const { front, back } = useAppSelector((state) => state.mcqcard);

  return (
    <FlexContainer height='280px' width='85%'>
      {!isFrontActive && (
        <FlexContainer height='50px' style={{ marginBottom: '10px' }}>
          <Button
            variant='contained'
            onClick={() => dispatch(addEmptyAnswer())}
          >
            +
          </Button>
        </FlexContainer>
      )}
      {isFrontActive ? (
        <NeumorphicContainer
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            color: 'white',
            letterSpacing: '2px',
            fontSize: '20px',
            height: '250px',
          }}
        >
          <TextareaAutosize
            onChange={(e) => dispatch(setFront(e.target.value))}
            value={front}
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: 'transparent',
              color: 'white',
              letterSpacing: '2px',
              fontSize: '20px',
              textAlign: 'center',
            }}
          />
        </NeumorphicContainer>
      ) : (
        <FlexContainer style={{ overflowY: 'scroll' }} height='200px'>
          {back.map((answer, index) => (
            <MCQAnswer
              key={index}
              text={answer.text}
              isCorrect={answer.isCorrect}
              onChangeText={(e: any) => {
                console.log('test');
                dispatch(setAnswerText({ index, text: e.target.value }));
              }}
              onChangeCheckbox={() =>
                dispatch(
                  setAnswerIsCorrect({ index, isCorrect: !answer.isCorrect })
                )
              }
              onDelete={() => dispatch(removeAnswer(index))}
            />
          ))}
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default MCQ;
