import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import ArrowRight from '@/assets/icons/arrowRight.png';

import { DeckType, DeckReviewType } from '@/types/folders';

import styles from './FolderRow.module.scss';
import { calculatePercentageFromTwoNumber } from '@/utils/calculations';
import { formatFromDateInSecondsToDate } from '@/utils/dataFormatting';

const handleColorFromPercentage = (percentage: number) => {
  if (percentage < 50) return 'red';
  if (percentage < 75) return 'orange';
  return 'green';
};

const FolderRow = ({ deck }: { deck: DeckType }) => {
  const { title, flashcards } = deck;
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [avgSuccess, setAvgSuccess] = useState(0);
  const [doneToday, setDoneToday] = useState(0);

  useEffect(() => {
    let totalTime = 0;
    let totalAnswers = 0;
    let totalSuccess = 0;

    deck?.reviews?.map((review: any) => {
      totalAnswers += review.answers.right.length;
      totalAnswers += review.answers.wrong.length;

      totalSuccess += review.answers.right.length;
      totalTime += review.timeSpent;
    });

    const todayReviews = deck?.reviews?.filter((review: DeckReviewType) => {
      return (
        formatFromDateInSecondsToDate(review.date) ===
        new Date().toLocaleDateString('fr-fr')
      );
    });
    if (todayReviews) setDoneToday(todayReviews?.length * 100);
    setAvgSuccess(calculatePercentageFromTwoNumber(totalAnswers, totalSuccess));
    setTotalTimeSpent(totalTime);
  }, [deck]);

  return (
    <div className={styles.folderRow}>
      <div>{title}</div>
      <div>{flashcards.length}</div>
      <div>{totalTimeSpent}</div>
      <div style={{ color: handleColorFromPercentage(avgSuccess) }}>
        {avgSuccess && avgSuccess + '%'}
      </div>
      <div style={{ color: handleColorFromPercentage(doneToday) }}>
        {doneToday && doneToday + '%'}
      </div>
      <div style={{ cursor: 'pointer' }}>
        <Link href='/'>
          <EqualizerIcon />
        </Link>
      </div>
      <div style={{ color: 'white' }}>
        <Link href={`/study?folder=${deck.folderId}&${deck.id}`}>
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
