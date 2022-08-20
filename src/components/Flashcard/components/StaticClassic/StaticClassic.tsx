import React from 'react';

import styles from '../../Classic.module.scss';

type StaticClassicProps = {
  front: string;
  back: string;
  fontSize?: string;
};

const StaticClassic = ({ front, back, fontSize }: StaticClassicProps) => {
  return (
    <>
      <div
        style={{ fontSize: fontSize ? fontSize : '22px' }}
        className={`${styles['flippable-front']}`}
      >
        {front}
      </div>
      <div
        style={{ fontSize: fontSize ? fontSize : '22px' }}
        className={`${styles['flippable-back']}`}
      >
        {back}
      </div>
    </>
  );
};

export default StaticClassic;
