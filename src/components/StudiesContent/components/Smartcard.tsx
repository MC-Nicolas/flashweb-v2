import React, { useEffect, useState } from 'react';
import { variablesWithIdType } from '@/types/smartCard';

import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { handleVariablesCalculationsAndValues } from '@/components/SmartcardModal/utils/formatting';
import SmartCardActions from './SmartCardActions/SmartCardActions';

type SmartcardProps = {
  data: any;
  onDelete?: any;
  onEdit?: any;
};

const Smartcard = ({ data, onDelete, onEdit }: SmartcardProps) => {
  const { variables } = data;
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
    <NeumorphicContainer
      height='300px'
      width='50%'
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      <FlexContainer
        style={{ position: 'relative', padding: '20px 0' }}
        flexDirection='column'
      >
        <SmartCardActions onDelete={onDelete} onEdit={onEdit} />
        <p style={{ color: 'white', fontSize: '18px', letterSpacing: 2 }}>
          {formattedVariables.map((variable: any) => {
            if (variable.type !== 'result' && variable.isVisible) {
              return `${variable.value}${variable.symbol} `;
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
          Answer = <strong>{result}</strong>
        </p>
      </FlexContainer>
    </NeumorphicContainer>
  );
};

export default Smartcard;
