import NeumorphicBasicButton from '@/components/Buttons/Neumorphics/NeumorphicBasicButton';
import NeumorphicSquaredButton from '@/components/Buttons/Neumorphics/NeumorphicSquaredButton';
import SubmitForm from '@/components/Buttons/SubmitForm';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import BasicInput from '@/components/Inputs/BasicInput';
import Select from '@/components/Inputs/Select';
import SectionTitle from '@/components/Texts/SectionTitle';
import React, { useState } from 'react';

type Props = {};

const Flashcard = (props: Props) => {
  const [deckToAddTo, setDeckToAddTo] = useState('');
  const [folderToAddTo, setFolderToAddTo] = useState('');
  const [isFrontActive, setIsFrontActive] = useState(true);

  const handleCreateNewFlashcard = () => {
    console.log('create new flashcard');
  };
  return (
    <PageContainerWithNav pageTitle='GLP - New Flashcard'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='New Flashcard' color='white' />
        </FlexContainer>
        <NeumorphicContainer width='80%' height='300px'>
          <FlexContainer width='95%' height='50%'>
            <Select
              width='30%'
              label='Folder to add to'
              options={[
                { name: 'PPL', value: 'ppl' },
                { name: 'Math', value: 'math' },
              ]}
            />
            <Select
              width='30%'
              label='Folder to add to'
              options={[
                { name: 'Meteo', value: 'ppl' },
                { name: 'Navigation', value: 'math' },
              ]}
            />
          </FlexContainer>
          <Select
            width='30%'
            label='Type of flashcard'
            options={[
              { name: 'Classic', value: 'ppl' },
              { name: 'QCM', value: 'math' },
            ]}
          />
        </NeumorphicContainer>
        <InsetNeumorphicContainer
          width='80%'
          height='50%'
          style={{ marginTop: '40px' }}
        >
          <FlexContainer width='100%' height='100%' flexDirection='column'>
            <FlexContainer width='50%' height='50px'>
              <NeumorphicBasicButton
                text='Front'
                active={isFrontActive}
                onClick={() => setIsFrontActive(true)}
              />
              <NeumorphicBasicButton
                text='Back'
                active={!isFrontActive}
                onClick={() => setIsFrontActive(false)}
              />
            </FlexContainer>

            <SubmitForm title='Save' />
          </FlexContainer>
        </InsetNeumorphicContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Flashcard;
