import React from 'react';

export interface FlexContainerProps {
  children: any;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-evenly'
    | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
  gap?: string;
  width?: string;
  height?: string;
  isTest?: boolean;
  theme?: any;
  style?: any;
  className?: any;
  draggable?: boolean;
  onDragStart?: any;
  onDragEnter?: any;
  onDrop?: any;
}

const FlexContainer = ({
  children,
  width = '100%',
  height = '100%',
  justifyContent = 'space-evenly',
  alignItems = 'center',
  flexDirection = 'row',
  flexWrap = 'wrap',
  gap = '5px',
  isTest,
  style = {},
  className,
  ...rest
}: FlexContainerProps) => {
  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
        backgroundColor: isTest ? 'red' : '',
        ...style,
      }}
      className={className}
      {...rest}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
