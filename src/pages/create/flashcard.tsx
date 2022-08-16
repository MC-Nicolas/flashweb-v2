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
import { variablesWithIdType } from '@/types/smartCard';
import { setAllVariables } from '@/redux/smartCard/smartCardSlice';
import MCQ from '@/components/Flashcard/MCQ/MCQ';
import { MCQAnswerType } from '@/types/mcq';
import { resetMCQFlashcard } from '@/redux/mcqFlashcard/mcqFlashcardSlice';

type Props = {};

const Flashcard = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  const { activeDeck, activeFolder } = useAppSelector((state) => state.folders);

  const { front, back } = useAppSelector((state) => state.mcqcard);
  const { variables } = useAppSelector((state) => state.smartcard);
  const [isFrontActive, setIsFrontActive] = useState(true);
  const [typeOfFlashcard, setTypeOfFlashcard] = useState('classic');
  const [paramsAreCollapsed, setParamsAreCollapsed] = useState(true);
  const [flashcardData, setFlashcardData] = useState<
    | { front: string; back: string }
    | { front: string; back: { answers: MCQAnswerType[] } }
    | {
        front: { variables: variablesWithIdType[] };
        back: { variables: variablesWithIdType[] };
      }
  >({
    front: '',
    back: '',
  });

  const handleCreateNewFlashcard = async (
    e?: React.SyntheticEvent,
    variables?: variablesWithIdType[],
    qcmFlashcard?: { front: string; back: MCQAnswerType[] }
  ) => {
    if (e) e.preventDefault();

    if (!variables && !qcmFlashcard) {
      if (flashcardData.front === '') {
        return toast.error(
          'Looks like you forgot to write something on the front of the flashcard.'
        );
      }
      if (flashcardData.back === '') {
        return toast.error(
          'Looks like you forgot to write something on the back of the flashcard.'
        );
      }
      //@ts-ignore
    } else if (variables?.length > 0 && !qcmFlashcard) {
      // find at leat one variable of type result
      if (!variables?.find((variable) => variable.type === 'result')) {
        return toast.error(
          'Looks like you forgot to give a result for your smartcard.'
        );
      }
    } else {
      if (qcmFlashcard?.front === '') {
        return toast.error(
          'Looks like you forgot to write something on the front of the flashcard.'
        );
      }
      // @ts-ignore
      if (qcmFlashcard?.back?.length < 2) {
        return toast.error(
          'Looks like you forgot to write something on the back of the flashcard.'
        );
      }
    }

    if (!email || !activeDeck || !activeFolder) {
      return toast.error(
        'Oops There was a problem with the folders, can you reload and try again please ? '
      );
    }

    let flashcardDataForDB: any = undefined;
    if (variables)
      flashcardDataForDB = { front: { variables }, back: { variables } };
    if (qcmFlashcard)
      flashcardDataForDB = {
        front: qcmFlashcard.front,
        back: qcmFlashcard.back,
      };
    if (!variables && !qcmFlashcard) flashcardDataForDB = flashcardData;

    const { success, error } = await createNewFlashcardInDb(
      email,
      activeFolder,
      activeDeck,
      typeOfFlashcard,
      flashcardDataForDB
    );

    if (success) {
      const { front, back } = flashcardData;
      toast.success('Flashcard created successfully');
      setFlashcardData({ front: '', back: '' });
      dispatch(setAllVariables([]));
      dispatch(resetMCQFlashcard());
      if (typeof front === 'string') {
        // ! TODO generate title for smartcard and mcq
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
      }
    } else {
      toast.error(error);
    }
  };

  const handleSaveSmartcard = (type: string) => {
    if (type === 'smart') {
      handleCreateNewFlashcard(undefined, variables);
    } else if (type === 'mcq') {
      handleCreateNewFlashcard(undefined, undefined, { front, back });
    }
  };

  return (
    <PageContainerWithNav pageTitle='GLP - New Flashcard'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
        style={{ flexWrap: 'nowrap' }}
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
          style={{
            marginTop: '40px',
            transition: 'all 0.2s ease-in-out',
          }}
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
                  //@ts-ignore
                  front={flashcardData.front}
                  setFront={(e: { target: { value: string } }) =>
                    setFlashcardData({
                      ...flashcardData,
                      //@ts-ignore
                      front: e.target.value,
                    })
                  }
                  //@ts-ignore
                  back={flashcardData.back}
                  setBack={(e: { target: { value: string } }) =>
                    //@ts-ignore
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
                <Smart isFrontActive={isFrontActive} />

                <SubmitForm
                  title='Save'
                  onClick={() => handleSaveSmartcard('smart')}
                />
              </FlexContainer>
            )}
            {typeOfFlashcard === 'mcq' && (
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
                <MCQ isFrontActive={isFrontActive} />

                <SubmitForm
                  title='Save'
                  onClick={() => handleSaveSmartcard('mcq')}
                />
              </FlexContainer>
            )}
          </form>
        </InsetNeumorphicContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Flashcard;
