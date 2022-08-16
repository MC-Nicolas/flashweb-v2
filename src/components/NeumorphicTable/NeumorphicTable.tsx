import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';

type NeumorphicTableProps = {
  width?: string;
  height?: string;
  headerElements: string[];
  data: string[][];
  style?: {};
};

const NeumorphicTable = ({
  width = '100%',
  height = '100%',
  headerElements,
  data,
  style = {},
}: NeumorphicTableProps) => {
  return (
    <FlexContainer
      width={width}
      height='auto'
      flexDirection='column'
      flexWrap='nowrap'
      justifyContent='flex-start'
      style={{ ...style }}
    >
      <HeaderRow headerElements={headerElements} />
      {data.map((el, index) => (
        <DataRow key={index} element={el} />
      ))}
    </FlexContainer>
  );
};

export default NeumorphicTable;
