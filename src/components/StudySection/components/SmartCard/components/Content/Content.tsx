import FlexContainer from '@/components/FlexContainer/FlexContainer';
import React from 'react';

type ContentProps = {
  variables: any;
};

const Content = ({ variables }: ContentProps) => {
  return (
    <FlexContainer height='70%' justifyContent='space-evenly'>
      <p style={{ color: 'white', fontSize: '22px', letterSpacing: 2 }}>
        {variables.map((variable: any) => {
          if (variable.type !== 'result' && variable.isVisible) {
            return `${variable.value}${variable.symbol} `;
          }
        })}
      </p>
    </FlexContainer>
  );
};

export default Content;
