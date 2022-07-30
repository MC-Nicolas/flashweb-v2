import React from 'react';
import styles from './NeumorphicContainer.module.scss';

const NeumorphicContainer = ({
  children,
  style = {},
  width = '100%',
  height = '100%',
}: {
  children: any;
  style?: {};
  width?: string;
  height?: string;
}) => {
  return (
    <div
      className={styles.neumorphicContainer}
      style={{ width, height, ...style }}
    >
      {children}
    </div>
  );
};

export default NeumorphicContainer;
