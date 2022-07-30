import { foldersDummyData } from '@/database/dummyData';
import React from 'react';
import FlexContainer from '../FlexContainer/FlexContainer';
import FolderHeaderRow from './FolderHeaderRow';
import FolderRow from './FolderRow';

type Props = {};

const ImportantFolderTable = (props: Props) => {
  return (
    <FlexContainer>
      <FolderHeaderRow />
      {foldersDummyData.map((folder) => (
        <FolderRow key={folder.id} folder={folder} />
      ))}
    </FlexContainer>
  );
};

export default ImportantFolderTable;
