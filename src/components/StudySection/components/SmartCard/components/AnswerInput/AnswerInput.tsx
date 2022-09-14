import FlexContainer from '@/components/FlexContainer/FlexContainer';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import React from 'react';

type AnswerInputProps = {
  isFlipped: boolean;
  result: number | string;
  userResult: number | string;
  setUserResult: any;
};

const AnswerInput = ({
  isFlipped,
  result,
  userResult,
  setUserResult,
}: AnswerInputProps) => {
  return (
    <FlexContainer height='80px' justifyContent='center' alignItems='center'>
      <WhiteBasicInput
        inputStyle={{
          border: isFlipped
            ? result == userResult
              ? '2px solid green'
              : '2px solid red'
            : 'none',
          backgroundColor: isFlipped ? 'grey' : '#fff',
        }}
        label=''
        placeholder='Enter your answer'
        value={userResult}
        type='text'
        onChange={(e: { target: { value: string } }) => {
          if (!isFlipped) {
            e.target.value ? setUserResult(e.target.value) : setUserResult('');
          }
        }}
        width='40%'
      />
    </FlexContainer>
  );
};

export default AnswerInput;
