import FlexContainer from '@/components/FlexContainer/FlexContainer';
import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setAllVariables,
  setDraggableVariablesIsOpened,
} from '@/redux/smartCard/smartCardSlice';
import DraggableElement from './components/DraggableElement/DraggableElement';
import { variablesWithIdType } from '@/types/smartCard';

type Props = {};

const DraggableVariabes = (props: Props) => {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.smartcard);
  const [draggedElement, setDraggedElement] = useState<any>(null);
  const [orderedVariables, setOrderedVariables] = useState<any>([]);
  const dragItem = useRef();

  useEffect(() => {
    setOrderedVariables(variables);
  }, [variables]);

  const handleDragStart = (e: React.SyntheticEvent, index: number) => {
    // const indexOfVariable = variables.findIndex((v) => v.id === variable.id);
    // setDraggedElement(indexOfVariable);
    //@ts-ignore
    dragItem.current = index;
  };

  const handleDragEnter = (e: React.SyntheticEvent, index: number) => {
    //@ts-ignore
    dragItem.current = index;
    // let newVariables = [...orderedVariables];
    // const indexOfVariable = variables.findIndex((v) => v.id === variable.id);
    // const indexOfDraggedElement = variables.findIndex(
    //   (v) => v.id === draggedElement
    // );
    // newVariables[indexOfVariable] = variables[indexOfDraggedElement];
    // newVariables[indexOfDraggedElement] = variables[indexOfVariable];
    // setOrderedVariables(newVariables);
  };

  const drop = (e: any) => {
    console.log('dropped');
    const copyListItems = [...orderedVariables];
    //@ts-ignore
    const dragItemContent = copyListItems[dragItem.current];
    //@ts-ignore
    copyListItems.splice(dragItem.current, 1);
    //@ts-ignore
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    //@ts-ignore
    dragItem.current = null;
    //@ts-ignore
    dragOverItem.current = null;
    setOrderedVariables(copyListItems);
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
      <FlexContainer>
        {orderedVariables.length > 0 &&
          orderedVariables.map((variable: any, index: number) => (
            <DraggableElement
              key={variable.id}
              variable={variable}
              onDragStart={(e: React.SyntheticEvent) =>
                handleDragStart(e, index)
              }
              onDragEnter={(e: React.SyntheticEvent) =>
                handleDragEnter(e, index)
              }
              onDrop={drop}
            />
          ))}
      </FlexContainer>
    </FlexContainer>
  );
};

export default DraggableVariabes;
