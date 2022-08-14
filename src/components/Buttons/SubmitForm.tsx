import React from 'react';

import styles from './Buttons.module.scss';

const SubmitForm = ({ title, onClick }: { title: string; onClick?: any }) => {
  if (onClick)
    return (
      <input
        className={styles.submitFormBtn}
        value={title}
        onClick={(e: React.SyntheticEvent) => {
          e.preventDefault();
          onClick();
        }}
        type='submit'
      />
    );
  return <input className={styles.submitFormBtn} type='submit' value={title} />;
};

export default SubmitForm;
