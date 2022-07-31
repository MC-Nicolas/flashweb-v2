import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import ArrowRight from '@/assets/icons/arrowRight.png';

import styles from './FolderRow.module.scss';

const handleColorFromPercentage = (percentage: number) => {
  if (percentage < 50) return 'red';
  if (percentage < 75) return 'orange';
  return 'green';
};

const FolderRow = ({ folder }: any) => {
  return (
    <div className={styles.folderRow}>
      <div>{folder.name}</div>
      <div>{folder.numberOfFlashcards}</div>
      <div>{folder.timeSpent}</div>
      <div style={{ color: handleColorFromPercentage(folder.avgSuccess) }}>
        {folder.avgSuccess && folder.avgSuccess.toFixed(0) + '%'}
      </div>
      <div style={{ color: handleColorFromPercentage(folder.avgSuccess) }}>
        {folder.doneToday && folder.doneToday.toFixed(0) + '%'}
      </div>
      <div style={{ cursor: 'pointer' }}>
        <Link href='/'>
          <EqualizerIcon />
        </Link>
      </div>
      <div style={{ color: 'white' }}>
        <Link href={folder.pushTo}>
          <button
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <Image src={ArrowRight} alt='Study' width={20} height={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FolderRow;
