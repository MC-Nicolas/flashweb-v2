import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';

type NeumorphicTableProps = {
  width?: string;
  headerElements: string[];
  data: string[][];
  style?: {};
  height?: string;
};

const NeumorphicTable = ({
  width = '100%',
  headerElements,
  data,
  style = {},
  height = 'auto',
}: NeumorphicTableProps) => {
  return (
    <FlexContainer
      width={width}
      height={height}
      flexDirection='column'
      flexWrap='nowrap'
      justifyContent='flex-start'
      style={{ ...style, overflowY: 'auto' }}
    >
      <HeaderRow headerElements={headerElements} />
      {data.map((el, index) => (
        <DataRow key={index} element={el} />
      ))}
    </FlexContainer>
  );
};

export default NeumorphicTable;
