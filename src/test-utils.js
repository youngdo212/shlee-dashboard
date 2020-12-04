import React from 'react';
import { render } from '@testing-library/react';
import store from './common/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

/**
 * store와 router를 가지는 wrapper를 생성해 렌더링한다.
 *
 * @param {object} ui
 * @param {object} renderOptions
 * @param {string=} renderOptions.route 초기 route path
 */
function customRender(ui, renderOptions = {}) {
  const route = renderOptions.route || '';

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { customRender as render };
