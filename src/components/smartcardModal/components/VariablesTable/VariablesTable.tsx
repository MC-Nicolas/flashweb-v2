import React from 'react';

import BasicTable from '@/components/BasicTable/BasicTable';
import FlexContainer from '@/components/FlexContainer/FlexContainer';

const VariablesTable = () => {
  return (
    <FlexContainer
      height='300px'
      style={{ position: 'absolute', top: '20%', zIndex: 1000 }}
    >
      <BasicTable />
    </FlexContainer>
  );
};

export default VariablesTable;
