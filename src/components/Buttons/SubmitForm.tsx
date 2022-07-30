import React from 'react';

import styles from './Buttons.module.scss';

const SubmitForm = ({ title }: { title: string }) => {
  return <input className={styles.submitFormBtn} type='submit' value={title} />;
};

export default SubmitForm;
