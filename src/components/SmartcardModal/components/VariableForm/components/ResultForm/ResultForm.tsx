import React, { useEffect, useState } from 'react';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';
import {
  formatVariablesForOptions,
  handleVariablesCalculationsAndValues,
} from '@/components/SmartcardModal/utils/formatting';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addVariable,
  setVariableResult,
  setVariableToAdd,
} from '@/redux/smartCard/smartCardSlice';
import { Button } from '@mui/material';

import { getVariableById } from '@/utils/getData';
import Checkbox from '@mui/material/Checkbox';
import RoundNumberForm from './RoundNumberForm/RoundNumberForm';

const operators = [
  { value: '+', name: '+' },
  { value: '-', name: '-' },
  { value: '*', name: '*' },
  { value: '/', name: '/' },
  { value: '%', name: '%' },
  { value: 'sin (°)', name: 'sin (°)' },
  { value: 'cos (°)', name: 'cos (°)' },
  { value: 'tan', name: 'tan' },
];

const ResultForm = () => {
  const dispatch = useAppDispatch();
  const {
    variables,
    variableToAdd: { value },
  } = useAppSelector((state) => state.smartcard);
  const [variablesOptions, setVariablesOptions] = useState<any>([]);
  const [finalResult, setFinalResult] = useState(0);
  const [showSecondSelect, setShowSecondSelect] = useState(true);

  useEffect(() => {
    //@ts-ignore
    if (value.operator === 'sin (°)' || value.operator === 'cos (°)') {
      setShowSecondSelect(false);
    }
  }, [value]);

  useEffect(() => {
    if (variables.length === 0) return;
    dispatch(
      setVariableToAdd({
        key: 'value',
        value: {
          firstOp: formatVariablesForOptions(variables)[0].value,
          secondOp: formatVariablesForOptions(variables)[0].value,
          operator: operators[0].value,
          rounded: false,
          roundNumber: 0,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { result, variablesOptions } =
      handleVariablesCalculationsAndValues(variables);
    setVariablesOptions(variablesOptions);
    setFinalResult(result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const handleAddVarResult = () => {
    //@ts-ignore
    const firstOp = getVariableById(variables, value.firstOp);
    //@ts-ignore
    const secondOp = getVariableById(variables, value.secondOp);

    dispatch(
      addVariable({
        type: 'result',
        //@ts-ignore
        name: `(${firstOp.name} ${value.operator} ${secondOp.name})`,
        value,
      })
    );
  };
  return (
    <FlexContainer
      flexDirection='column'
      justifyContent='space-evenly'
      flexWrap='nowrap'
      style={{ position: 'relative' }}
    >
      <FlexContainer
        height='50px'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100px'
      >
        <p style={{ color: 'white' }}>Round</p>
        <Checkbox
          sx={{ color: 'white', cursor: 'pointer' }}
          //@ts-ignore
          checked={value.rounded ?? false}
          onClick={() => {
            dispatch(
              //@ts-ignore
              setVariableResult({ key: 'rounded', value: !value.rounded })
            );
          }}
        />
      </FlexContainer>

      {
        //@ts-ignore
        value?.rounded && <RoundNumberForm />
      }
      <FlexContainer height='80px'>
        <p style={{ color: 'white', fontSize: '20px' }}>{finalResult}</p>
      </FlexContainer>
      <FlexContainer height='80px'>
        <Select
          label=''
          options={variablesOptions}
          //@ts-ignore
          value={value.firstOp}
          width='100px'
          onChange={(e) =>
            dispatch(
              setVariableResult({ key: 'firstOp', value: e.target.value })
            )
          }
        />
        <Select
          label=''
          options={operators}
          //@ts-ignore
          value={value.operator}
          width='100px'
          onChange={(e) =>
            dispatch(
              setVariableResult({ key: 'operator', value: e.target.value })
            )
          }
        />
        {showSecondSelect && (
          <Select
            label=''
            options={variablesOptions}
            //@ts-ignore
            value={value.secondOp}
            width='100px'
            onChange={(e) =>
              dispatch(
                setVariableResult({
                  key: 'secondOp',
                  value: e.target.value,
                })
              )
            }
          />
        )}
      </FlexContainer>
      <Button variant='contained' onClick={handleAddVarResult}>
        Then
      </Button>
    </FlexContainer>
  );
};

export default ResultForm;
