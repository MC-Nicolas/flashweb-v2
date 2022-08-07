import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import FlashcardTextarea from '../Texts/FlashcardTextarea';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './Classic.module.scss';

type ClassicProps = {
  front: string;
  setFront?: any;
  back: string;
  setBack?: any;
  isFlipped: boolean;
  editable?: boolean;
  height?: string;
  width?: string;
  style?: {};
  showEditIcons?: boolean;
  onDelete?: any;
  onEdit?: any;
};

const ClassicFlashcard = ({
  front,
  setFront,
  back,
  setBack,
  isFlipped,
  editable = false,
  height = '50%',
  width = '50%',
  style = {},
  showEditIcons = false,
  onDelete,
  onEdit,
}: ClassicProps) => {
  return (
    <FlexContainer
      style={{ perspective: '1000px', ...style, position: 'relative' }}
      height={height}
      width={width}
    >
      <div
        className={`${styles['flippable-inner']} ${
          isFlipped ? styles.flipped : ''
        }`}
      >
        {showEditIcons && (
          <FlexContainer
            flexDirection='row'
            width='70px'
            height='30px'
            justifyContent='space-between'
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10000,
            }}
          >
            <EditIcon
              sx={{ color: 'white', cursor: 'pointer' }}
              onClick={onEdit}
            />
            <DeleteIcon
              sx={{ color: 'white', cursor: 'pointer' }}
              onClick={onDelete}
            />
          </FlexContainer>
        )}
        {editable ? (
          <>
            <div className={`${styles['flippable-front']}`}>
              <FlashcardTextarea value={front} onChangeValue={setFront} />
            </div>
            <div className={`${styles['flippable-back']}`}>
              <FlashcardTextarea
                value={back}
                onChangeValue={setBack}
                color='black'
              />
            </div>
          </>
        ) : (
          <>
            <div className={`${styles['flippable-front']}`}>{front}</div>
            <div className={`${styles['flippable-back']}`}>{back}</div>
          </>
        )}
      </div>
    </FlexContainer>
  );
};

export default ClassicFlashcard;
