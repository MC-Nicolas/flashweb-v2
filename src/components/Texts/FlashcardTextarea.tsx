import React from 'react';

type FlashcardTextareaProps = {
  value: string;
  onChangeValue: any;
  color?: string;
};

const FlashcardTextarea = ({
  value,
  onChangeValue,
  color = 'white',
}: FlashcardTextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={onChangeValue}
      style={{
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        color,
        fontSize: '24px',
      }}
    />
  );
};

export default FlashcardTextarea;
