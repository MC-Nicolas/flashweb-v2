import React from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SmartCardActions = ({
  onDelete,
  onEdit,
}: {
  onDelete: any;
  onEdit: any;
}) => {
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

export default SmartCardActions;
