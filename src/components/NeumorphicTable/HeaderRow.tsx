import React from 'react';

import styles from './NeumorphicTable.module.scss';

type HeaderRowProps = {
  headerElements: any[];
};

const HeaderRow = ({ headerElements }: HeaderRowProps) => {
  return (
    <div className={styles.folderHeaderRow}>
      {headerElements.map((element) => {
        if (typeof element === 'string') {
          return <div key={element}>{element}</div>;
        }
      })}
    </div>
  );
};

export default HeaderRow;
