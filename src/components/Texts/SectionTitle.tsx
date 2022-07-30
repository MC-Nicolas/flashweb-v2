import React from 'react';

const SectionTitle = ({ title, color }: { title: string; color?: string }) => {
  return <h2 style={{ color }}>{title}</h2>;
};

export default SectionTitle;
