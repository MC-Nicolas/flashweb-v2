import { deleteFlashcardFromDB } from '@/database/deleteInDB';
import { setTypeOfElementToEdit } from '@/redux/editModal/editModalSlice';
import {
  removeFlashcard,
  setActiveDeck,
  setActiveFolder,
} from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { FlashcardType } from '@/types/folders';
import { removeSpecialChars } from '@/utils/dataFormatting';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClassicFlashcard from '../Flashcard/Classic';
import FlexContainer from '../FlexContainer/FlexContainer';
import Select from '../Inputs/Select';

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
      if (deck.flashcards.length > 0) setFlashcards(deck.flashcards);
    }
  }, [folders, activeFolder, activeDeck]);

  useEffect(() => {
    dispatch(setTypeOfElementToEdit('flashcard'));
  }, []);

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
              // ! TODO handle on click on icons in flashcards
              // Use deleteField() from firestore to delete flashcard from db with updateDoc()
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
                  onEdit={() => {}}
                />
              );
            }
          })
        ) : (
          <h2>No flashcards found</h2>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

export default Flashcards;
