import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import FlashcardTextarea from '../Texts/FlashcardTextarea';

import styles from './Classic.module.scss';

type ClassicProps = {
  front: string;
  setFront?: any;
  back: string;
  setBack?: any;
  isFlipped: boolean;
  editable?: boolean;
};

const ClassicFlashcard = ({
  front,
  setFront,
  back,
  setBack,
  isFlipped,
  editable = false,
}: ClassicProps) => {
  return (
    <FlexContainer style={{ perspective: '1000px' }} height='50%' width='50%'>
      <div
        className={`${styles['flippable-inner']} ${
          isFlipped ? styles.flipped : ''
        }`}
      >
        {editable ? (
          <>
            <div className={`${styles['flippable-front']}`}>
              <FlashcardTextarea value={front} onChangeValue={setFront} />
            </div>
            <div className={`${styles['flippable-back']}`}>
              <FlashcardTextarea
                value={back}
                onChangeValue={setBack}
                color='black'
              />
            </div>
          </>
        ) : (
          <>
            <div className={`${styles['flippable-front']}`}>{front}</div>
            <div className={`${styles['flippable-back']}`}>{back}</div>
          </>
        )}
      </div>
    </FlexContainer>
  );
};

export default ClassicFlashcard;
