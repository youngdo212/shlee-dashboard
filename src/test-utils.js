import React from 'react';
import { render } from '@testing-library/react';
import { reducer, rootSaga } from './common/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

/**
 * store를 가지는 wrapper를 생성해 렌더링한다.
 *
 * @param {object} ui
 * @param {object} renderOptions
 */
function customRender(ui, { initialState, ...renderOptions } = {}) {
  // 테스트용 store 생성
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware),
    preloadedState: initialState,
  });
  sagaMiddleware.run(rootSaga);

  // react-redux를 이용해 store 제공
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * store와 router를 가지는 wrapper를 생성해 렌더링한다.
 *
 * @param {object} ui
 * @param {object} renderOptions
 */
function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);
  return customRender(<BrowserRouter>{ui}</BrowserRouter>, renderOptions);
}

export * from '@testing-library/react';

export { customRender as render, renderWithRouter };
