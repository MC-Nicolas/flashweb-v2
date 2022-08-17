import FlexContainer from '@/components/FlexContainer/FlexContainer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type MCQFlashcardProps = {
  onEdit: any;
  onDelete: any;
  front: string;
  back: any;
};

const MCQFlashcard = ({ onEdit, onDelete, front, back }: MCQFlashcardProps) => {
  return (
    <NeumorphicContainer
      height='300px'
      width='45%'
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        padding: '10px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <FlexContainer
        flexDirection='row'
        width='70px'
        height='30px'
        justifyContent='space-between'
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10000,
        }}
      >
        <EditIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={onEdit} />
        <DeleteIcon
          sx={{ color: 'white', cursor: 'pointer' }}
          onClick={onDelete}
        />
      </FlexContainer>
      <FlexContainer height='200px'>
        <p style={{ color: 'white' }}>{front}</p>
        {back.map((answer: any) => (
          <FlexContainer
            key={answer.text}
            height='40px'
            justifyContent='flex-start'
            alignItems='center'
          >
            <p>
              {' '}
              {answer.isCorrect ? (
                <CheckIcon sx={{ color: 'green' }} />
              ) : (
                <CloseIcon sx={{ color: 'red' }} />
              )}
            </p>
            <p>{answer.text}</p>
          </FlexContainer>
        ))}
      </FlexContainer>
    </NeumorphicContainer>
  );
};

export default MCQFlashcard;
