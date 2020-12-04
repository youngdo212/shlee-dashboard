import React from 'react';
import { render, screen } from 'test-utils';
import User from './User';

it('충돌 없이 올바르게 렌더링을 수행한다', () => {
  render(<User name="test" logout={() => {}} />);

  expect(screen.getByText('test')).toBeInTheDocument();
});
