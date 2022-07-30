import React from 'react';

const SectionDescription = ({
  description,
  color,
  width = '100%',
}: {
  description: string;
  color?: string;
  width?: string;
}) => {
  return <p style={{ color, width }}>{description}</p>;
};

export default SectionDescription;
