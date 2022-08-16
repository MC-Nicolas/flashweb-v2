import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';

type NeumorphicTableProps = {
  width?: string;
  height?: string;
  headerElements: string[];
  data: string[][];
};

const NeumorphicTable = ({
  width = '100%',
  height = '100%',
  headerElements,
  data,
}: NeumorphicTableProps) => {
  return (
    <FlexContainer
      width={width}
      height='auto'
      flexDirection='column'
      flexWrap='nowrap'
      justifyContent='flex-start'
    >
      <HeaderRow headerElements={headerElements} />
      {data.map((el, index) => (
        <DataRow key={index} element={el} />
      ))}
    </FlexContainer>
  );
};

export default NeumorphicTable;
