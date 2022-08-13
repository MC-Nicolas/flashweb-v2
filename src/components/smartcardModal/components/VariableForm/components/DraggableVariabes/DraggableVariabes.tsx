import FlexContainer from '@/components/FlexContainer/FlexContainer';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setAllVariables,
  setDraggableVariablesIsOpened,
} from '@/redux/smartCard/smartCardSlice';
import DraggableElement from './components/DraggableElement/DraggableElement';
import { variablesWithIdType } from '@/types/smartCard';
import { deepCopy } from '@firebase/util';
import { Button } from '@mui/material';

type Props = {};

const DraggableVariabes = (props: Props) => {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.smartcard);
  const [draggedElement, setDraggedElement] = useState<any>(null);
  const [orderedVariables, setOrderedVariables] = useState<any>([]);

  useEffect(() => {
    setOrderedVariables(variables);
  }, [variables]);

  const handleDragStart = (e: React.SyntheticEvent, variable: any) => {
    const indexOfVariable = variables.find((v) => v.id === variable.id);
    setDraggedElement(indexOfVariable);
  };

  const drop = (e: any, variable: any) => {
    let newVariables = deepCopy(orderedVariables);
    const indexOfVariable = orderedVariables.findIndex(
      (v: any) => v.id === variable.id
    );
    const indexOfDraggedElement = orderedVariables.findIndex(
      (v: any) => v.id === draggedElement.id
    );

    newVariables[indexOfVariable] = orderedVariables[indexOfDraggedElement];
    newVariables[indexOfDraggedElement] = orderedVariables[indexOfVariable];
    setOrderedVariables(newVariables);
  };

  const handleSave = () => {
    dispatch(setAllVariables(orderedVariables));
    dispatch(setDraggableVariablesIsOpened(false));
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
          onClick={() => dispatch(setDraggableVariablesIsOpened(false))}
        />
      </FlexContainer>
      <FlexContainer height='70%'>
        {orderedVariables.length > 0 &&
          orderedVariables.map((variable: any, index: number) => (
            <DraggableElement
              key={variable.id}
              variable={variable}
              onDragStart={(e: React.SyntheticEvent) =>
                handleDragStart(e, variable)
              }
              onDrop={(e) => drop(e, variable)}
            />
          ))}
      </FlexContainer>
      <Button
        variant='contained'
        sx={{ backgroundColor: 'green' }}
        onClick={handleSave}
      >
        Save
      </Button>
    </FlexContainer>
  );
};

export default DraggableVariabes;
