import { KeyboardArrowDown } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
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
  const modalRef: any = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      console.log('clicked');
      if (modalRef.current && !isCollapsed) {
        setIsCollapsed(true);
      }
    };
    const modal = modalRef.current;

    if (modal) {
      modal.addEventListener('click', handleClick);
    }

    return () => {
      if (modal) {
        modal.removeEventListener('click', handleClick);
      }
    };
  }, [isCollapsed]);

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
          <div
            ref={modalRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <SectionDescription description={closedText} color='white' />
          </div>
        </FlexContainer>
      )}
    </NeumorphicContainer>
  );
};

export default ExtensibleContainer;
