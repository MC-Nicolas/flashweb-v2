import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

type Props = {};

const Loader = (props: Props) => {
  return (
    <FlexContainer width='100vw' height='100vh'>
      <p>Loading</p>
    </FlexContainer>
  );
};

export default Loader;
