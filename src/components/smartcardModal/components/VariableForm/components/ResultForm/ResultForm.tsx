import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { formatVariablesForOptions } from '@/components/SmartcardModal/utils/formatting';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setVariableResult,
  setVariableToAdd,
} from '@/redux/smartCard/smartCardSlice';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    dispatch(setVariableToAdd({ key: 'type', value: 'result' }));
    if (typeof value === 'object') return;
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

  return (
    <FlexContainer
      height='250px'
      flexDirection='column'
      justifyContent='space-evenly'
      flexWrap='nowrap'
    >
      <WhiteBasicInput
        style={{ margin: '10px 0' }}
        label='Name'
        value={name}
        onChange={(e: { target: { value: string } }) =>
          dispatch(setVariableToAdd({ key: 'name', value: e.target.value }))
        }
        required
      />
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
    </FlexContainer>
  );
};

export default ResultForm;
