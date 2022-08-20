import React, { useState } from 'react';

import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import StudiesContent from '@/components/StudiesContent/StudiesContent';
import PageContainerWithNavAndTitle from '@/components/Containers/PageContainerWithNavAndTitle/PageContainerWithNavAndTitle';
import StudiesSelectors from '@/components/StudiesSelectors/StudiesSelectors';

const Studies = () => {
  const [activeType, setActiveType] = useState('folders');

  return (
    <PageContainerWithNavAndTitle
      tabTitle='GLP - Studies'
      pageTitle='My Studies'
    >
      <StudiesSelectors activeType={activeType} setActiveType={setActiveType} />
      <InsetNeumorphicContainer
        width='80%'
        height='60vh'
        style={{ marginTop: '50px' }}
      >
        <StudiesContent contentType={activeType.toLowerCase()} />
      </InsetNeumorphicContainer>
    </PageContainerWithNavAndTitle>
  );
};

export default Studies;
