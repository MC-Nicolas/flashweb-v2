import folderReducer, {
  initialState,
  setActiveFolder,
  setFolders,
} from '@/redux/folders/FolderSlice';
import { sortOptionsByName } from '@/utils/foldersFormatting';

test('Should return initial state ', () => {
  expect(folderReducer(undefined, { type: undefined })).toEqual(initialState);
});

test('Should add folders to store and folders options and active deck if there is ', () => {
  let foldersFromDB = {
    ppl: {
      title: 'PPL',
      decks: [{ isImportant: true, title: 'Navigation', id: 'navigation' }],
    },
    math: { title: 'Math' },
    java: { title: 'Java' },
  };

  let foldersOptions = [
    { value: 'ppl', name: 'PPL' },
    { value: 'math', name: 'Math' },
    { value: 'java', name: 'Java' },
  ];

  let expectedState = {
    folders: foldersFromDB,
    foldersOptions: sortOptionsByName(foldersOptions),
    activeFolder: 'java',
    decks: [],
    decksOptions: [],
    activeDeck: '',
  };

  expect(folderReducer(initialState, setFolders(foldersFromDB))).toEqual(
    expectedState
  );
});
