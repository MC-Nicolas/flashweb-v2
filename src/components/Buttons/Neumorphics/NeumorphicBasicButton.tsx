import React from 'react';

import styles from './NeumorphicBasicButton.module.scss';

type NeumorphicBasicButtonProps = {
  text: string;
  width?: string;
  height?: string;
  active?: boolean;
  onClick?: () => void;
};

const NeumorphicBasicButton = ({
  text,
  width = '150px',
  height = '50px',
  active = false,
  onClick,
}: NeumorphicBasicButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.neumorphicBasicButton} ${
        active ? styles.active : ''
      }`}
      style={{ width, height }}
    >
      {text}
    </button>
  );
};

export default NeumorphicBasicButton;
