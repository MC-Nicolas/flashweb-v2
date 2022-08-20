import React from 'react';
import { useRouter } from 'next/router';

import EastIcon from '@mui/icons-material/East';
import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import FlexContainer from '@/components/FlexContainer/FlexContainer';

const EmptyFolder = () => {
  const router = useRouter();

  return (
    <FlexContainer flexDirection='column'>
      <h2 style={{ color: 'white' }}>{`Looks like this folder is empty`}</h2>

      <ButtonWithIcon
        style={{
          width: '300px',
          backgroundColor: 'white',
          color: 'black',
        }}
        title='Create a deck'
        iconPosition='right'
        iconIsComponent
        icon={<EastIcon />}
        onClick={() => router.push('/create/deck')}
      />
    </FlexContainer>
  );
};

export default EmptyFolder;
