import React from 'react';
import Link from 'next/link';

import FlexContainer from '@/components/FlexContainer/FlexContainer';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const EmptyDeck = () => (
  <FlexContainer
    flexDirection='column'
    justifyContent='center'
    style={{ textAlign: 'center' }}
  >
    <h2
      style={{
        color: 'white',
        letterSpacing: '2px',
        marginBottom: '20px',
      }}
    >
      Seems like you don&apos;t have any flashcard here, want to create some ?{' '}
    </h2>
    <Link href='/create/flashcard'>
      <AddCircleIcon
        sx={{ color: 'green', fontSize: '50px', cursor: 'pointer' }}
      />
    </Link>
  </FlexContainer>
);

export default EmptyDeck;
