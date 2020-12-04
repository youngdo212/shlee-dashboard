import React from 'react';
import { render, screen } from 'test-utils';
import Login from './Login';

it('충돌 없이 올바르게 렌더링된다', () => {
  render(<Login />);

  expect(screen.getByText(/Sunghwan Lee/i)).toBeInTheDocument();
});
