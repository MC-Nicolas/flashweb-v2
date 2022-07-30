import React, { useState } from 'react';

import SubmitForm from '@/components/Buttons/SubmitForm';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import BasicInput from '@/components/Inputs/BasicInput';
import SectionTitle from '@/components/Texts/SectionTitle';

type Props = {};

const Folder = (props: Props) => {
  const [folderName, setFolderName] = useState('');

  const handleCreateNewFolder = () => {
    console.log(folderName);
  };
  return (
    <PageContainerWithNav pageTitle='GLP - New Folder'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='New Folder' color='white' />
        </FlexContainer>
        <FlexContainer width='80%' height='80%'>
          <NeumorphicContainer
            width='80%'
            height='400px'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <form
              onSubmit={handleCreateNewFolder}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <BasicInput
                label="Folder's name"
                placeholder='Math'
                value={folderName}
                onChange={(e: { target: { value: string } }) =>
                  setFolderName(e.target.value)
                }
              />
              <SubmitForm title='Save' />
            </form>
          </NeumorphicContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Folder;
