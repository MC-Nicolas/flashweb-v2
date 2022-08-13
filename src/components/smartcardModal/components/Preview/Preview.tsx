import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppSelector } from '@/redux/redux.hooks';
import { getVariableById } from '@/utils/getData';
import React from 'react';

type Props = {};

const Preview = (props: Props) => {
  const { variables } = useAppSelector((state) => state.smartcard);

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
      if (value['min']) {
        return `(${value['min']} > x < ${value['max']})`;
      }
    }
  };

  return (
    <FlexContainer height='80%'>
      <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
        {variables.map((variable) => `${handleVariableValue(variable.value)} `)}
      </p>
    </FlexContainer>
  );
};

export default Preview;
