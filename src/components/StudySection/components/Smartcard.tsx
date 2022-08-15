import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { handleVariablesCalculationsAndValues } from '@/components/SmartcardModal/utils/formatting';
import { variablesWithIdType } from '@/types/smartCard';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import BasicInput from '@/components/Inputs/BasicInput';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { useAppDispatch } from '@/redux/redux.hooks';
import { setAnswerIsSuccess } from '@/redux/study/StudySlice';

type SmartcardProps = {
  front: { variables: variablesWithIdType[] };
  back: { variables: variablesWithIdType[] };
  isFlipped: boolean;
};

const Smartcard = ({ front, back, isFlipped }: SmartcardProps) => {
  const dispatch = useAppDispatch();
  const [formattedVariables, setFormattedVariables] = useState<
    variablesWithIdType[]
  >([]);
  const [result, setResult] = useState(0);
  const [userResult, setUserResult] = useState<string | number>('');

  useEffect(() => {
    const { result, newVariables } = handleVariablesCalculationsAndValues(
      front.variables
    );
    setFormattedVariables(newVariables);
    setResult(result);
    setUserResult('');
  }, [front, back]);

  useEffect(() => {
    dispatch(setAnswerIsSuccess(result == userResult));
  }, [isFlipped]);

  return (
    <FlexContainer>
      <NeumorphicContainer
        height='85%'
        width='80%'
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <FlexContainer height='70%' justifyContent='space-evenly'>
          <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
            {formattedVariables.map((variable: any) => {
              if (variable.type !== 'result') {
                return `${variable.value} ${variable.symbol} `;
              }
            })}
          </p>
        </FlexContainer>
        {isFlipped && result != userResult && (
          <p style={{ color: 'green', fontSize: '22px', letterSpacing: 2 }}>
            Answer: {result}
          </p>
        )}

        <FlexContainer
          height='80px'
          justifyContent='center'
          alignItems='center'
        >
          <WhiteBasicInput
            inputStyle={{
              border: isFlipped
                ? result == userResult
                  ? '2px solid green'
                  : '2px solid red'
                : 'none',
            }}
            label=''
            placeholder='Enter your answer'
            value={userResult}
            onChange={(e: { target: { value: string } }) => {
              e.target.value
                ? setUserResult(parseInt(e.target.value))
                : setUserResult('');
            }}
            width='40%'
          />
        </FlexContainer>
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default Smartcard;
