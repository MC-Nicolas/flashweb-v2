import React from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';

import Variables from './components/Variables/Variables';
import CloseContainer from './components/CloseContainer/CloseContainer';

const SmartcardModal = () => {
  return (
    <FlexContainer
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '10px',
        backdropFilter: 'blur(5px)',
      }}
    >
      <NeumorphicContainer
        width='50%'
        height='50%'
        style={{ padding: '10px 30px' }}
      >
        <CloseContainer />
        <FlexContainer justifyContent='flex-start' alignItems='flex-start'>
          <Variables />
        </FlexContainer>
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default SmartcardModal;
