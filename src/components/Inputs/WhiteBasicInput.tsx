import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

import styles from './Inputs.module.scss';

interface WhiteBasicInputProps {
  label: string;
  value: string | number | undefined;
  onChange: any;
  width?: string;
  style?: {};
  inputStyle?: {};
  required?: boolean;
  type?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

const WhiteBasicInput = ({
  label,
  value,
  onChange,
  width = '100%',
  style = {},
  inputStyle = {},
  required,
  type = 'text',
  isTextArea = false,
  placeholder = '',
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
          placeholder={placeholder}
          style={{ ...inputStyle, width: '100%' }}
        />
      )}
    </FlexContainer>
  );
};

export default WhiteBasicInput;
