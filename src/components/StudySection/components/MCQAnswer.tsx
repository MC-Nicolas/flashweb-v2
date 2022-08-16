import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { MCQAnswerType } from '@/types/mcq';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import React from 'react';
import { Checkbox } from '@mui/material';

type MCQAnswerProps = {
  text: string;
  isCorrect: boolean;
  setIsCorrect: any;
  isBase?: boolean;
};

const MCQAnswer = ({
  text,
  isCorrect,
  setIsCorrect,
  isBase,
}: MCQAnswerProps) => {
  return (
    <NeumorphicContainer
      height='50px'
      style={{
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: !isBase ? (isCorrect ? '#00e676' : '#ff1744') : '',
      }}
    >
      <Checkbox
        value={isCorrect}
        disabled={!isBase}
        onChange={setIsCorrect}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<RadioButtonCheckedIcon />}
      />
      <p
        style={{
          fontSize: '22px',
          letterSpacing: '2px',
          marginLeft: '10px',
          color: 'white',
        }}
      >
        {text}
      </p>
    </NeumorphicContainer>
  );
};

export default MCQAnswer;
