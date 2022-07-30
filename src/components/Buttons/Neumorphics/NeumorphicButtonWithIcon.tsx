import React from 'react';

import styles from './NeumorphicButtonWithIcon.module.scss';

type NeumorphicButtonWithIconProps = {
  icon: any;
};

const NeumorphicButtonWithIcon = ({ icon }: NeumorphicButtonWithIconProps) => {
  return (
    <button className={styles.neumorphicButtonBorder}>
      <div className={styles.neumorphicButtonInner}>{icon}</div>
    </button>
  );
};

export default NeumorphicButtonWithIcon;
