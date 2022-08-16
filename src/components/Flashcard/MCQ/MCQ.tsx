import React, { useState } from 'react';

import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { Button, TextareaAutosize } from '@mui/material';
import MCQAnswer from './components/MCQAnswer';

type MCQProps = {
  isFrontActive: boolean;
};

const MCQ = ({ isFrontActive }: MCQProps) => {
  const [answers, setAnswers] = useState([{ isCorrect: false, text: '' }]);

  const handleCheckboxChange = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
    setAnswers(newAnswers);
  };
  const handleTextChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    const newAnswers = [...answers];
    newAnswers.push({
      isCorrect: false,
      text: '',
    });
    setAnswers(newAnswers);
  };

  const handleDeleteAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  return (
    <FlexContainer height='280px' width='85%'>
      {!isFrontActive && (
        <FlexContainer height='50px' style={{ marginBottom: '10px' }}>
          <Button variant='contained' onClick={handleAddAnswer}>
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
          {answers.map((answer, index) => (
            <MCQAnswer
              key={index}
              text={answer.text}
              isCorrect={answer.isCorrect}
              onChangeText={(e: any) => handleTextChange(index, e.target.value)}
              onChangeCheckbox={() => handleCheckboxChange(index)}
              onDelete={() => handleDeleteAnswer(index)}
            />
          ))}
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default MCQ;
