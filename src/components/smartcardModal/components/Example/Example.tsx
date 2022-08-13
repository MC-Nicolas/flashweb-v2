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

  useEffect(() => {
    let newVariables = deepCopy(variables);
    newVariables.forEach((variable: any) => {
      if (variable.type === 'randomnumber') {
        variable.value = createRandomNumberWithMinMax(
          parseFloat(variable.value['min']),
          parseFloat(variable.value['max'])
        );
      }
    });

    setNormalizedVariables(newVariables);
  }, [variables]);

  const handleVariableValue = (value: any) => {
    if (typeof value === 'number' || typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      if (value['firstOp']) {
        return `${getVariableById(variables, value['firstOp']).name} ${
          value['operator']
        } ${getVariableById(variables, value['secondOp']).name}`;
      }
    }
  };

  return (
    <FlexContainer height='80%'>
      <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
        {normalizedVariables.map(
          (variable: any) => `${handleVariableValue(variable.value)} `
        )}
      </p>
    </FlexContainer>
  );
};

export default Example;
