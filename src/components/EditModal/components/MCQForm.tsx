import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import MCQAnswer from '@/components/Flashcard/MCQ/components/MCQAnswer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import {
  setFlashcardIsFlipped,
  setFlashcardToEdit,
  setTextForFlashcard,
} from '@/redux/editModal/editModalSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { deepCopy } from '@/utils/dataFormatting';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button, TextareaAutosize } from '@mui/material';
import React from 'react';

type MCQFormProps = {
  front: string;
  back: any;
};

const MCQForm = ({ front, back }: MCQFormProps) => {
  const dispatch = useAppDispatch();
  const { flashcardIsFlipped, flashcardToEdit } = useAppSelector(
    (state) => state.editModal
  );

  return (
    <FlexContainer>
      {flashcardIsFlipped ? (
        <NeumorphicContainer
          width='75%'
          height='45%'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextareaAutosize
            onChange={(event) => {
              dispatch(
                setFlashcardToEdit({
                  ...flashcardToEdit,
                  front: event.target.value,
                })
              );
            }}
            value={front}
            style={{
              resize: 'none',
              width: '80%',
              height: '80%',
              backgroundColor: 'transparent',
              color: 'white',
              letterSpacing: '2px',
              fontSize: '20px',
              border: 'none',
              paddingTop: '10px',
              maxWidth: '90%',
              maxHeight: '80%',
            }}
          />
        </NeumorphicContainer>
      ) : (
        <FlexContainer width='75%' height='55%' style={{ overflowY: 'auto' }}>
          <Button
            variant='contained'
            onClick={() => {
              const answers = deepCopy(flashcardToEdit.back);
              answers.push({ text: '', isCorrect: false });
              dispatch(
                setFlashcardToEdit({ ...flashcardToEdit, back: answers })
              );
            }}
          >
            +
          </Button>
          {back.map((answer: any, index: number) => (
            <MCQAnswer
              key={answer.text}
              isCorrect={answer.isCorrect}
              text={answer.text}
              onChangeCheckbox={() => {
                const answers = deepCopy(flashcardToEdit.back);
                answers[index].isCorrect = !answers[index].isCorrect;
                dispatch(
                  setFlashcardToEdit({ ...flashcardToEdit, back: answers })
                );
              }}
              onChangeText={(e: any) => {
                dispatch(setTextForFlashcard({ index, text: e.target.value }));
              }}
              onDelete={() => {
                const answers = deepCopy(flashcardToEdit.back);
                answers.splice(index, 1);
                dispatch(
                  setFlashcardToEdit({ ...flashcardToEdit, back: answers })
                );
              }}
            />
          ))}
        </FlexContainer>
      )}
      <FlexContainer width='75%' height='25%'>
        <ButtonWithIcon
          style={{
            backgroundColor: 'white',
            color: 'black',
            width: '180px',
          }}
          title='Answers'
          iconPosition='right'
          iconIsComponent
          icon={<AutorenewIcon sx={{ color: 'black' }} />}
          onClick={() => dispatch(setFlashcardIsFlipped(!flashcardIsFlipped))}
        />
      </FlexContainer>
    </FlexContainer>
  );
};

export default MCQForm;
