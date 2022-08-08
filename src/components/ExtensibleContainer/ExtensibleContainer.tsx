import { KeyboardArrowDown } from '@mui/icons-material';
import React, { useState } from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';
import SectionDescription from '../Texts/SectionDescription';

type ExtensibleContainerProps = {
  closedText: string;
  children: any;
  style?: {};
};

const ExtensibleContainer = ({
  closedText,
  children,
  style,
}: ExtensibleContainerProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <NeumorphicContainer
      width='80%'
      height={isCollapsed ? '300px' : '70px'}
      style={{
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        ...style,
      }}
    >
      <KeyboardArrowDown
        sx={{
          color: 'white',
          position: 'absolute',
          right: 15,
          top: 15,
          cursor: 'pointer',
          transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      {isCollapsed ? (
        <FlexContainer style={{ transition: 'transform 0.2s ease-in-out' }}>
          {children}
        </FlexContainer>
      ) : (
        <FlexContainer
          style={{
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out',
          }}
        >
          <SectionDescription description={closedText} color='white' />
        </FlexContainer>
      )}
    </NeumorphicContainer>
  );
};

export default ExtensibleContainer;
