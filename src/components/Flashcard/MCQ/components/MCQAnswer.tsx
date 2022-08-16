import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import { Checkbox, TextareaAutosize } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';

type MCQAnswerProps = {
  isCorrect: boolean;
  text: string;
  onChangeText: any;
  onChangeCheckbox: any;
  onDelete: any;
};

const MCQAnswer = ({
  isCorrect,
  text,
  onChangeText,
  onChangeCheckbox,
  onDelete,
}: MCQAnswerProps) => {
  return (
    <NeumorphicContainer
      style={{
        height: '50px',
        flexDirection: 'row',
        backgroundColor: isCorrect ? '#258207' : '#cc2121',
        justifyContent: 'space-evenly',
        marginTop: '10px',
      }}
    >
      <Checkbox
        checked={isCorrect}
        onChange={onChangeCheckbox}
        sx={{
          color: 'white',
          '&.Mui-checked': {
            color: 'white',
          },
        }}
      />
      <TextareaAutosize
        onChange={onChangeText}
        value={text}
        style={{
          resize: 'none',
          overflowY: 'scroll',
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
      <DeleteForeverIcon
        onClick={onDelete}
        style={{ cursor: 'pointer', color: 'white' }}
      />
    </NeumorphicContainer>
  );
};

export default MCQAnswer;
