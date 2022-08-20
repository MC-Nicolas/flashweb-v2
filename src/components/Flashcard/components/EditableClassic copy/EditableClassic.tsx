import FlashcardTextarea from '@/components/Texts/FlashcardTextarea';
import React from 'react';

import styles from '../../Classic.module.scss';

type EditableClassicProps = {
  front: string;
  setFront: any;
  back: string;
  setBack: any;
};

const EditableClassic = ({
  front,
  setFront,
  back,
  setBack,
}: EditableClassicProps) => {
  return (
    <>
      <div className={`${styles['flippable-front']}`}>
        <FlashcardTextarea value={front} onChangeValue={setFront} />
      </div>
      <div className={`${styles['flippable-back']}`}>
        <FlashcardTextarea value={back} onChangeValue={setBack} color='black' />
      </div>
    </>
  );
};

export default EditableClassic;
