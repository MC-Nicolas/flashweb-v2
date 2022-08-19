import React from 'react';
import Link from 'next/link';

import { generateRandomId } from '@/utils/data';

import EqualizerIcon from '@mui/icons-material/Equalizer';

type ChartActionProps = {
  activeElement: string;
  element: string[];
};

const ChartAction = ({ activeElement, element }: ChartActionProps) => {
  return (
    <div key={generateRandomId()}>
      <Link href='/'>
        <EqualizerIcon sx={{ cursor: 'pointer' }} />
      </Link>
    </div>
  );
};

export default ChartAction;
