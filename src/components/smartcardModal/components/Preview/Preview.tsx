import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppSelector } from '@/redux/redux.hooks';
import { deepCopy } from '@/utils/dataFormatting';
import {
  getValueByRecursive,
  getVariableById,
  getVariableOfType,
} from '@/utils/getData';
import React, { useEffect, useState } from 'react';

type Props = {};

const Preview = (props: Props) => {
  const { variables } = useAppSelector((state) => state.smartcard);
  const [formattedVariables, setFormattedVariables] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const variableOfTypeResults = getVariableOfType(variables, 'result');
    if (variableOfTypeResults.length === 0) return;
    const finalResultVariable =
      variableOfTypeResults[variableOfTypeResults.length - 1];

    const calculateResultFromVariable = (variable: any) => {
      const { value } = variable;
      const firstOp = value.firstOp;
      const secondOp = value.secondOp;
      const operator = value.operator;
      const firstOpValue = getValueByRecursive(variables, firstOp);
      const secondOpValue = getValueByRecursive(variables, secondOp);
      const result = eval(`${firstOpValue} ${operator} ${secondOpValue}`);
      return result;
    };

    const res = calculateResultFromVariable(finalResultVariable);
    setResult(res);
  }, [variables]);

  useEffect(() => {
    // ! TODO - handle if variable is randomnumber
    let newVariables = deepCopy(variables);

    newVariables.forEach((variable: any) => {
      if (typeof variable.value === 'string') {
        return variable;
      } else if (
        typeof variable.value === 'object' &&
        variable.value['firstOp']
      ) {
        const firstOpValue = getVariableById(
          newVariables,
          variable.value['firstOp']
        ).value;
        const secondOpValue = getVariableById(
          newVariables,
          variable.value['secondOp']
        ).value;
        const operator = variable.value['operator'];
        variable.value = eval(`${firstOpValue} ${operator} ${secondOpValue}`);
        return variable;
      }
    });
    setFormattedVariables(newVariables);
  }, [variables]);

  return (
    <FlexContainer height='80%' flexDirection='column'>
      <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
        {formattedVariables.map((variable: any) => {
          if (variable.type !== 'result') {
            return `${variable.value} ${variable.symbol} `;
          }
        })}
      </p>

      <p
        style={{
          color: 'white',
          fontSize: '22px',
          letterSpacing: 2,
        }}
      >
        Answer = {result}
      </p>
    </FlexContainer>
  );
};

export default Preview;
