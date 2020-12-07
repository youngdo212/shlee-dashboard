import React from 'react';
import { renderWithRouter, screen, wait } from 'test-utils';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/auth/user', (req, res, ctx) => {
    return res(
      ctx.status(202),
      ctx.json({ resultCode: 0, resultMessage: '', data: null })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('충돌 없이 렌더링을 수행한다', () => {
  renderWithRouter(<App />);
});

it('앱이 렌더링 되면 로딩 아이콘을 제거한다', async () => {
  const loadingEl = document.createElement('div');
  loadingEl.id = 'init-loading';

  document.body.appendChild(loadingEl);

  renderWithRouter(<App />);

  await wait(() => {
    expect(document.getElementById('init-loading')).toBeFalsy();
  });
});

it('유저 정보를 받아온다', async () => {
  server.use(
    rest.get('/auth/user', (req, res, ctx) => {
      return res(
        ctx.status(202),
        ctx.json({
          resultCode: 0,
          resultMessage: '',
          data: { name: 'mock user' },
        })
      );
    })
  );

  renderWithRouter(<App />);

  expect(await screen.findByText('mock user')).toBeInTheDocument();
});

it('로그인 페이지를 렌더링한다', async () => {
  renderWithRouter(<App />, { route: '/auth/login' });

  expect(await screen.findByText('로그인')).toBeInTheDocument();
});

it('홈 페이지를 렌더링한다', async () => {
  server.use(
    rest.get('/auth/user', (req, res, ctx) => {
      return res(
        ctx.status(202),
        ctx.json({
          resultCode: 0,
          resultMessage: '',
          data: { name: 'mock user' },
        })
      );
    })
  );

  renderWithRouter(<App />, { route: '/' });

  expect(
    await screen.findByText('Shlee Dashboard ©2020 Created by mando')
  ).toBeInTheDocument();
});
