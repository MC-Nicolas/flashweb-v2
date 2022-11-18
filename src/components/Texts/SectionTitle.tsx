import React from "react";

const SectionTitle = ({
  title,
  color,
  dataCy,
}: {
  title: string;
  color?: string;
  dataCy?: string;
}) => {
  return (
    <h2 style={{ color }} data-cy={dataCy}>
      {title}
    </h2>
  );
};

export default SectionTitle;
