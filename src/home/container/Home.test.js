import React from 'react';
import { render, screen } from 'test-utils';
import Home from './Home';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  render(<Home />);
  expect(screen.getByText(/sunghwan lee/i)).toBeInTheDocument();
});
