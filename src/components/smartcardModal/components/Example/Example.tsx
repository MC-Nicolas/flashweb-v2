import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppSelector } from '@/redux/redux.hooks';
import { createRandomNumberWithMinMax } from '@/utils/data';
import { deepCopy } from '@/utils/dataFormatting';
import { getVariableById } from '@/utils/getData';
import React, { useEffect, useState } from 'react';

type Props = {};

const Example = (props: Props) => {
  const { variables } = useAppSelector((state) => state.smartcard);
  const [normalizedVariables, setNormalizedVariables] = useState<any>([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let newVariables = deepCopy(variables);
    newVariables.forEach((variable: any) => {
      const { value } = variable;
      if (variable.type === 'randomnumber') {
        variable.value = createRandomNumberWithMinMax(
          parseFloat(variable.value['min']),
          parseFloat(variable.value['max'])
        );
      }
      if (typeof value === 'object') {
        if (value['firstOp']) {
          const firstOpId = value['firstOp'];
          const secondOpId = value['secondOp'];
          const firstOpValue = getValueByRecursive(
            normalizedVariables,
            firstOpId
          );
          const secondOpValue = getValueByRecursive(
            normalizedVariables,
            secondOpId
          );
          setResult(1);
          // setResult(
          // console.log(
          //   calculateResult(firstOpValue, value['operator'], secondOpValue)
          // );
          // );

          return `${firstOpValue} ${value['operator']} ${secondOpValue}`;
        }
      }
    });

    setNormalizedVariables(newVariables);
  }, [variables]);

  const calculateResult = (
    first: number | string,
    operator: string,
    sec: number | string
  ) => {
    if (typeof first === 'string') {
      first = parseFloat(first);
    }
    if (typeof sec === 'string') {
      sec = parseFloat(sec);
    }
    return eval(`${first} ${operator} ${sec}`);
  };

  const getValueByRecursive = (variables: any, id: string) => {
    const variableFound = getVariableById(variables, id);
    if (typeof variableFound.value === 'object') {
      if (variableFound.value['firstOp']) {
        getValueByRecursive(variables, variableFound.value['firstOp']);
        getValueByRecursive(variables, variableFound.value['secondOp']);
      }
    } else return variableFound.value;
  };

  return (
    <FlexContainer height='80%'>
      <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
        {normalizedVariables.map((variable: any) => `${variable.value} `)}
      </p>
      <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
        <strong>= {result}</strong>
      </p>
    </FlexContainer>
  );
};

export default Example;
