import React from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';
import SectionTitle from '@/components/Texts/SectionTitle';
import PageContainerWithNav from '../PageContainerWithNav/PageContainerWithNav';

type PageContainerWithNavAndTitleProps = {
  tabTitle: string;
  pageTitle: string;
  children: any;
};

const PageContainerWithNavAndTitle = ({
  tabTitle,
  pageTitle,
  children,
}: PageContainerWithNavAndTitleProps) => {
  return (
    <PageContainerWithNav pageTitle={`GLP - ${tabTitle}`}>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
        flexWrap='nowrap'
      >
        <FlexContainer height='100px'>
          <SectionTitle title={pageTitle} color='white' />
        </FlexContainer>
        {children}
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default PageContainerWithNavAndTitle;
