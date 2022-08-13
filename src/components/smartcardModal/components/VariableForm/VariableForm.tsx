import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Select from '@/components/Inputs/Select';
import WhiteBasicInput from '@/components/Inputs/WhiteBasicInput';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import BasicNumberForm from './components/BasicNumberForm/BasicNumberForm';
import RandomNumberForm from './components/RandomNumberForm/RandomNumberForm';

import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addVariable,
  setAddVariableIsOpened,
  setIsEdit,
  updateVariable,
} from '@/redux/smartCard/smartCardSlice';
import TextForm from './components/TextForm/TextForm';
import ResultForm from './components/ResultForm/ResultForm';

type Props = {};

const VariableForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const [typeOfVar, setTypeOfVar] = useState('number');
  const { variableToAdd, numberOptions, isEdit } = useAppSelector(
    (state) => state.smartcard
  );
  1;

  const handleSaveVariable = () => {
    if (isEdit) {
      //@ts-ignore
      dispatch(updateVariable({ id: variableToAdd.id, data: variableToAdd }));
      dispatch(setIsEdit(false));
    } else {
      dispatch(addVariable({ ...variableToAdd, type: typeOfVar }));
    }
  };

  return (
    <FlexContainer style={{ position: 'relative' }}>
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
      <Select
        label='Type'
        value={typeOfVar}
        onChange={(e) => setTypeOfVar(e.target.value)}
        options={numberOptions}
      />
      {typeOfVar === 'number' && <BasicNumberForm />}
      {typeOfVar === 'randomnumber' && <RandomNumberForm />}
      {typeOfVar === 'text' && <TextForm />}

      <Button variant='contained' onClick={handleSaveVariable}>
        {isEdit ? 'Update' : 'Add'}
      </Button>
    </FlexContainer>
  );
};

export default VariableForm;
