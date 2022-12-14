import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/UserSlice';
import foldersReducer from './folders/FolderSlice';
import studyReducer from './study/StudySlice';
import studiesReducer from './studies/StudiesSlice';
import chartReducer from './chart/chartSlice';
import editModalReducer from './editModal/editModalSlice';
import smartcardReducer from './smartCard/smartCardSlice';
import mcqReducer from './mcqFlashcard/mcqFlashcardSlice';

const rootReducer = combineReducers({
  user: userReducer,
  folders: foldersReducer,
  study: studyReducer,
  studies: studiesReducer,
  chart: chartReducer,
  editModal: editModalReducer,
  smartcard: smartcardReducer,
  mcqcard: mcqReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [
    'folders',
    'study',
    'chart',
    'studies',
    'editModal',
    'chart',
    'smartcard',
    'mcqcard',
  ],
};

const persitedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [logger];

const store: any = configureStore({
  reducer: persitedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(process.env.NODE_ENV === 'development' ? middlewares : []),
});

let persistor = persistStore(store);

export { persistor };

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];

export default store;
