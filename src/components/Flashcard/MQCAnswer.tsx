import { CheckBox } from '@mui/icons-material';
import React from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';

type MQCAnswerProps = {
  text: string;
  isCorrect: boolean;
  onChangeText: any;
  onChangeIsCorrect: any;
};

const MQCAnswer = ({
  text,
  isCorrect,
  onChangeText,
  onChangeIsCorrect,
}: MQCAnswerProps) => {
  return (
    <NeumorphicContainer height='50px' style={{ flexDirection: 'row' }}>
      <FlexContainer justifyContent='flex-start' style={{ color: 'white' }}>
        <CheckBox />
        <input
          value={text}
          style={{
            height: '80%',
            width: '90%',
            border: 'none',
            background: 'transparent',
          }}
        />
      </FlexContainer>
    </NeumorphicContainer>
  );
};

export default MQCAnswer;
