import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import Highchart from '@/components/Highchart/Highchart';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import NeumorphicTable from '@/components/NeumorphicTable/NeumorphicTable';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import { headerElements } from '@/components/NeumorphicTable/data';
import PageContainerWithNavAndTitle from '@/components/Containers/PageContainerWithNavAndTitle/PageContainerWithNavAndTitle';

import { extractDataForDeckTable } from '@/utils/dataFormatting';
import { calculateSeriesForChartFromAllReviews } from '@/utils/calculations';
import { extractAllDecksForFolder } from '@/utils/foldersFormatting';
import { setSeries } from '@/redux/chart/chartSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { allReviews, folders, activeFolder } = useAppSelector(
    (state) => state.folders
  );
  const [deckDataForTable, setDeckDataForTable] = useState<any>([]);

  useEffect(() => {
    const decks = extractAllDecksForFolder(null, folders, true);
    const decksDataForTable = extractDataForDeckTable(decks, 'study');
    setDeckDataForTable(decksDataForTable);
  }, [folders, activeFolder]);

  useEffect(() => {
    const { seriesData, categories } =
      calculateSeriesForChartFromAllReviews(allReviews);

    dispatch(setSeries({ values: seriesData, categories }));
  }, [allReviews, dispatch]);

  return (
    <PageContainerWithNavAndTitle tabTitle='Dashboard' pageTitle='Dashboard'>
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
      <FlexContainer width='80%' height='50%' style={{ marginTop: '50px' }}>
        <NeumorphicTable
          width='100%'
          headerElements={headerElements.dashboardDeck}
          data={deckDataForTable}
        />
      </FlexContainer>
    </PageContainerWithNavAndTitle>
  );
};

export default Dashboard;
