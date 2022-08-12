import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import React, { useEffect, useState } from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';
import CloseIcon from '@mui/icons-material/Close';
import {
  setClassicFlashcard,
  setFlashcardIsFlipped,
  setModalIsOpen,
} from '@/redux/editModal/editModalSlice';
import SectionTitle from '../Texts/SectionTitle';
import BasicInput from '../Inputs/BasicInput';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { modifyFolderTitleInDB } from '@/database/createInDB';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { Checkbox, FormControlLabel } from '@mui/material';
import { DeckType, FolderType } from '@/types/folders';
import {
  updateDeckInDB,
  updateClassicFlashcardInDB,
} from '@/database/updateInDB';
import toast from 'react-hot-toast';
import {
  addFlashcard,
  removeFlashcard,
  updateDeckIsImportant,
} from '@/redux/folders/FolderSlice';
import ClassicFlashcard from '../Flashcard/Classic';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const EditModal = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [deckIsImportant, setDeckIsImportant] = useState(false);
  const [typeOfFlashcardToEdit, setTypeOfFlashcardToEdit] = useState('classic');
  const [initialFlashcardFront, setInitialFlashcardFront] = useState('');

  const { email } = useAppSelector((state) => state.user);
  const {
    isOpen,
    typeOfElementToEdit,
    nameOfElementToEdit,
    typeOfFlashcard,
    classicFlashcard,
    flashcardIsFlipped,
  } = useAppSelector((state) => state.editModal);
  const { folders, activeFolder, activeDeck } = useAppSelector(
    (state) => state.folders
  );

  useEffect(() => {
    const folderIndex = folders.findIndex(
      (folder: FolderType) =>
        removeSpecialChars(folder.title) === removeSpecialChars(activeFolder)
    );

    if (folderIndex === -1) return;
    const deckIndex = folders[folderIndex].decks.findIndex(
      (deck: DeckType) =>
        removeSpecialChars(deck.id) === removeSpecialChars(nameOfElementToEdit)
    );
    if (deckIndex === -1) return;

    const deck = folders[folderIndex].decks[deckIndex];

    setTitle(deck.title);
    setDeckIsImportant(deck.isImportant);
  }, [activeFolder, nameOfElementToEdit, folders]);

  useEffect(() => {
    setTitle(nameOfElementToEdit);
  }, [nameOfElementToEdit]);

  const handleSaveEdit = async () => {
    if (typeOfElementToEdit === 'folder') {
      await modifyFolderTitleInDB(
        email,
        removeSpecialChars(nameOfElementToEdit)
      );
    } else if (typeOfElementToEdit === 'deck') {
      const { error, success } = await updateDeckInDB(
        email,
        removeSpecialChars(activeFolder),
        removeSpecialChars(nameOfElementToEdit),
        deckIsImportant
      );
      if (success) {
        toast.success('Deck updated successfully');
        dispatch(
          updateDeckIsImportant({
            folderId: activeFolder,
            deckId: nameOfElementToEdit,
            isImportant: deckIsImportant,
          })
        );
      } else {
        toast.error('Oops, something went wrong');
      }
    } else if (typeOfElementToEdit === 'flashcard') {
      if (typeOfFlashcardToEdit === 'classic') {
        const { error, success } = await updateClassicFlashcardInDB(
          email,
          removeSpecialChars(activeFolder),
          removeSpecialChars(activeDeck),
          removeSpecialChars(classicFlashcard.front),
          classicFlashcard,
          removeSpecialChars(initialFlashcardFront)
        );
        if (success) {
          dispatch(
            removeFlashcard({
              folderId: activeFolder,
              deckId: activeDeck,
              flashcardId: initialFlashcardFront,
            })
          );
          dispatch(
            addFlashcard({
              typeOfFlashcard: 'classic',
              deckId: activeDeck,
              front: classicFlashcard.front,
              back: classicFlashcard.back,
              folderId: activeFolder,
            })
          );
          toast.success('Flashcard updated successfully');
        } else {
          toast.error('Oops, something went wrong');
        }
      }
    }
    dispatch(setModalIsOpen(false));
  };

  useEffect(() => {
    setInitialFlashcardFront(classicFlashcard['front']);
  }, [isOpen]);

  return (
    <FlexContainer
      style={{
        position: 'fixed',
        textAlign: 'center',
        zIndex: 100000,
        backdropFilter: 'blur(10px)',
        color: 'white',
        display: isOpen ? 'flex' : 'none',
      }}
      width='100%'
      height='100%'
    >
      <NeumorphicContainer width='500px' height='500px'>
        <FlexContainer
          height='50px'
          justifyContent='flex-end'
          style={{ paddingRight: 30 }}
        >
          <CloseIcon
            onClick={() => dispatch(setModalIsOpen(false))}
            sx={{ cursor: 'pointer' }}
          />
        </FlexContainer>
        <SectionTitle title={nameOfElementToEdit} />
        <FlexContainer height='80%'>
          {typeOfElementToEdit === 'folder' && (
            <BasicInput
              label='Title'
              placeholder='New Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}

          {typeOfElementToEdit === 'deck' && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: 'white' }}
                    checked={deckIsImportant}
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
            </>
          )}
          {typeOfElementToEdit === 'flashcard' &&
            typeOfFlashcard === 'classic' && (
              <FlexContainer flexDirection='column'>
                <ClassicFlashcard
                  editable
                  front={classicFlashcard.front}
                  setFront={(e: any) =>
                    dispatch(
                      setClassicFlashcard({
                        ...classicFlashcard,
                        front: e.target.value,
                      })
                    )
                  }
                  setBack={(e: any) =>
                    dispatch(
                      setClassicFlashcard({
                        ...classicFlashcard,
                        back: e.target.value,
                      })
                    )
                  }
                  back={classicFlashcard.back}
                  isFlipped={flashcardIsFlipped}
                />
                <ButtonWithIcon
                  style={{
                    backgroundColor: 'white',
                    width: '150px',
                    color: 'black',
                  }}
                  title='Flip'
                  iconIsComponent
                  iconPosition='right'
                  icon={<SwapHorizIcon />}
                  onClick={() =>
                    dispatch(setFlashcardIsFlipped(!flashcardIsFlipped))
                  }
                />
              </FlexContainer>
            )}
          <ButtonWithIcon
            style={{ backgroundColor: 'green', width: '200px' }}
            title='Save'
            iconIsComponent
            iconPosition='right'
            icon={<ArrowRightAltIcon />}
            onClick={handleSaveEdit}
          />
        </FlexContainer>
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default EditModal;
