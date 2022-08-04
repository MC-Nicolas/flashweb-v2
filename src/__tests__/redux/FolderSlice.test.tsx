import folderReducer, {
  initialState,
  setFolders,
} from '@/redux/folders/FolderSlice';
import { sortOptionsByName } from '@/utils/foldersFormatting';

test('Should return initial state ', () => {
  expect(folderReducer(undefined, { type: undefined })).toEqual(initialState);
});
