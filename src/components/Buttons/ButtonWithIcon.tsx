import Image from 'next/image';
import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';

import styles from './Buttons.module.scss';

type ButtonWithIconProps = {
  title: string;
  icon: any;
  onClick: any;
  iconIsComponent?: boolean;
  iconPosition?: 'left' | 'right';
  style?: {};
};

const ButtonWithIcon = ({
  title,
  icon,
  onClick,
  iconIsComponent = false,
  iconPosition = 'left',
  style = {},
}: ButtonWithIconProps) => {
  if (iconIsComponent) {
    return (
      <button
        style={{ ...style }}
        className={styles.submitFormBtn}
        onClick={onClick}
      >
        <FlexContainer>
          {iconPosition === 'left' && icon}
          <span>{title}</span>
          {iconPosition === 'right' && icon}
        </FlexContainer>
      </button>
    );
  }
  return (
    <button
      style={{ ...style }}
      className={styles.submitFormBtn}
      onClick={onClick}
    >
      <FlexContainer>
        {iconPosition === 'left' && (
          <Image src={icon} width={30} height={30} alt='icon' />
        )}

        <span>{title}</span>
        {iconPosition === 'right' && (
          <Image src={icon} width={30} height={30} alt='icon' />
        )}
      </FlexContainer>
    </button>
  );
};

export default ButtonWithIcon;
