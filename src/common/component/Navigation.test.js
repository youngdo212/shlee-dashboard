import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
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

it('네비게이션을 클릭하면 onSelect 핸들러가 호출된다', async () => {
  const items = [
    {
      key: 'key1',
      children: 'first',
    },
    {
      key: 'key2',
      children: 'second',
    },
  ];
  const callback = jest.fn();
  render(<Navigation items={items} onSelect={callback} selectedKeys={['0']} />);

  fireEvent.click(await screen.findByText('first'));
  fireEvent.click(await screen.findByText('second'));

  expect(callback.mock.calls[0][0].key).toBe('key1');
  expect(callback.mock.calls[1][0].key).toBe('key2');
});
