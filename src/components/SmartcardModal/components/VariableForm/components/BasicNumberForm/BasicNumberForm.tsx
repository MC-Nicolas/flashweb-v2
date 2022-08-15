import FlexContainer from '@/components/FlexContainer/FlexContainer';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setVariableToAdd } from '@/redux/smartCard/smartCardSlice';
import React, { useEffect } from 'react';

type Props = {};

const BasicNumberForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    variableToAdd: { name, value, symbol },
  } = useAppSelector((state) => state.smartcard);

  useEffect(() => {
    if (typeof value === 'string') return;
    dispatch(setVariableToAdd({ key: 'value', value: '' }));
  }, []);
  return (
    <>
      <FlexContainer
        height='80px'
        flexDirection='row'
        justifyContent='space-between'
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
        <WhiteBasicInput
          width='50%'
          label='Symbol'
          value={symbol}
          onChange={(e: { target: { value: string } }) =>
            dispatch(setVariableToAdd({ key: 'symbol', value: e.target.value }))
          }
          required
        />
      </FlexContainer>

      <FlexContainer
        height='80px'
        flexDirection='row'
        justifyContent='center'
        flexWrap='nowrap'
      >
        <WhiteBasicInput
          width='50%'
          label='Value'
          type='number'
          //@ts-ignore
          value={value}
          onChange={(e: { target: { value: number } }) =>
            dispatch(setVariableToAdd({ key: 'value', value: e.target.value }))
          }
          required
        />
      </FlexContainer>
    </>
  );
};

export default BasicNumberForm;
