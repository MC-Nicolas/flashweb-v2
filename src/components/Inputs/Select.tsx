import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

import styles from './Inputs.module.scss';

type SelectProps = {
  label: string;
  options: { name: string; value: string }[];
  width?: string;
};

const Select = ({ label, options, width = '100%' }: SelectProps) => {
  return (
    <FlexContainer height='50px' width={width} justifyContent='flex-start'>
      <label
        className={styles.label}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {label}
        <select className={styles.neumorphicSelect}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </FlexContainer>
  );
};

export default Select;
