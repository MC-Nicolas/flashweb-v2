import {
  sortOptionsByName,
  transformFoldersFromDBToOptions,
} from '@/utils/foldersFormatting';

test('Should transform Folders from DB to select options', () => {
  let folders = [
    { title: 'PPL', id: 'ppl' },
    { title: 'Math', id: 'math' },
    { title: 'Java', id: 'java' },
  ];

  let expected = [
    { value: 'ppl', name: 'PPL' },
    { value: 'math', name: 'Math' },
    { value: 'java', name: 'Java' },
  ];

  expect(transformFoldersFromDBToOptions(folders)).toEqual(expected);
});

test('Should sort Folders options by name', () => {
  let foldersOptions = [
    { value: 'ppl', name: 'PPL' },
    { value: 'history', name: 'History' },
    { value: 'math', name: 'Math' },
    { value: 'java', name: 'Java' },
  ];
  let expected = [
    { value: 'history', name: 'History' },
    { value: 'java', name: 'Java' },
    { value: 'math', name: 'Math' },
    { value: 'ppl', name: 'PPL' },
  ];

  expect(sortOptionsByName(foldersOptions)).toEqual(expected);
});
