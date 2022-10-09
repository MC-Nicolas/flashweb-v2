import FlexContainer from '@/components/FlexContainer/FlexContainer';
import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';

type FlashcardActionsProps = {
  onEdit: any;
  onDelete: any;
  onReveal: any;
};

const FlashcardActions = ({
  onEdit,
  onDelete,
  onReveal,
}: FlashcardActionsProps) => {
  return (
    <FlexContainer
      flexDirection='row'
      width='100px'
      height='30px'
      justifyContent='space-between'
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10000,
      }}
    >
      <PreviewIcon
        sx={{ color: 'white', cursor: 'pointer' }}
        onClick={onReveal}
      />
      <EditIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={onEdit} />
      <DeleteIcon
        sx={{ color: 'white', cursor: 'pointer' }}
        onClick={onDelete}
      />
    </FlexContainer>
  );
};

export default FlashcardActions;
