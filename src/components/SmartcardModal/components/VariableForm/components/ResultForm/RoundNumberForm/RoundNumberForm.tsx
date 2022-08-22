import NumberInputWithIncDec from '@/components/common/inputs/NumberInputWithIncDec/NumberInputWithIncDec';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setVariableResult } from '@/redux/smartCard/smartCardSlice';
import React from 'react';

type Props = {};

const RoundNumberForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    variableToAdd: { value },
  } = useAppSelector((state) => state.smartcard);
  return (
    <FlexContainer height='20px'>
      <NumberInputWithIncDec
        //@ts-ignore
        number={value.roundNumber ?? 0}
        onPlus={() => {
          dispatch(
            //@ts-ignore
            setVariableResult({
              key: 'roundNumber',
              //@ts-ignore
              value: value.roundNumber + 1,
            })
          );
        }}
        onMinus={() => {
          dispatch(
            //@ts-ignore
            setVariableResult({
              key: 'roundNumber',
              //@ts-ignore
              value: value.roundNumber - 1,
            })
          );
        }}
      />
    </FlexContainer>
  );
};

export default RoundNumberForm;
