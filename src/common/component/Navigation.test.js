import React from 'react';
import { render, screen } from 'test-utils';
import Navigation from './Navigation';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  const items = [
    {
      key: 0,
      children: 'first',
    },
    {
      key: 1,
      children: 'second',
    },
  ];
  render(<Navigation items={items} onSelect={() => {}} selectedKeys={['0']} />);

  expect(screen.getByText('first')).toBeInTheDocument();
  expect(screen.getByText('second')).toBeInTheDocument();
});
