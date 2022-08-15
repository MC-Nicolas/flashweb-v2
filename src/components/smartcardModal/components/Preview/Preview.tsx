import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppSelector } from '@/redux/redux.hooks';
import { variablesWithIdType } from '@/types/smartCard';
import React, { useEffect, useState } from 'react';
import { handleVariablesCalculationsAndValues } from '../../utils/formatting';

const Preview = () => {
  const { variables } = useAppSelector((state) => state.smartcard);
  const [formattedVariables, setFormattedVariables] = useState<
    variablesWithIdType[]
  >([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const { result, newVariables } =
      handleVariablesCalculationsAndValues(variables);
    setFormattedVariables(newVariables);
    setResult(result);
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
