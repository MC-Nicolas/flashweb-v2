import React, { useEffect } from 'react';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import SectionTitle from '@/components/Texts/SectionTitle';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import ImportantFolderTable from '@/components/ImportantFolderTable/ImportantFolderTable';
import Rechart from '@/components/Highchart/Highchart';
import Highchart from '@/components/Highchart/Highchart';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { DeckReviewType } from '@/types/folders';
import { addAnswersFromSameDay } from '@/utils/dataFormatting';
import { calculatePercentageFromTwoNumber } from '@/utils/calculations';
import { setSeries } from '@/redux/chart/chartSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { allReviews } = useAppSelector((state) => state.folders);

  useEffect(() => {
    const seriesData: number[] = [];
    let categories: string[] = [];

    let groupedReviewsByDay = addAnswersFromSameDay(allReviews);

    groupedReviewsByDay.map((review) => {
      const avgSuccess = calculatePercentageFromTwoNumber(
        review.rightAnswerCount + review.wrongAnswerCount,
        review.rightAnswerCount
      );

      seriesData.push(avgSuccess);
      categories.push(review.date);
    });

    dispatch(setSeries({ values: seriesData, categories }));
  }, [allReviews, dispatch]);

  return (
    <PageContainerWithNav pageTitle='Dashboard'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='Dashboard' color='white' />
        </FlexContainer>
        <NeumorphicContainer
          width='80%'
          height='300px'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Highchart />
        </NeumorphicContainer>
        <FlexContainer width='80%' height='40%' style={{ marginTop: '50px' }}>
          <ImportantFolderTable />
        </FlexContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Dashboard;
