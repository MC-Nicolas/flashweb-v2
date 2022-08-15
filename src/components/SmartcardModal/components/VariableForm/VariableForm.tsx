import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';
import { Button } from '@mui/material';
import React from 'react';
import BasicNumberForm from './components/BasicNumberForm/BasicNumberForm';
import RandomNumberForm from './components/RandomNumberForm/RandomNumberForm';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addVariable,
  setIsEdit,
  updateVariable,
  setTypeOfVariable,
} from '@/redux/smartCard/smartCardSlice';
import TextForm from './components/TextForm/TextForm';

type Props = {};

const VariableForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const { variableToAdd, numberOptions, isEdit, typeOfVariable } =
    useAppSelector((state) => state.smartcard);
  1;

  const handleSaveVariable = () => {
    if (isEdit) {
      //@ts-ignore
      dispatch(updateVariable({ id: variableToAdd.id, data: variableToAdd }));
      dispatch(setIsEdit(false));
    } else {
      dispatch(addVariable({ ...variableToAdd, type: typeOfVariable }));
    }
  };

  return (
    <FlexContainer style={{ position: 'relative' }}>
      <Select
        label='Type'
        value={typeOfVariable}
        onChange={(e) => dispatch(setTypeOfVariable(e.target.value))}
        options={numberOptions}
      />
      {typeOfVariable === 'number' && <BasicNumberForm />}
      {typeOfVariable === 'randomnumber' && <RandomNumberForm />}
      {typeOfVariable === 'text' && <TextForm />}

      <Button variant='contained' onClick={handleSaveVariable}>
        {isEdit ? 'Update' : 'Add'}
      </Button>
    </FlexContainer>
  );
};

export default VariableForm;
