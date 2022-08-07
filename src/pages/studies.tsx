import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import React, { useState } from 'react';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import SectionTitle from '@/components/Texts/SectionTitle';
import Select from '@/components/Inputs/Select';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setActiveFolder } from '@/redux/folders/FolderSlice';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import StudiesContent from '@/components/StudiesContent/StudiesContent';

type Props = {};

const Studies = (props: Props) => {
  const dispatch = useAppDispatch();
  const [activeType, setActiveType] = useState('folders');
  const { activeFolder, activeDeck, foldersOptions, decksOptions } =
    useAppSelector((state) => state.folders);
  return (
    <PageContainerWithNav pageTitle='My Studies'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='My Studies' color='white' />
        </FlexContainer>

        <NeumorphicContainer
          width='80%'
          height='150px'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            paddingBottom: '30px',
          }}
        >
          <Select
            width='200px'
            label='Type'
            value={activeType}
            options={[
              { value: 'folders', name: 'Folders' },
              { value: 'decks', name: 'Decks' },
              { value: 'flashcards', name: 'Flashcards' },
            ]}
            onChange={(e) => setActiveType(e.target.value)}
          />
        </NeumorphicContainer>
        <InsetNeumorphicContainer
          width='80%'
          height='60vh'
          style={{ marginTop: '50px' }}
        >
          <StudiesContent contentType={activeType.toLowerCase()} />
        </InsetNeumorphicContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Studies;
