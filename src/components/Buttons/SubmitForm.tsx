import React from "react";

import styles from "./Buttons.module.scss";

const SubmitForm = ({
  title,
  onClick,
  dataCy,
}: {
  title: string;
  onClick?: any;
  dataCy?: string;
}) => {
  if (onClick)
    return (
      <input
        data-cy={dataCy}
        className={styles.submitFormBtn}
        value={title}
        onClick={(e: React.SyntheticEvent) => {
          e.preventDefault();
          onClick();
        }}
        type="submit"
      />
    );
  return (
    <input
      className={styles.submitFormBtn}
      type="submit"
      value={title}
      data-cy={dataCy}
    />
  );
};

export default SubmitForm;
