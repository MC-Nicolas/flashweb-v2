import React from 'react';

import styles from './InsetNeumorphicContainer.module.scss';

type InsetNeumorphicContainerProps = {
  children: any;
  width?: string;
  height?: string;
  style?: {};
};

const InsetNeumorphicContainer = ({
  children,
  width = '100%',
  height = '100%',
  style = {},
}: InsetNeumorphicContainerProps) => {
  return (
    <div
      className={styles.insetNeumorphicContainer}
      style={{ width, height, ...style }}
    >
      {children}
    </div>
  );
};

export default InsetNeumorphicContainer;
