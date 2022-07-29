import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

import styles from './Inputs.module.scss';

interface BasicInputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
}

const BasicInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
}: BasicInputProps) => {
  return (
    <FlexContainer
      width='70%'
      height='80px'
      flexDirection='column'
      alignItems='flex-start'
      flexWrap='nowrap'
    >
      <label>{label} </label>
      <input
        className={styles.basicInput}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
    </FlexContainer>
  );
};

export default BasicInput;
