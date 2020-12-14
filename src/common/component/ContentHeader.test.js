import React from 'react';
import { renderWithRouter, screen, fireEvent } from 'test-utils';
import ContentHeader from './ContentHeader';
import { I18N } from '../constant';

it('충돌 없이 렌더링을 올바르게 수행한다', async () => {
  renderWithRouter(<ContentHeader />, { route: '/project' });

  expect(
    await screen.findByText(I18N.BREADCRUMB_NAME_DASHBOARD)
  ).toBeInTheDocument();
  expect(
    (await screen.findAllByText(I18N.BREADCRUMB_NAME_PROJECT)).length
  ).not.toBe(0);
});

it('breadcrumb를 클릭하면 url이 변경된다', async () => {
  renderWithRouter(<ContentHeader />, { route: '/project' });

  // 클릭 전 pathname의 값을 확인한다
  expect(window.location.pathname).toBe('/project');

  // breadcrumb를 클릭한다
  fireEvent.click(await screen.findByText(I18N.BREADCRUMB_NAME_DASHBOARD));

  expect(window.location.pathname).toBe('/');
});
