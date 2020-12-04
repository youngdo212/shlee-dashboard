import React from 'react';
import { render, screen } from 'test-utils';
import FetchLabel from './FetchLabel';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  render(<FetchLabel label={'test'} actionType={'test/action'} />);

  expect(screen.getByText('test')).toBeInTheDocument();
});
