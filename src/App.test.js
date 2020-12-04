import React from 'react';
import { render } from 'test-utils';
import App from './App';

it('충돌 없이 렌더링을 수행한다', () => {
  render(<App />);
});
