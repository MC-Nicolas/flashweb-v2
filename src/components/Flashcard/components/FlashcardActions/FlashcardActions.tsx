import FlexContainer from '@/components/FlexContainer/FlexContainer';
import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type FlashcardActionsProps = {
  onEdit: any;
  onDelete: any;
};

const FlashcardActions = ({ onEdit, onDelete }: FlashcardActionsProps) => {
  return (
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
  );
};

export default FlashcardActions;
