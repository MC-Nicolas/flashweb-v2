import Link from 'next/link';
import React from 'react';

import styles from './NeumorphicSquaredButton.module.scss';

const NeumorphicSquaredButton = ({
  icon,
  active = false,
  isLink = false,
  pushTo = '/',
  width = '100%',
}: {
  icon: any;
  active?: boolean;
  isLink?: boolean;
  pushTo?: string;
  width?: string;
}) => {
  if (isLink) {
    return (
      <Link href={pushTo}>
        <button
          className={`${styles.neumorphicSquaredButton} ${
            active ? styles.active : ''
          }`}
        >
          {icon}
        </button>
      </Link>
    );
  }
  return (
    <button
      style={{ width }}
      className={`${styles.neumorphicSquaredButton} ${
        active ? styles.active : ''
      }`}
    >
      {icon}
    </button>
  );
};

export default NeumorphicSquaredButton;
