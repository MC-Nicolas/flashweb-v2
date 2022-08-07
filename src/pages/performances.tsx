import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import SectionTitle from '@/components/Texts/SectionTitle';
import React from 'react';

type Props = {};

const Performances = (props: Props) => {
  return (
    <PageContainerWithNav pageTitle='Performances'>
      <FlexContainer height='100px'>
        <SectionTitle title='Performances' color='white' />
      </FlexContainer>
      <FlexContainer>
        <p>Performances</p>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Performances;
