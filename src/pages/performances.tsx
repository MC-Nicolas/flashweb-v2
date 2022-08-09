import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import Highchart from '@/components/Highchart/Highchart';
import SectionTitle from '@/components/Texts/SectionTitle';

import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';

import React, { useEffect, useState } from 'react';
import NeumorphicTable from '@/components/NeumorphicTable/NeumorphicTable';

import ExtensibleContainer from '@/components/ExtensibleContainer/ExtensibleContainer';
import FoldersParams from '@/components/FoldersParams/FoldersParams';
import { headerElements } from '@/components/NeumorphicTable/data';

import {
  extractAllReviewsFromActiveFolder,
  extractDataForDeckTable,
  extractDataForFolderTable,
  findIndexOfDeck,
  findIndexOfFolder,
  sortByDate,
} from '@/utils/dataFormatting';

import { calculateSeriesForChartForEachDay } from '@/utils/calculations';
import { DeckReviewType } from '@/types/folders';
import { setSeries } from '@/redux/chart/chartSlice';

const Performances = () => {
  const dispatch = useAppDispatch();
  const { activeFolder, activeDeck, folders, allReviews } = useAppSelector(
    (state) => state.folders
  );

  const [typeOfData, setTypeOfData] = useState('folder');
  const [dataForTable, setDataForTable] = useState<any>([]);
  // ! TODO -> Create separate functions for fetching folders and deck

  useEffect(() => {
    if (typeOfData === 'folder') {
      let totalReviews: any = [];
      let foldersDataForTable = extractDataForFolderTable(
        folders,
        activeFolder
      );
      let activeFolderReviews = extractAllReviewsFromActiveFolder(
        folders,
        activeFolder
      );

      activeFolderReviews.map((reviewArr: DeckReviewType[]) => {
        reviewArr.map((review: DeckReviewType) => {
          totalReviews.push(review);
        });
      });

      totalReviews = sortByDate(totalReviews);

      const { series, categories } =
        calculateSeriesForChartForEachDay(totalReviews);

      dispatch(setSeries({ values: series, categories: categories }));
      setDataForTable(foldersDataForTable);
    } else {
      let activeFolderIndex = findIndexOfFolder(folders, activeFolder);
      let activeDeckIndex = findIndexOfDeck(folders, activeFolder, activeDeck);

      if (activeDeckIndex === -1 || activeDeckIndex === -1) return;

      let deck = folders[activeFolderIndex].decks[activeDeckIndex];
      let deckDataForTable = extractDataForDeckTable([deck]);

      let activeDeckReviews = extractAllReviewsFromActiveFolder(
        folders,
        activeFolder,
        activeDeck
      );
      if (activeDeckReviews.length === 0) return;
      activeDeckReviews = sortByDate(activeDeckReviews);

      const { series, categories } = calculateSeriesForChartForEachDay(
        activeDeckReviews[0]
      );

      dispatch(setSeries({ values: series, categories: categories }));
      setDataForTable(deckDataForTable);
    }
  }, [folders, activeFolder, activeDeck, dispatch, typeOfData]);

  return (
    <PageContainerWithNav pageTitle='Performances'>
      <FlexContainer
        height='auto'
        style={{ minHeight: '100vh' }}
        width='100%'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <FlexContainer height='100px'>
          <SectionTitle title='Performances' color='white' />
        </FlexContainer>
        <ExtensibleContainer closedText="Folder's Parameters">
          <FoldersParams
            typeOfData={typeOfData}
            setTypeOfData={setTypeOfData}
          />
        </ExtensibleContainer>
        <FlexContainer width='80%' height='200px' style={{ marginTop: '50px' }}>
          <NeumorphicTable
            width='100%'
            height='100%'
            headerElements={headerElements[typeOfData]}
            data={dataForTable}
          />
        </FlexContainer>
        <FlexContainer height='auto'>
          <InsetNeumorphicContainer
            width='80%'
            height='350px'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              margin: '50px 0',
            }}
          >
            <Highchart />
          </InsetNeumorphicContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default Performances;
