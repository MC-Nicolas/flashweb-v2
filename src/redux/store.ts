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

const rootReducer = combineReducers({
  user: userReducer,
  folders: foldersReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['folders'],
};

const persitedReducer = persistReducer(persistConfig, rootReducer);

const store: any = configureStore({
  reducer: persitedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

let persistor = persistStore(store);

export { persistor };

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];

export default store;