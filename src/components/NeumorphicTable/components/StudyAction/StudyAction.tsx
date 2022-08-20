import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAppSelector } from '@/redux/redux.hooks';

import { generateRandomId } from '@/utils/data';
import { removeSpecialChars } from '@/utils/dataFormatting';
import { getFolderFromDeck } from '@/utils/getData';

import ArrowRight from '@/assets/icons/arrowRight.png';

type StudyActionProps = {
  element: string[];
};

const StudyAction = ({ element }: StudyActionProps) => {
  const { folders } = useAppSelector((state) => state.folders);
  return (
    <div key={generateRandomId()} style={{ color: 'white' }}>
      <Link
        href={`/study?folder=${getFolderFromDeck(
          element[0],
          folders
        )}&deck=${removeSpecialChars(element[0])}`}
      >
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
  );
};

export default StudyAction;
