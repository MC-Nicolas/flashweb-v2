import { deleteFlashcardFromDB } from '@/database/deleteInDB';
import {
  setClassicFlashcard,
  setModalIsOpen,
  setNameOfElementToEdit,
  setTypeOfElementToEdit,
  setTypeOfFlashcard,
} from '@/redux/editModal/editModalSlice';
import {
  removeFlashcard,
  setActiveDeck,
  setActiveFolder,
} from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { FlashcardType } from '@/types/folders';
import { variablesWithIdType } from '@/types/smartCard';
import { removeSpecialChars } from '@/utils/dataFormatting';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClassicFlashcard from '../Flashcard/Classic';
import FlexContainer from '../FlexContainer/FlexContainer';
import Select from '../Inputs/Select';
import Smartcard from './components/Smartcard';
import RadarIcon from '@mui/icons-material/Radar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';

type Props = {};

const Flashcards = (props: Props) => {
  const dispatch = useAppDispatch();

  const { email } = useAppSelector((state) => state.user);
  const { folders, activeFolder, activeDeck, foldersOptions, decksOptions } =
    useAppSelector((state) => state.folders);

  const [flashcards, setFlashcards] = useState<any>([]);

  useEffect(() => {
    if (folders && activeFolder && activeDeck) {
      const folderIndex = folders.findIndex(
        (folder: any) =>
          removeSpecialChars(folder.title) === removeSpecialChars(activeFolder)
      );

      if (folderIndex === -1) return;
      const deckIndex = folders[folderIndex].decks.findIndex(
        (deck: any) =>
          removeSpecialChars(deck.id) === removeSpecialChars(activeDeck)
      );
      if (deckIndex === -1) return;

      const deck = folders[folderIndex].decks[deckIndex];
      if (deck.flashcards.length > 0) {
        setFlashcards(deck.flashcards);
      } else {
        setFlashcards([]);
      }
    }
  }, [folders, activeFolder, activeDeck]);

  useEffect(() => {
    dispatch(setTypeOfElementToEdit('flashcard'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEditFlashcard = (
    typeOfFlashcard: string,
    front: string,
    back: string
  ) => {
    dispatch(setTypeOfFlashcard(typeOfFlashcard));
    dispatch(setModalIsOpen(true));
    dispatch(setNameOfElementToEdit('My Flashcard'));
    dispatch(setClassicFlashcard({ front, back }));
  };

  const handleOnDeleteFlashcard = async (flashcardID: string) => {
    let confirm = window.confirm(
      'Are you sure you want to delete this flashcard?'
    );

    if (!confirm) return;
    const { success, error } = await deleteFlashcardFromDB(
      email,
      removeSpecialChars(activeFolder),
      removeSpecialChars(activeDeck),
      flashcardID
    );
    if (success) {
      dispatch(
        removeFlashcard({
          folderId: removeSpecialChars(activeFolder),
          deckId: removeSpecialChars(activeDeck),
          flashcardId: flashcardID,
        })
      );
      const newFlashcards = flashcards.filter(
        (flashcard: FlashcardType) =>
          flashcard.flashcardData.front !== flashcardID
      );
      setFlashcards(newFlashcards);
      toast.success('Flashcard deleted successfully');
    } else {
      toast.error('Oops something went wrong while deleting flashcard');
    }
  };

  return (
    <FlexContainer style={{ padding: '20px 0' }}>
      <FlexContainer height='150px' width='700px'>
        <Select
          width='200px'
          label='Folder'
          options={foldersOptions}
          value={activeFolder}
          onChange={(e) => dispatch(setActiveFolder(e.target.value))}
        />
        <Select
          width='200px'
          label='Deck'
          options={decksOptions}
          value={activeDeck}
          onChange={(e) => dispatch(setActiveDeck(e.target.value))}
        />
      </FlexContainer>
      <FlexContainer
        height='75%'
        flexWrap='wrap'
        style={{ overflowY: 'scroll' }}
      >
        {flashcards.length > 0 ? (
          flashcards.map((flashcard: FlashcardType) => {
            const { front, back } = flashcard.flashcardData;
            const { typeOfFlashcard } = flashcard;
            if (typeOfFlashcard === 'classic') {
              return (
                <ClassicFlashcard
                  key={front}
                  height='300px'
                  width='300px'
                  front={front}
                  back={back}
                  showEditIcons
                  isFlipped={false}
                  onDelete={() =>
                    handleOnDeleteFlashcard(removeSpecialChars(front))
                  }
                  onEdit={() => handleOnEditFlashcard('classic', front, back)}
                />
              );
            } else if (typeOfFlashcard === 'smart') {
              // ! TODO HANdle smart flashcards with its own component
              return (
                <FlexContainer width='85%' key={Math.random() * 100000}>
                  <Smartcard
                    data={front}
                    onDelete={() => {
                      //@ts-ignore
                      const results = front.variables.filter(
                        (variable: variablesWithIdType) =>
                          variable.type === 'result'
                      );
                      const flashcardTitle = `${removeSpecialChars(
                        results[results.length - 1].name
                      ).toLowerCase()}`;

                      handleOnDeleteFlashcard(flashcardTitle);
                    }}
                    onEdit={() => handleOnEditFlashcard('smart', front, back)}
                  />
                </FlexContainer>
              );
            }
          })
        ) : (
          <FlexContainer
            flexDirection='column'
            justifyContent='center'
            style={{ textAlign: 'center' }}
          >
            <h2
              style={{
                color: 'white',
                letterSpacing: '2px',
                marginBottom: '20px',
              }}
            >
              Seems like you don&apos;t have any flashcard here, want to create
              some ?{' '}
            </h2>
            <Link href='/create/flashcard'>
              <AddCircleIcon
                sx={{ color: 'green', fontSize: '50px', cursor: 'pointer' }}
              />
            </Link>
          </FlexContainer>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

export default Flashcards;
