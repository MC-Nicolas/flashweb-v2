import { deleteFlashcardFromDB } from '@/database/deleteInDB';
import {
  setFlashcardToEdit,
  setModalIsOpen,
  setNameOfElementToEdit,
  setTypeOfElementToEdit,
  setTypeOfFlashcard,
} from '@/redux/editModal/editModalSlice';
import { removeFlashcard, setDecksOptions } from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { FlashcardType } from '@/types/folders';
import { variablesWithIdType } from '@/types/smartCard';
import {
  findIndexOfDeck,
  findIndexOfFolder,
  removeSpecialChars,
} from '@/utils/dataFormatting';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClassicFlashcard from '../Flashcard/Classic';
import FlexContainer from '../FlexContainer/FlexContainer';
import Smartcard from './components/Smartcard';

import MCQFlashcard from './components/MCQFlashcard';
import FoldersSelectors from './components/FoldersSeletors/FoldersSeletors';
import EmptyDeck from './components/EmptyDeck/EmptyDeck';

const Flashcards = () => {
  const dispatch = useAppDispatch();
  const [flashcards, setFlashcards] = useState<any>([]);

  const { email } = useAppSelector((state) => state.user);
  const { folders, activeFolder, activeDeck } = useAppSelector(
    (state) => state.folders
  );

  useEffect(() => {
    if (folders && activeFolder && activeDeck) {
      const folderIndex = findIndexOfFolder(folders, activeFolder);
      if (folderIndex === -1) return;

      if (folders[folderIndex]?.decks?.length === 0)
        dispatch(setDecksOptions([]));

      const deckIndex = findIndexOfDeck(folders, activeFolder, activeDeck);
      if (deckIndex === -1) return;

      const deck = folders[folderIndex].decks[deckIndex];

      if (deck.flashcards.length > 0) {
        setFlashcards(deck.flashcards);
      } else {
        setFlashcards([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    dispatch(setModalIsOpen(true));
    dispatch(setNameOfElementToEdit('My Flashcard'));
    dispatch(setFlashcardToEdit({ front, back }));
    dispatch(setTypeOfFlashcard(typeOfFlashcard));
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
      <FoldersSelectors />
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
                  style={{ fontSize: '18px' }}
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
            } else if (typeOfFlashcard === 'mcq') {
              return (
                <MCQFlashcard
                  key={front}
                  front={front}
                  back={back}
                  onDelete={() => {
                    dispatch(setTypeOfFlashcard('mcq'));
                    handleOnDeleteFlashcard(removeSpecialChars(front));
                  }}
                  onEdit={() => handleOnEditFlashcard('mcq', front, back)}
                />
              );
            }
          })
        ) : (
          <EmptyDeck />
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

export default Flashcards;
