import React from 'react';

import styles from './Buttons.module.scss';

type Props = {};

const SubmitForm = (props: Props) => {
  return <input className={styles.submitFormBtn} type='submit' />;
};

export default SubmitForm;
