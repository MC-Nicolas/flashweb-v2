import React from 'react';

import styles from './NeumorphicButtonWithIcon.module.scss';

type NeumorphicButtonWithIconProps = {
  icon: any;
};

const NeumorphicButtonWithIcon = ({ icon }: NeumorphicButtonWithIconProps) => {
  return <span className={styles.neumorphicButtonInner}>{icon}</span>;
};

export default NeumorphicButtonWithIcon;
