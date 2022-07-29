import React from 'react';

import styles from './PageContainer.module.scss';

interface PageContainerProps {
  children: any;
  width?: string;
  height?: string;
  style?: {};
}

const PageContainer = ({
  children,
  width = '100vw',
  height = '100vh',
  style,
}: PageContainerProps) => {
  return (
    <div className={styles.pageContainer} style={{ width, height, ...style }}>
      {children}
    </div>
  );
};

export default PageContainer;
