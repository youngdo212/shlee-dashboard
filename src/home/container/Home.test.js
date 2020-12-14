import React from 'react';
import { renderWithRouter, screen, wait } from 'test-utils';
import Home from './Home';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { AuthStatus, I18N } from 'common/constant';
import { fireEvent } from '@testing-library/react';

const server = setupServer(
  rest.get('/auth/logout', (req, res, ctx) => {
    return res(
      ctx.status(202),
      ctx.json({ resultCode: 0, resultMessage: '', data: null })
    );
  }),
  rest.get('/project', (req, res, ctx) => {
    return res(ctx.status(202), ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('충돌 없이 렌더링을 올바르게 수행한다', async () => {
  renderWithRouter(<Home />);
  expect(await screen.findByText(/sunghwan lee/i)).toBeInTheDocument();
});

it('로그인이 되어있지 않으면 인증 페이지로 이동한다', async () => {
  const initialState = {
    auth: { status: AuthStatus.NotLogin },
  };
  renderWithRouter(<Home />, { initialState });

  await wait(() => {
    expect(window.location.pathname).toBe('/auth/login');
  });
});

it('로그인이 되어 있으면 그대로 있는다', async () => {
  const initialState = {
    auth: { status: AuthStatus.Login },
  };

  renderWithRouter(<Home />, { initialState });

  await wait(() => {
    expect(window.location.pathname).toBe('/');
  });
});

it('대시보드 네비게이션을 클릭하면 대시보드 컴포넌트를 렌더링한다', async () => {
  renderWithRouter(<Home />);

  fireEvent.click(await screen.findByText(I18N.NAVIGATION_TEXT_DASHBOARD));

  expect(await screen.findByText('Here dashboard')).toBeInTheDocument();
});

it('프로젝트 네비게이션을 클릭하면 프로젝트 컴포넌트를 렌더링한다', async () => {
  renderWithRouter(<Home />);

  fireEvent.click(await screen.findByText(I18N.NAVIGATION_TEXT_PROJECT));

  expect(await screen.findByText(I18N.PROJECT_LIST)).toBeInTheDocument();
});

it('유저 이름을 헤더에 렌더링한다', async () => {
  const initialState = {
    auth: {
      user: {
        name: 'test user',
      },
      status: AuthStatus.Login,
    },
  };

  renderWithRouter(<Home />, { initialState });

  expect(await screen.findByText('test user')).toBeInTheDocument();
});

it('유저 컴포넌트를 통해 로그아웃을 진행한다', async () => {
  const initialState = {
    auth: {
      user: {
        name: 'test user',
      },
      status: AuthStatus.Login,
    },
  };

  renderWithRouter(<Home />, { initialState });

  fireEvent.click(await screen.findByText('test user'));

  fireEvent.click(await screen.findByText(I18N.LOGOUT));

  await wait(() => {
    expect(window.location.pathname).toBe('/auth/login');
  });
});
