import { setActiveDeck, setActiveFolder } from '@/redux/folders/FolderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { FlashcardType } from '@/types/folders';
import { removeSpecialChars } from '@/utils/dataFormatting';
import React, { useEffect, useState } from 'react';
import ClassicFlashcard from '../Flashcard/Classic';
import FlexContainer from '../FlexContainer/FlexContainer';
import Select from '../Inputs/Select';

type Props = {};

const Flashcards = (props: Props) => {
  const dispatch = useAppDispatch();
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
              return (
                <ClassicFlashcard
                  key={front}
                  height='300px'
                  width='300px'
                  front={front}
                  back={back}
                  showEditIcons
                  isFlipped={false}
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
