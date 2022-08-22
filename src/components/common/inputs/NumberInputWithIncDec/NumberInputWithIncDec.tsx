import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface NumberInputWithIncDecType {
  number: number;
  onPlus: any;
  onMinus: any;
}

const NumberInputWithIncDec = ({
  number,
  onPlus,
  onMinus,
}: NumberInputWithIncDecType): JSX.Element => (
  <FlexContainer flexDirection='row' justifyContent='center' flexWrap='nowrap'>
    <button
      style={{
        fontSize: 22,
        backgroundColor: 'white',
        color: 'black',
        height: '30px',
        width: '30px',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.preventDefault();
        onMinus();
      }}
    >
      -
    </button>
    <input
      type='number'
      value={number}
      style={{
        height: 32,
        width: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        padding: '0 10px',
      }}
    />
    <button
      style={{
        fontSize: 24,
        backgroundColor: 'white',
        color: 'black',
        height: '30px',
        width: '30px',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.preventDefault();
        onPlus();
      }}
    >
      +
    </button>
  </FlexContainer>
);

export default NumberInputWithIncDec;
