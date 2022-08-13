import React, { useEffect, useState } from 'react';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { formatVariablesForOptions } from '@/components/SmartcardModal/utils/formatting';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addVariable,
  setAddVariableIsOpened,
  setVariableResult,
  setVariableToAdd,
} from '@/redux/smartCard/smartCardSlice';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getVariableById } from '@/utils/getData';

// ! ToDO check if it works
// ! TODO: Handle multiple variables

const operators = [
  { value: '+', name: '+' },
  { value: '-', name: '-' },
  { value: '*', name: '*' },
  { value: '/', name: '/' },
  { value: '%', name: '%' },
];

type Props = {};

const ResultForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    variables,
    variableToAdd: { name, value, symbol },
  } = useAppSelector((state) => state.smartcard);
  const [variablesOptions, setVariablesOptions] = useState<any>([]);
  const [temporaryVariables, setTemporaryVariables] = useState(variables);

  useEffect(() => {
    setTemporaryVariables(variables);
  }, [variables]);

  useEffect(() => {
    dispatch(setVariableToAdd({ key: 'type', value: 'result' }));
    if (typeof value === 'object' || variables.length === 0) return;
    dispatch(
      setVariableToAdd({
        key: 'value',
        value: {
          firstOp: formatVariablesForOptions(variables)[0].value,
          secondOp: formatVariablesForOptions(variables)[0].value,
          operator: operators[0].name,
        },
      })
    );
  }, []);

  useEffect(() => {
    setVariablesOptions(formatVariablesForOptions(variables));
  }, [variables]);

  const handleAddVarResult = () => {
    if (!name) {
      //@ts-ignore
      const firstOp = getVariableById(temporaryVariables, value.firstOp);
      //@ts-ignore
      const secondOp = getVariableById(temporaryVariables, value.secondOp);
      dispatch(
        setVariableToAdd({
          key: 'name',
          //@ts-ignore
          value: `${firstOp.name} ${value.operator} ${secondOp.name}`,
        })
      );
    }
    dispatch(addVariable({ type: 'result', name, value }));
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
