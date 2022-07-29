import React from 'react';

import styles from './Buttons.module.scss';

type Props = {
  title: string;
  onClick?: () => void;
};

const HomeButtonWithText = ({ title, onClick }: Props) => {
  return (
    <button className={styles.homeButtonWithText} onClick={onClick}>
      {title}
    </button>
  );
};

export default HomeButtonWithText;
