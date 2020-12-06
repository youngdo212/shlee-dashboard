import React from 'react';
import { render } from '@testing-library/react';
import store from './common/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/**
 * store를 가지는 wrapper를 생성해 렌더링한다.
 *
 * @param {object} ui
 * @param {object} renderOptions
 */
function customRender(ui, renderOptions = {}) {
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
