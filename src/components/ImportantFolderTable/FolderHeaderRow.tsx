import React from 'react';
import styles from './FolderRow.module.scss';

const FolderHeaderRow = () => {
  return (
    <div className={styles.folderHeaderRow}>
      <div>Name</div>
      <div>Flashcards</div>
      <div>Time spent</div>
      <div>AVG Success</div>
      <div>Done today</div>
      <span>Chart</span>
      <span>Study</span>
    </div>
  );
};

export default FolderHeaderRow;
