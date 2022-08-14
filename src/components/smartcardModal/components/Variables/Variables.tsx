import React, { useState } from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import ModalSelectors from '../ModalSelectors/ModalSelectors';
import VariablesTable from '../VariablesTable/VariablesTable';
import VariableForm from '../VariableForm/VariableForm';
import DraggableVariabes from '../VariableForm/components/DraggableVariabes/DraggableVariabes';

import ResultForm from '../VariableForm/components/ResultForm/ResultForm';
import Preview from '../Preview/Preview';

type Props = {};

const Variables = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    elementOptions,
    typeOfElement,
    typeOfNumber,
    numberOptions,
    addVariableIsOpened,
    typeOfElementToAdd,
    resultFormIsOpened,
    previewIsOpened,
    draggableVariablesIsOpened,
    tableIsCollapsed,
  } = useAppSelector((state) => state.smartcard);
  return (
    <FlexContainer
      height='90%'
      alignItems='flex-start'
      style={{ position: 'relative' }}
    >
      <ModalSelectors />
      {tableIsCollapsed && <VariablesTable />}
      {addVariableIsOpened && typeOfElementToAdd === 'variable' && (
        <VariableForm />
      )}
      {addVariableIsOpened && typeOfElementToAdd === 'result' && <ResultForm />}
      {draggableVariablesIsOpened && <DraggableVariabes />}
      {previewIsOpened && <Preview />}
    </FlexContainer>
  );
};

export default Variables;
