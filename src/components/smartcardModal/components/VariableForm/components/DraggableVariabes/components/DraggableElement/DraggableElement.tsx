import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { variablesWithIdType } from '@/types/smartCard';
import React from 'react';

type DraggableElementProps = {
  variable: variablesWithIdType;
  onDragStart: (e: React.SyntheticEvent) => void;
  onDragEnter: (e: React.SyntheticEvent) => void;
  onDrop: (e: React.SyntheticEvent) => void;
};

const DraggableElement = ({
  variable,
  onDragStart,
  onDragEnter,
  onDrop,
}: DraggableElementProps) => {
  return (
    <FlexContainer
      width='70px'
      height='50px'
      draggable
      style={{ border: '1px solid white', cursor: 'move' }}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
    >
      <p style={{ color: 'white' }}>{variable.name}</p>
    </FlexContainer>
  );
};

export default DraggableElement;
