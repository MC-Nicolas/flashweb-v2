import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

import styles from './Inputs.module.scss';

interface WhiteBasicInputProps {
  label: string;
  value: string;
  onChange: any;
  width?: string;
  style?: {};
  required?: boolean;
  type?: string;
  isTextArea?: boolean;
}

const WhiteBasicInput = ({
  label,
  value,
  onChange,
  width = '100%',
  style = {},
  required,
  type = 'text',
  isTextArea = false,
}: WhiteBasicInputProps) => {
  return (
    <FlexContainer
      style={{ ...style, width }}
      flexDirection='column'
      height='80px'
      alignItems='flex-start'
      flexWrap='nowrap'
    >
      <label style={{ color: 'white', letterSpacing: '2px' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}{' '}
      </label>
      {isTextArea ? (
        <textarea
          style={{ width: '100%' }}
          className={styles.whiteBasicInput}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type={type}
          className={styles.whiteBasicInput}
          onChange={onChange}
          value={value}
        />
      )}
    </FlexContainer>
  );
};

export default WhiteBasicInput;
