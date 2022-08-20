import React from 'react';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './NeumorphicTable.module.scss';

import { fromStringToBoolean, generateRandomId } from '@/utils/data';
import TableActions from './components/TableActions/TableActions';
import ChartAction from './components/ChartAction/ChartAction';
import StudyAction from './components/StudyAction/StudyAction';

type DataRowProps = {
  element: string[];
};

const DataRow = ({ element }: DataRowProps) => {
  return (
    <div className={styles.folderRow}>
      {element.map((el) => {
        if (el === 'Edit folder' || el === 'Edit deck') {
          return (
            <TableActions
              key={generateRandomId()}
              element={element}
              activeElement={el}
            />
          );
        } else if (el === 'Chart') {
          return (
            <ChartAction
              key={generateRandomId()}
              element={element}
              activeElement={el}
            />
          );
        } else if (el === 'Study') {
          return <StudyAction element={element} />;
        } else if (el === 'true' || el === 'false') {
          return (
            <div key={generateRandomId()}>
              {fromStringToBoolean(el) ? (
                <DoneAllIcon sx={{ color: 'green' }} />
              ) : (
                <ClearIcon sx={{ color: 'red' }} />
              )}
            </div>
          );
        } else {
          return <div key={generateRandomId()}>{el}</div>;
        }
      })}
    </div>
  );
};

export default DataRow;
