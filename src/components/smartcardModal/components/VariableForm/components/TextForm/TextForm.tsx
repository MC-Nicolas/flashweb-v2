import FlexContainer from '@/components/FlexContainer/FlexContainer';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setVariableToAdd } from '@/redux/smartCard/smartCardSlice';
import React, { useEffect } from 'react';

type Props = {};

const TextForm = (props: Props) => {
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
        <WhiteBasicInput
          style={{ height: '100px' }}
          width='100%'
          label='Value'
          isTextArea
          value={typeof value === 'string' ? value : ''}
          onChange={(e: { target: { value: string } }) =>
            dispatch(setVariableToAdd({ key: 'value', value: e.target.value }))
          }
          required
        />
      </FlexContainer>
    </>
  );
};

export default TextForm;
