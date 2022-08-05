import React from 'react';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import SectionTitle from '@/components/Texts/SectionTitle';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import ImportantFolderTable from '@/components/ImportantFolderTable/ImportantFolderTable';
import Rechart from '@/components/Highchart/Highchart';
import Highchart from '@/components/Highchart/Highchart';

const Dashboard = () => {
  return (
    <PageContainerWithNav pageTitle='Dashboard'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='Dashboard' color='white' />
        </FlexContainer>
        <NeumorphicContainer
          width='80%'
          height='300px'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Highchart />
        </NeumorphicContainer>
        <FlexContainer width='80%' height='40%' style={{ marginTop: '50px' }}>
          <ImportantFolderTable />
        </FlexContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Dashboard;
