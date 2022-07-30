import Image from 'next/image';
import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

import styles from './Buttons.module.scss';

type ButtonWithIconProps = {
  title: string;
  icon: any;
  onClick: (e: React.SyntheticEvent) => Promise<void>;
};

const ButtonWithIcon = ({ title, icon, onClick }: ButtonWithIconProps) => {
  return (
    <button className={styles.submitFormBtn} onClick={onClick}>
      <FlexContainer>
        <Image src={icon} width={30} height={30} alt='icon' />
        <span>{title}</span>
      </FlexContainer>
    </button>
  );
};

export default ButtonWithIcon;
