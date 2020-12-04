import React from 'react';
import { render, screen } from 'test-utils';
import ContentHeader from './ContentHeader';
import { I18N } from '../constant';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  render(<ContentHeader />, { route: '/project' });

  expect(screen.getByText(I18N.BREADCRUMB_NAME_DASHBOARD)).toBeInTheDocument();
  expect(screen.getAllByText(I18N.BREADCRUMB_NAME_PROJECT).length).not.toBe(0);
});
