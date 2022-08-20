import React from 'react';

type ResultProps = {
  result: string | number;
};

const Result = ({ result }: ResultProps) => {
  return (
    <p style={{ color: 'green', fontSize: '22px', letterSpacing: 2 }}>
      Answer: {result}
    </p>
  );
};

export default Result;
