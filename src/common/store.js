import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import projectReducer from '../project/state';
import projectSaga from '../project/state/saga';
import commonReducer from '../common/state';
import authReducer from '../auth/state';
import authSaga from '../auth/state/saga';
import { all } from 'redux-saga/effects';

const reducer = {
  project: projectReducer,
  common: commonReducer,
  auth: authReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

function* rootSaga() {
  yield all([projectSaga(), authSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
