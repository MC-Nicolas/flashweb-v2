export const allAnswersByDateString = [
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: '08/08/2022',
  },
  {
    timeSpent: 12,
    rightAnswerCount: 9,
    wrongAnswerCount: 3,
    date: '07/08/2022',
  },

  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: '10/08/2022',
  },
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: '09/08/2022',
  },
];
export const expectedAnswersByDateString = [
  {
    timeSpent: 12,
    rightAnswerCount: 9,
    wrongAnswerCount: 3,
    date: '07/08/2022',
  },
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: '08/08/2022',
  },
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: '09/08/2022',
  },
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: '10/08/2022',
  },
];

export const allAnswersByDateNumber = [
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: 150,
  },
  {
    timeSpent: 12,
    rightAnswerCount: 9,
    wrongAnswerCount: 3,
    date: 10,
  },

  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: 12,
  },
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: 8,
  },
];
export const expectedAnswersByDateNumber = [
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: 8,
  },
  {
    timeSpent: 12,
    rightAnswerCount: 9,
    wrongAnswerCount: 3,
    date: 10,
  },

  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: 12,
  },
  {
    timeSpent: 14,
    rightAnswerCount: 12,
    wrongAnswerCount: 3,
    date: 150,
  },
];
export const expectedDataForFolderTable = [
  ['Math', 2, 4, 8, '83%', '00:16', 'Chart', 'Edit folder'],
  ['PPL', 1, 6, 2, '67%', '00:10', 'Chart', 'Edit folder'],
];
export const state = {
  folders: [
    {
      id: 'math',
      title: 'Math',
      decks: [
        {
          folderId: 'math',
          title: 'ex',
          id: 'ex',
          isImportant: false,
          flashcards: [
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: 'qsdgqsgd',
                back: 'qsfgqsgf',
              },
            },
          ],
          reviews: [
            {
              answers: {
                right: ['qsdgqsgd'],
                wrong: [],
              },
              date: 1659942777,
              timeSpent: 1,
            },
            {
              answers: {
                wrong: [],
                right: ['qsdgqsgd'],
              },
              date: 1659942780,
              timeSpent: 1,
            },
            {
              answers: {
                right: [],
                wrong: ['qsdgqsgd'],
              },
              date: 1659942782,
              timeSpent: 0,
            },
          ],
        },
        {
          folderId: 'math',
          title: 'Tables',
          id: 'tables',
          isImportant: true,
          flashcards: [
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: '<dgSDQG',
                back: 'dfgsdgqdg',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: 'sdgsdgs',
                back: 'sdgsdgsd',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                back: 'sdgsdg',
                front: 'sdgsdgsd',
              },
            },
          ],
          reviews: [
            {
              answers: {
                right: ['<dgSDQG', 'sdgsdgsd'],
                wrong: ['sdgsdgs'],
              },
              date: 1659899819,
              timeSpent: 3,
            },
            {
              answers: {
                wrong: [],
                right: ['<dgSDQG', 'sdgsdgs', 'sdgsdgsd'],
              },
              date: 1659899827,
              timeSpent: 3,
            },
            {
              answers: {
                right: ['<dgSDQG', 'sdgsdgs', 'sdgsdgsd'],
                wrong: [],
              },
              date: 1659900211,
              timeSpent: 3,
            },
            {
              answers: {
                wrong: ['sdgsdgsd'],
                right: ['<dgSDQG', 'sdgsdgs'],
              },
              date: 1659942544,
              timeSpent: 3,
            },
            {
              answers: {
                right: ['<dgSDQG', 'sdgsdgs', 'sdgsdgsd'],
                wrong: [],
              },
              date: 1659942548,
              timeSpent: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'ppl',
      title: 'PPL',
      decks: [
        {
          folderId: 'ppl',
          title: 'Navigaiton',
          id: 'navigaiton',
          isImportant: false,
          flashcards: [
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: 'ghjklmù',
                back: 'ujhytgrfed',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                back: 'QSRHQDFH',
                front: 'jyrthegqrzfeF',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: 'qdsfhqdfh',
                back: 'qdfhsqdfhdfgh',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: 'qsdfhqfdhqdf',
                back: 'qfhqdfh',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                back: 'SDFGHQDSGHF',
                front: 'SDFHSDGFHSDGFH',
              },
            },
            {
              typeOfFlashcard: 'classic',
              flashcardData: {
                front: 'sdfhsdhfg',
                back: 'qdfhqdfh',
              },
            },
          ],
          reviews: [
            {
              answers: {
                wrong: ['ghjklmù', 'SDFHSDGFHSDGFH'],
                right: ['jyrthegqrzfeF'],
              },
              date: 1659899835,
              timeSpent: 3,
            },
            {
              answers: {
                wrong: ['qdsfhqdfh'],
                right: [
                  'ghjklmù',
                  'jyrthegqrzfeF',
                  'qsdfhqfdhqdf',
                  'SDFHSDGFHSDGFH',
                  'sdfhsdhfg',
                ],
              },
              date: 1659969868,
              timeSpent: 7,
            },
          ],
        },
      ],
    },
  ],
  foldersOptions: [
    {
      name: 'Math',
      value: 'math',
    },
    {
      name: 'PPL',
      value: 'ppl',
    },
  ],
  activeFolder: 'math',
  decksOptions: [
    {
      name: 'ex',
      value: 'ex',
    },
    {
      name: 'Tables',
      value: 'tables',
    },
  ],
  activeDeck: 'ex',
  allReviews: [
    {
      answers: {
        right: ['qsdgqsgd'],
        wrong: [],
      },
      date: 1659942777,
      timeSpent: 1,
    },
    {
      answers: {
        wrong: [],
        right: ['qsdgqsgd'],
      },
      date: 1659942780,
      timeSpent: 1,
    },
    {
      answers: {
        right: [],
        wrong: ['qsdgqsgd'],
      },
      date: 1659942782,
      timeSpent: 0,
    },
    {
      answers: {
        right: ['<dgSDQG', 'sdgsdgsd'],
        wrong: ['sdgsdgs'],
      },
      date: 1659899819,
      timeSpent: 3,
    },
    {
      answers: {
        wrong: [],
        right: ['<dgSDQG', 'sdgsdgs', 'sdgsdgsd'],
      },
      date: 1659899827,
      timeSpent: 3,
    },
    {
      answers: {
        right: ['<dgSDQG', 'sdgsdgs', 'sdgsdgsd'],
        wrong: [],
      },
      date: 1659900211,
      timeSpent: 3,
    },
    {
      answers: {
        wrong: ['sdgsdgsd'],
        right: ['<dgSDQG', 'sdgsdgs'],
      },
      date: 1659942544,
      timeSpent: 3,
    },
    {
      answers: {
        right: ['<dgSDQG', 'sdgsdgs', 'sdgsdgsd'],
        wrong: [],
      },
      date: 1659942548,
      timeSpent: 2,
    },
    {
      answers: {
        wrong: ['ghjklmù', 'SDFHSDGFHSDGFH'],
        right: ['jyrthegqrzfeF'],
      },
      date: 1659899835,
      timeSpent: 3,
    },
    {
      answers: {
        wrong: ['qdsfhqdfh'],
        right: [
          'ghjklmù',
          'jyrthegqrzfeF',
          'qsdfhqfdhqdf',
          'SDFHSDGFHSDGFH',
          'sdfhsdhfg',
        ],
      },
      date: 1659969868,
      timeSpent: 7,
    },
  ],
};
