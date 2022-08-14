import React, { useEffect, useState } from 'react';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { formatVariablesForOptions } from '@/components/SmartcardModal/utils/formatting';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addVariable,
  resetVariableToAdd,
  setAddVariableIsOpened,
  setVariableResult,
  setVariableToAdd,
} from '@/redux/smartCard/smartCardSlice';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  calculateResultByRecursion,
  getValueByRecursive,
  getVariableById,
  getVariableOfType,
} from '@/utils/getData';

const operators = [
  { value: '+', name: '+' },
  { value: '-', name: '-' },
  { value: '*', name: '*' },
  { value: '/', name: '/' },
  { value: '%', name: '%' },
];

const ResultForm = () => {
  const dispatch = useAppDispatch();
  const {
    variables,
    variableToAdd: { name, value, symbol },
  } = useAppSelector((state) => state.smartcard);
  const [variablesOptions, setVariablesOptions] = useState<any>([]);
  const [finalResult, setFinalResult] = useState(0);
  useEffect(() => {
    dispatch(
      setVariableToAdd({
        key: 'value',
        value: {
          firstOp: formatVariablesForOptions(variables)[0].value,
          secondOp: formatVariablesForOptions(variables)[0].value,
          operator: operators[0].value,
        },
      })
    );
  }, []);

  useEffect(() => {
    console.log(variables);
    setVariablesOptions(formatVariablesForOptions(variables));
    const variableOfTypeResults = getVariableOfType(variables, 'result');
    if (variableOfTypeResults.length === 0) return;
    const finalResultVariable =
      variableOfTypeResults[variableOfTypeResults.length - 1];

    const res = calculateResultByRecursion(finalResultVariable, variables);
    setFinalResult(res);
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
        width='50px'
        height='50px'
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        <CloseIcon
          sx={{ color: 'white', cursor: 'pointer' }}
          onClick={() => dispatch(setAddVariableIsOpened(false))}
        />
      </FlexContainer>
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
        <Select
          label=''
          options={variablesOptions}
          //@ts-ignore
          value={value.secondOp}
          width='100px'
          onChange={(e) =>
            dispatch(
              setVariableResult({ key: 'secondOp', value: e.target.value })
            )
          }
        />
      </FlexContainer>
      <Button variant='contained' onClick={handleAddVarResult}>
        Then
      </Button>
      <Button variant='contained' sx={{ backgroundColor: 'green' }}>
        Save
      </Button>
    </FlexContainer>
  );
};

export default ResultForm;
