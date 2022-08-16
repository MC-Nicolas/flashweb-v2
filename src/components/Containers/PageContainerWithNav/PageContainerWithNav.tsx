import Head from 'next/head';
import React from 'react';
import FlexContainer from '../../FlexContainer/FlexContainer';
import Navbar from '../../Navbar/Navbar';
import PageContainer from '../../PageContainer/PageContainer';

import styles from './PageContainerWithNav.module.scss';

type PageContainerWithNavProps = {
  pageTitle: string;
  children: any;
  style?: {};
};

const PageContainerWithNav = ({
  pageTitle,
  children,
  style = {},
}: PageContainerWithNavProps) => {
  return (
    <PageContainer style={{ ...style }}>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <FlexContainer flexDirection='row' justifyContent='space-between'>
        <Navbar />
        <div className={styles.pageContainerWithNav}>{children}</div>
      </FlexContainer>
    </PageContainer>
  );
};

export default PageContainerWithNav;
