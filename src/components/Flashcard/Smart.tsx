import React, { useEffect, useState } from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';

import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setEditModalIsOpen } from '@/redux/smartCard/smartCardSlice';
import SmartcardModal from '@/components/SmartcardModal/SmartcardModal';
import { handleVariablesCalculationsAndValues } from '../SmartcardModal/utils/formatting';
import { variablesWithIdType } from '@/types/smartCard';

const Smart = ({ isFrontActive }: { isFrontActive: boolean }) => {
  const dispatch = useAppDispatch();
  const { editModalIsOpen, variables } = useAppSelector(
    (state) => state.smartcard
  );
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
    <FlexContainer height='50%'>
      <NeumorphicContainer width='50%'>
        {editModalIsOpen && <SmartcardModal />}
        <FlexContainer
          height='50px'
          width='100%'
          style={{ color: 'white', padding: '0 50px' }}
          justifyContent='flex-end'
        >
          <EditIcon
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(setEditModalIsOpen(true))}
          />
        </FlexContainer>
        {isFrontActive ? (
          <FlexContainer>
            <p
              style={{
                marginTop: '-20px',
                color: 'white',
                fontSize: '18px',
                textAlign: 'center',
                letterSpacing: 2,
                padding: '0 10px',
              }}
            >
              {formattedVariables.map((variable: any) => {
                if (variable.type !== 'result') {
                  return `${variable.value} ${variable.symbol} `;
                }
              })}
            </p>
          </FlexContainer>
        ) : (
          <FlexContainer>
            <p
              style={{
                marginTop: '-20px',
                color: 'white',
                fontSize: '18px',
                textAlign: 'center',
                letterSpacing: 2,
                padding: '0 10px',
              }}
            >
              {result}
            </p>
          </FlexContainer>
        )}
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default Smart;
