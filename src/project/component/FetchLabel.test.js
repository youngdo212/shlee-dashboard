import React from 'react';
import { render, screen } from 'test-utils';
import FetchLabel from './FetchLabel';

it('충돌 없이 렌더링을 올바르게 수행한다', async () => {
  render(<FetchLabel label={'test'} actionType={'test/action'} />);

  expect(await screen.findByText('test')).toBeInTheDocument();
});

it('fetch status의 isSlow가 true가 되면 스핀 컴포넌트를 렌더링한다', async () => {
  const actionType = 'test/action';
  render(<FetchLabel label={'test'} actionType={actionType} />, {
    initialState: {
      common: {
        fetchInfo: {
          fetchStatusMap: {},
          isSlowMap: {
            [actionType]: {
              [actionType]: true,
            },
          },
        },
      },
    },
  });

  const label = await screen.findByText('test');

  expect(label.nextElementSibling).toBeDefined();
});

it('fetch status의 isSlow가 false이면 스핀 컴포넌트는 렌더링 되지 않는다', async () => {
  const actionType = 'test/action';
  render(<FetchLabel label={'test'} actionType={actionType} />, {
    initialState: {
      common: {
        fetchInfo: {
          fetchStatusMap: {},
          isSlowMap: {
            [actionType]: {
              [actionType]: false,
            },
          },
        },
      },
    },
  });

  const label = await screen.findByText('test');

  expect(label.nextElementSibling).toBe(null);
});
