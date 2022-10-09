import React, { useState } from 'react';

import FlexContainer from '../FlexContainer/FlexContainer';
import EditableClassic from './components/EditableClassic/EditableClassic';
import FlashcardActions from './components/FlashcardActions/FlashcardActions';

import styles from './Classic.module.scss';
import StaticClassic from './components/StaticClassic/StaticClassic';

type ClassicProps = {
  front: string;
  setFront?: any;
  back: string;
  setBack?: any;
  isFlipped: boolean;
  editable?: boolean;
  height?: string;
  width?: string;
  style?: {};
  showEditIcons?: boolean;
  onDelete?: any;
  onEdit?: any;
  fontSize?: string;
};

const ClassicFlashcard = ({
  front,
  setFront,
  back,
  setBack,
  isFlipped,
  editable = false,
  height = '50%',
  width = '50%',
  style = {},
  showEditIcons = false,
  onDelete,
  onEdit,
  fontSize,
}: ClassicProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <FlexContainer
      style={{ perspective: '1000px', ...style, position: 'relative' }}
      height={height}
      width={width}
    >
      <div
        className={`${styles['flippable-inner']} ${
          isFlipped ? styles.flipped : ''
        }`}
      >
        {isRevealed && (
          <div
            style={{
              backgroundColor: '#222',
              borderRadius: 10,
              height: '100%',
              width: '100%',
              zIndex: 10000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p>{back}</p>
          </div>
        )}
        {showEditIcons && (
          <FlashcardActions
            onEdit={onEdit}
            onDelete={onDelete}
            onReveal={() => setIsRevealed(!isRevealed)}
          />
        )}
        {editable ? (
          <EditableClassic
            front={front}
            setFront={setFront}
            back={back}
            setBack={setBack}
          />
        ) : (
          <StaticClassic front={front} back={back} fontSize={fontSize} />
        )}
      </div>
    </FlexContainer>
  );
};

export default ClassicFlashcard;
