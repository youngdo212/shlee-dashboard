import React from 'react';
import { renderWithRouter, screen } from 'test-utils';
import Home from './Home';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  renderWithRouter(<Home />);
  expect(screen.getByText(/sunghwan lee/i)).toBeInTheDocument();
});
