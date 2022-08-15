import FlexContainer from '@/components/FlexContainer/FlexContainer';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setMinMaxOnVariableToAdd,
  setVariableToAdd,
} from '@/redux/smartCard/smartCardSlice';
import React, { useEffect } from 'react';

type Props = {};

const RandomNumberForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    variableToAdd: { name, value, symbol },
  } = useAppSelector((state) => state.smartcard);

  useEffect(() => {
    if (typeof value === 'object') return;
    dispatch(setVariableToAdd({ key: 'value', value: { min: 0, max: 0 } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        />
      </FlexContainer>

      <FlexContainer
        height='80px'
        flexDirection='row'
        justifyContent='space-between'
        flexWrap='nowrap'
      >
        <WhiteBasicInput
          width='50%'
          label='Min'
          type='number'
          //@ts-ignore
          value={typeof value !== 'string' ? value.min : 0}
          onChange={(e: { target: { value: number } }) =>
            dispatch(
              setMinMaxOnVariableToAdd({ key: 'min', value: e.target.value })
            )
          }
          required
        />
        <WhiteBasicInput
          width='50%'
          label='Max'
          type='Max'
          //@ts-ignore
          value={typeof value !== 'string' ? value.max : 0}
          onChange={(e: { target: { value: number } }) =>
            dispatch(
              setMinMaxOnVariableToAdd({ key: 'max', value: e.target.value })
            )
          }
          required
        />
      </FlexContainer>
    </>
  );
};

export default RandomNumberForm;
