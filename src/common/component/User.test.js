import { I18N } from 'common/constant';
import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import User from './User';

it('충돌 없이 올바르게 렌더링을 수행한다', async () => {
  render(<User name="test" logout={() => {}} />);

  expect(await screen.findByText('test')).toBeInTheDocument();
});

it('logout 콜백을 호출한다', async () => {
  const logout = jest.fn();

  render(<User name="test" logout={logout} />);

  // dropdown을 표시 하기 위해 클릭 이벤트 발생
  fireEvent.click(await screen.findByText('test'));

  // 로그아웃 버튼 클릭
  fireEvent.click(await screen.findByText(I18N.LOGOUT));

  expect(logout).toHaveBeenCalledTimes(1);
});
