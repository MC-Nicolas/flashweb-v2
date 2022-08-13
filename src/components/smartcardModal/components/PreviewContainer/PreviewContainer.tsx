import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Example from '../Example/Example';
import Preview from '../Preview/Preview';

type Props = {};

const PreviewContainer = (props: Props) => {
  const [activeSection, setActiveSection] = useState('Preview');
  return (
    <FlexContainer>
      <FlexContainer height='50px'>
        <Button
          onClick={() => setActiveSection('Preview')}
          sx={{ color: `${activeSection === 'Preview' ? 'white' : ''}` }}
        >
          Preview
        </Button>
        <Button
          onClick={() => setActiveSection('Example')}
          sx={{ color: `${activeSection === 'Example' ? 'white' : ''}` }}
        >
          Example
        </Button>
      </FlexContainer>
      {activeSection === 'Preview' && <Preview />}
      {activeSection === 'Example' && <Example />}
    </FlexContainer>
  );
};

export default PreviewContainer;
