import React, { useEffect, useState } from 'react';

import NeumorphicBasicButton from '@/components/Buttons/Neumorphics/NeumorphicBasicButton';
import SubmitForm from '@/components/Buttons/SubmitForm';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import ClassicFlashcard from '@/components/Flashcard/Classic';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import NewFlashcardSelectors from '@/components/NewFlashcardSelectors/NewFlashcardSelectors';
import SectionTitle from '@/components/Texts/SectionTitle';
import { createNewFlashcardInDb } from '@/database/createInDB';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { addFlashcard } from '@/redux/folders/FolderSlice';
import { removeSpecialChars } from '@/utils/dataFormatting';
import Smart from '@/components/Flashcard/Smart';

type Props = {};

const Flashcard = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { activeDeck, activeFolder } = useAppSelector((state) => state.folders);
  const [isFrontActive, setIsFrontActive] = useState(true);
  const [typeOfFlashcard, setTypeOfFlashcard] = useState('classic');
  const [paramsAreCollapsed, setParamsAreCollapsed] = useState(true);
  const [flashcardData, setFlashcardData] = useState({
    front: '',
    back: '',
  });

  const handleCreateNewFlashcard = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email || !activeDeck || !activeFolder) {
      return toast.error(
        'Oops There was a problem with the folders, can you reload and try again please ? '
      );
    }

    const { success, error } = await createNewFlashcardInDb(
      email,
      activeFolder,
      activeDeck,
      typeOfFlashcard,
      flashcardData
    );

    if (success) {
      const { front, back } = flashcardData;
      toast.success('Flashcard created successfully');
      setFlashcardData({ front: '', back: '' });
      dispatch(
        addFlashcard({
          title: removeSpecialChars(front),
          deckId: removeSpecialChars(activeDeck),
          front: front,
          typeOfFlashcard,
          back: back,
          folderId: removeSpecialChars(activeFolder),
        })
      );
    } else {
      toast.error(error);
    }
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

        <NewFlashcardSelectors
          typeOfFlashcard={typeOfFlashcard}
          setTypeOfFlashcard={setTypeOfFlashcard}
          isCollapsed={paramsAreCollapsed}
          setIsCollapsed={setParamsAreCollapsed}
        />

        <InsetNeumorphicContainer
          width='80%'
          height={paramsAreCollapsed ? '50%' : '70%'}
          style={{ marginTop: '40px', transition: 'all 0.2s ease-in-out' }}
        >
          <form
            style={{ width: '100%', height: '100%' }}
            onSubmit={handleCreateNewFlashcard}
          >
            {typeOfFlashcard === 'classic' && (
              <FlexContainer width='100%' height='100%' flexDirection='column'>
                <FlexContainer width='50%' height='50px'>
                  <NeumorphicBasicButton
                    text='Front'
                    active={isFrontActive}
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      setIsFrontActive(true);
                    }}
                  />
                  <NeumorphicBasicButton
                    text='Back'
                    active={!isFrontActive}
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      setIsFrontActive(false);
                    }}
                  />
                </FlexContainer>
                <ClassicFlashcard
                  front={flashcardData.front}
                  setFront={(e: { target: { value: string } }) =>
                    setFlashcardData({
                      ...flashcardData,
                      front: e.target.value,
                    })
                  }
                  back={flashcardData.back}
                  setBack={(e: { target: { value: string } }) =>
                    setFlashcardData({ ...flashcardData, back: e.target.value })
                  }
                  isFlipped={!isFrontActive}
                  editable
                />

                <SubmitForm title='Save' />
              </FlexContainer>
            )}
            {typeOfFlashcard === 'smart' && (
              <FlexContainer width='100%' height='100%' flexDirection='column'>
                <FlexContainer width='50%' height='50px'>
                  <NeumorphicBasicButton
                    text='Front'
                    active={isFrontActive}
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      setIsFrontActive(true);
                    }}
                  />
                  <NeumorphicBasicButton
                    text='Back'
                    active={!isFrontActive}
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      setIsFrontActive(false);
                    }}
                  />
                </FlexContainer>
                <Smart />

                <SubmitForm title='Save' />
              </FlexContainer>
            )}
          </form>
        </InsetNeumorphicContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Flashcard;
