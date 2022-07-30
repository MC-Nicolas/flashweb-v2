import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import SectionDescription from './SectionDescription';
import SectionTitle from './SectionTitle';

type TitleAndDescriptionProps = {
  title: string;
  description: string;
  width?: string;
};

const TitleAndDescription = ({
  title,
  description,
  width = '100%',
}: TitleAndDescriptionProps) => {
  return (
    <FlexContainer
      flexDirection='column'
      height='80px'
      width={width}
      justifyContent='space-evenly'
      alignItems='flex-start'
      gap='0px'
    >
      <SectionTitle title={title} color='#fff' />
      <SectionDescription description={description} color='grey' />
    </FlexContainer>
  );
};

export default TitleAndDescription;
