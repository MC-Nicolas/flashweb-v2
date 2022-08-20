import React, { useEffect, useState } from 'react';
import { variablesWithIdType } from '@/types/smartCard';
import { useAppDispatch } from '@/redux/redux.hooks';
import { setAnswerIsSuccess } from '@/redux/study/StudySlice';

import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { handleVariablesCalculationsAndValues } from '@/components/SmartcardModal/utils/formatting';
import Result from './components/Result/Result';
import Content from './components/Content/Content';
import AnswerInput from './components/AnswerInput/AnswerInput';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Content variables={formattedVariables} />
        {isFlipped && result != userResult && <Result result={result} />}

        <AnswerInput
          isFlipped={isFlipped}
          result={result}
          userResult={userResult}
          setUserResult={setUserResult}
        />
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default Smartcard;
