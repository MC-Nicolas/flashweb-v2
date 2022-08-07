import React, { useEffect, useState } from 'react';

import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import SectionTitle from '@/components/Texts/SectionTitle';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Highchart from '@/components/Highchart/Highchart';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  addAnswersFromSameDay,
  extractDataForDeckTable,
  removeSpecialChars,
} from '@/utils/dataFormatting';
import { calculatePercentageFromTwoNumber } from '@/utils/calculations';
import { setSeries } from '@/redux/chart/chartSlice';
import NeumorphicTable from '@/components/NeumorphicTable/NeumorphicTable';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { allReviews, folders, foldersOptions, activeFolder } = useAppSelector(
    (state) => state.folders
  );
  const [deckDataForTable, setDeckDataForTable] = useState<any>([]);

  useEffect(() => {
    const folderIndex = folders.findIndex(
      (folder) => removeSpecialChars(folder.title) === activeFolder
    );
    if (folderIndex === -1) return;
    let decks = folders[folderIndex].decks;
    decks = decks.filter((deck) => deck.isImportant);
    const decksDataForTable = extractDataForDeckTable(decks);
    setDeckDataForTable(decksDataForTable);
  }, [folders, activeFolder]);

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

  // ! TODO: change the data and headers for table to contain: Done today, time spent...

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
        <FlexContainer width='80%' height='40%' style={{ marginTop: '50px' }}>
          <NeumorphicTable
            width='80%'
            height='70%'
            headerElements={[
              'Name',
              'Total Flashcards',
              'Total Reviews',
              'AVG success',
              'Chart',
              'Actions',
            ]}
            data={deckDataForTable}
          />
        </FlexContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Dashboard;
