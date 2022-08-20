import React from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import Select from '../Inputs/Select';

type StudiesSelectorsProps = {
  activeType: string;
  setActiveType: any;
};

const StudiesSelectors = ({
  activeType,
  setActiveType,
}: StudiesSelectorsProps) => {
  return (
    <NeumorphicContainer
      width='80%'
      height='150px'
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        paddingBottom: '30px',
      }}
    >
      <Select
        width='300px'
        label='Type'
        value={activeType}
        options={[
          { value: 'folders', name: 'Folders' },
          { value: 'decks', name: 'Decks' },
          { value: 'flashcards', name: 'Flashcards' },
        ]}
        onChange={(e) => setActiveType(e.target.value)}
      />
    </NeumorphicContainer>
  );
};

export default StudiesSelectors;
