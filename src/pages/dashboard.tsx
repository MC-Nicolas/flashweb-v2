import React, { useEffect, useState } from 'react';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import SectionTitle from '@/components/Texts/SectionTitle';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Highchart from '@/components/Highchart/Highchart';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addAnswersFromSameDay,
  extractDataForDeckTable,
  findIndexOfFolder,
  removeSpecialChars,
} from '@/utils/dataFormatting';
import {
  calculatePercentageFromTwoNumber,
  calculateSeriesForChartFromAllReviews,
} from '@/utils/calculations';
import { setSeries } from '@/redux/chart/chartSlice';
import NeumorphicTable from '@/components/NeumorphicTable/NeumorphicTable';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import { extractAllDecksForFolder } from '@/utils/foldersFormatting';
import { headerElements } from '@/components/NeumorphicTable/data';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { allReviews, folders, activeFolder } = useAppSelector(
    (state) => state.folders
  );
  const [deckDataForTable, setDeckDataForTable] = useState<any>([]);

  useEffect(() => {
    const decks = extractAllDecksForFolder(activeFolder, folders, true);
    const decksDataForTable = extractDataForDeckTable(decks, 'study');
    setDeckDataForTable(decksDataForTable);
  }, [folders, activeFolder]);

  useEffect(() => {
    const { seriesData, categories } =
      calculateSeriesForChartFromAllReviews(allReviews);

    dispatch(setSeries({ values: seriesData, categories }));
  }, [allReviews, dispatch]);

  // ! TODO: change the data and headers for table to contain: Done today, time spent...

  return (
    <PageContainerWithNav pageTitle='Dashboard'>
      <FlexContainer
        height='100vh'
        flexDirection='column'
        justifyContent='flex-start'
        flexWrap='nowrap'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='Dashboard' color='white' />
        </FlexContainer>
        <InsetNeumorphicContainer
          width='80%'
          height='350px'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Highchart />
        </InsetNeumorphicContainer>
        <FlexContainer
          width='80%'
          height='50%'
          style={{ marginTop: '50px', overFlowY: 'scroll' }}
        >
          <NeumorphicTable
            width='100%'
            height='70%'
            headerElements={headerElements.dashboardDeck}
            data={deckDataForTable}
          />
        </FlexContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Dashboard;
