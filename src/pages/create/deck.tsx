import React, { useEffect, useState } from 'react';

import SubmitForm from '@/components/Buttons/SubmitForm';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import BasicInput from '@/components/Inputs/BasicInput';
import SectionTitle from '@/components/Texts/SectionTitle';
import Select from '@/components/Inputs/Select';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addDeck,
  setActiveDeck,
  setActiveFolder,
  setFoldersOptions,
} from '@/redux/folders/FolderSlice';
import { createNewDeckInDB } from '@/database/createInDB';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { removeSpecialChars } from '@/utils/dataFormatting';

type Props = {};

const Deck = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { foldersOptions, activeFolder } = useAppSelector(
    (state) => state.folders
  );

  const [deckName, setDeckName] = useState('');
  const [deckIsImportant, setDeckIsImportant] = useState(false);

  const handleCreateNewDeck = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { success, error } = await createNewDeckInDB(
      email,
      activeFolder,
      deckName,
      deckIsImportant
    );
    if (success) {
      toast.success('Folder created successfully');
      dispatch(setActiveDeck(deckName));
      dispatch(
        addDeck({
          isImportant: deckIsImportant,
          title: deckName,
          folderId: removeSpecialChars(activeFolder),
        })
      );
      setDeckName('');
      router.push('/create/flashcard');
    }
    error && toast.error(error);
  };

  return (
    <PageContainerWithNav pageTitle='GLP - New Deck'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='New Deck' color='white' />
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
              onSubmit={handleCreateNewDeck}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <Select
                width='70%'
                label='Folder to add to'
                options={foldersOptions}
                value={activeFolder}
                onChange={(e) => dispatch(setActiveFolder(e.target.value))}
              />
              <BasicInput
                label="Deck's name"
                placeholder='Tables'
                value={deckName}
                onChange={(e: { target: { value: string } }) =>
                  setDeckName(e.target.value)
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: 'white' }}
                    value={deckIsImportant}
                    onChange={(e: any) => setDeckIsImportant(e.target.checked)}
                  />
                }
                label={
                  <p
                    style={{
                      color: 'lightgrey',
                      fontSize: '16px',
                      letterSpacing: 1,
                    }}
                  >
                    Want to make this deck part of you daily study ?
                  </p>
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

export default Deck;
