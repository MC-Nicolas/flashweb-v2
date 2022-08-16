import React from 'react';
import styles from './NeumorphicContainer.module.scss';

const NeumorphicContainer = ({
  children,
  style = {},
  width = '100%',
  height = '100%',
  ...rest
}: {
  children: any;
  style?: {};
  width?: string;
  height?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={styles.neumorphicContainer}
      style={{ width, height, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default NeumorphicContainer;
