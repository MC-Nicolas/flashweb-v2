import React, { useState } from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import FlashcardTextarea from '../Texts/FlashcardTextarea';

import styles from './Classic.module.scss';
import MQCAnswer from './MQCAnswer';

type MCQProps = {
  isFlipped: boolean;
  front: string;
  setFront: any;
};

const MCQ = ({ isFlipped, front, setFront }: MCQProps) => {
  const [MCQAnswers, setMCQAnswers] = useState([
    { text: '', isCorrect: false },
  ]);
  return (
    <FlexContainer height='50%' width='80%'>
      <div
        className={`${styles['flippable-inner']} ${
          isFlipped ? styles.flipped : ''
        }`}
      >
        <div className={`${styles['flippable-front']}`}>
          <FlashcardTextarea value={front} onChangeValue={setFront} />
        </div>
        <div className={`${styles['flippable-back']}`}>
          {MCQAnswers.map(
            (
              { text, isCorrect }: { text: string; isCorrect: boolean },
              index: number
            ) => (
              <MQCAnswer
                key={index}
                text={text}
                isCorrect={isCorrect}
                onChangeText={() => ''}
                onChangeIsCorrect={() => ''}
              />
            )
          )}
        </div>
      </div>
    </FlexContainer>
  );
};

export default MCQ;
