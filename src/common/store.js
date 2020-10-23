import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import projectReducer from '../project/state';
import projectSaga from '../project/state/saga';
import commonReducer from '../common/state';

const reducer = {
  project: projectReducer,
  common: commonReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(projectSaga);

export default store;
